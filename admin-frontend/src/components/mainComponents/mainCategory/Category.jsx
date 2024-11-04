import React, { useEffect, useState } from 'react';
import PropertyDetailsModal from '../../modal/Modal';
import AddCategoryModal from '../../AddCategory/AddCategoryModal';
import api from '../../../services/api';
import Loader from '../../Loader/Loader';
import { XMarkIcon, CheckCircleIcon, EyeIcon, EyeSlashIcon, PencilIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';

function MainMomento() {
  const [categories, setCategories] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const result = await api.getCategories(activeStatus);
        if (!result.error) {
          setCategories(result.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [activeStatus, isUpdate]);

  const handleAction = async (id) => {
    const confirmation = await Swal.fire({
      title: `Are you sure you want to ${activeStatus ? 'hide' : 'show'} this category?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${activeStatus ? 'hide' : 'show'} it!`,
    });

    if (confirmation.isConfirmed) {
      try {
        setLoading(true);
        const result = await api.updateActive(id);
        if (!result.error) {
          Swal.fire({
            icon: 'success',
            title: `Category ${activeStatus ? 'hidden' : 'shown'} successfully!`,
            position: 'top',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
          });
          setIsUpdate(!isUpdate);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const manageCategory = (id) => {
    // Implement the function to manage category
    console.log(`Manage category with id: ${id}`);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="m-4 bg-semi-transparent-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveStatus(!activeStatus)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition duration-150 
      ${activeStatus ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-400 text-white hover:bg-gray-500'}`}
            >
              {activeStatus ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : (
                <XMarkIcon className="w-5 h-5 text-red-500" />
              )}
              Unlisted Categories
            </button>

            <button
              onClick={() => setAddModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition duration-150"
            >
               + Add Category
            </button>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[550px]">
          <table className="min-w-full border-collapse  rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-center font-medium text-gray-600 border-b border-gray-300">Category Name</th>
                <th className="p-4 text-center font-medium text-gray-600 border-b border-gray-300">Item Count</th>
                <th className="p-4 text-center font-medium text-gray-600 border-b border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="p-4 text-center text-gray-700 font-semibold border-b border-gray-300">{category.name}</td>
                  <td className="p-4 text-center text-gray-700 font-semibold border-b border-gray-300">{category.count}</td>
                  <td className="p-4 text-center border-b border-gray-300 flex justify-center gap-2">
                    <button
                      onClick={() => handleAction(category._id)}
                      className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg transition duration-150
    ${activeStatus ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                      {activeStatus ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      {activeStatus ? 'Hide' : 'Show'}
                    </button>

                    <button
                      onClick={() => manageCategory(category._id)}
                      className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-blue-700 transition duration-150"
                    >
                      <PencilIcon className="w-5 h-5" />
                      Manage Cat
                    </button>

                    <PropertyDetailsModal />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddCategoryModal isOpen={addModal} onClose={() => setAddModal(false)} />
    </>
  );
}

export default MainMomento;
