import React, { useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import Loader from '../Loader/Loader';

const AddCategoryModal = ({ isOpen,setIsUpdate, onClose }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [subcategories, setSubcategories] = useState([]); // Start with an empty array
    const [errors, setErrors] = useState({ name: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (errors.name) setErrors({ ...errors, name: '' });
    };

    const handleSubcategoryChange = (index, value) => {
        const updatedSubcategories = [...subcategories];
        updatedSubcategories[index] = value;
        setSubcategories(updatedSubcategories);
    };

    const handleAddSubcategory = () => {
        setSubcategories([...subcategories, '']);
    };

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
                    setSubcategories([]); // Reset to empty array
                    setErrors({});
                    onClose();
                } else {
                    if(result.message == 'already exists'){
                        setErrors({name:"This Category is already exists"})
                        return
                    }
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
            setIsUpdate((prev)=> !prev)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {isLoading && <Loader />}
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Category</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Category Name</label>
                            <input
                                type="text"
                                className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500`}
                                value={name.toUpperCase()}
                                onChange={handleNameChange}
                                placeholder="Enter category name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs">{errors.name}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Subcategories</label>
                            {subcategories.map((sub, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={sub}
                                        onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-blue-500"
                                        placeholder={`Subcategory ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSubcategory(index)}
                                        className="ml-2 p-2 rounded-md text-red-600 hover:bg-red-100"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddSubcategory}
                                className="text-blue-600 font-medium hover:text-blue-800"
                            >
                                + Add Subcategory
                            </button>
                        </div>
                        <div className="flex justify-end mt-6 space-x-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setPreview(null);
                                    setName('');
                                    setImage(null);
                                    setSubcategories([]);
                                    setErrors({});
                                    onClose();
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ease-in-out"
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
