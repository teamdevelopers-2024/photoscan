import React, { useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import Loader from '../Loader/Loader';

const AddCategoryModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({ name: '', image: '' });
    const [isLoading , setIsLoading ] = useState(false)

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (errors.name) setErrors({ ...errors, name: '' }); // Clear name error if it exists
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));  // Generates preview URL
        if (errors.image) setErrors({ ...errors, image: '' }); // Clear image error if it exists
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            let validationErrors = {};
            if (!name) validationErrors.name = 'Category name is required.';
            if (!image) validationErrors.image = 'Category image is required.';
    
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
            } else {
                
                const result = await api.addCategory({image , name})
                if(!result.error){
                        Swal.fire({
                            icon: 'success',
                            title: 'Category Added Successfully!',
                            position: 'top',
                            timer: 2000,
                            showConfirmButton: false,
                            toast: true
                        });
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Adding Category!',
                        position: 'top',
                        timer: 2000,
                        showConfirmButton: false,
                        toast: true
                    });
                }
    
                setName('');
                setImage(null);
                setPreview(null);
                setErrors({});  // Clear all errors
                onClose();
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    };

    if (!isOpen) return null;

    return (
        <>
        {isLoading && <Loader/>}
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
                        <label className="block text-gray-700 font-bold mb-2">Category Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={`block w-full text-sm ${errors.image ? 'text-red-500 border-red-500' : 'text-gray-500 border-gray-300'} rounded-md cursor-pointer`}
                            />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                        )}
                        {preview && (
                            <div className="mt-4">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-32 w-full object-contain rounded-md"
                                    style={{ maxHeight: '200px', maxWidth: '100%' }}
                                    />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                setPreview(null);
                                setName('');
                                setImage(null);
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
