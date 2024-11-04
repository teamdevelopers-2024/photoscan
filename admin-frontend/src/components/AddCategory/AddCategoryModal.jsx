import React, { useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import Loader from '../Loader/Loader';

const AddCategoryModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [subcategories, setSubcategories] = useState(['']); // Initial empty subcategory
    const [errors, setErrors] = useState({ name: '', image: '', subcategories: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (errors.name) setErrors({ ...errors, name: '' });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
        if (errors.image) setErrors({ ...errors, image: '' });
    };

    const handleSubcategoryChange = (index, value) => {
        const updatedSubcategories = [...subcategories];
        updatedSubcategories[index] = value;
        setSubcategories(updatedSubcategories);
    };

    const handleAddSubcategory = () => {
        setSubcategories([...subcategories, '']);
    }

    const handleRemoveSubcategory = (index) => {
        const updatedSubcategories = subcategories.filter((_, i) => i !== index);
        setSubcategories(updatedSubcategories);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let validationErrors = {};
            if (!name) validationErrors.name = 'Category name is required.';
            if (!subcategories.length || subcategories.some((sub) => !sub)) {
                validationErrors.subcategories = 'Each subcategory must have a name.';
            }

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
            } else {
                const result = await api.addCategory({ name, image, subcategories });
                if (!result.error) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Category Added Successfully!',
                        position: 'top',
                        timer: 2000,
                        showConfirmButton: false,
                        toast: true
                    });
                    setName('');
                    setImage(null);
                    setPreview(null);
                    setSubcategories(['']);
                    setErrors({});
                    onClose();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Adding Category!',
                        position: 'top',
                        timer: 2000,
                        showConfirmButton: false,
                        toast: true
                    });
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {isLoading && <Loader />}
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Add New Category</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Category Name</label>
                            <input
                                type="text"
                                className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full`}
                                value={name}
                                onChange={handleNameChange}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Subcategories</label>
                            {subcategories.map((sub, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={sub}
                                        onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                                        className={`border ${errors.subcategories ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full`}
                                        placeholder={`Subcategory ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSubcategory(index)}
                                        className="ml-2 text-red-500 font-bold"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddSubcategory}
                                className="text-blue-500 mt-2"
                            >
                                + Add Subcategory
                            </button>
                            {errors.subcategories && (
                                <p className="text-red-500 text-sm mt-1">{errors.subcategories}</p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setPreview(null);
                                    setName('');
                                    setImage(null);
                                    setSubcategories(['']);
                                    setErrors({});
                                    onClose();
                                }}
                                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCategoryModal;
