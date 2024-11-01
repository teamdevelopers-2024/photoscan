import React, { act, useEffect, useState } from 'react';
import PropertyDetailsModal from '../../modal/Modal';
import AddCategoryModal from '../../AddCategory/AddCategoryModal';
import api from '../../../services/api';
import Loader from '../../Loader/Loader';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid'; 
import Swal from 'sweetalert2';

function MainMomento() {
  const [categories, setCategories] = useState([])
  const [addModal, setAddModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeStatus, setActiveStatus] = useState(true)
  const [isUpdate , setIsUpdate ] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const result = await api.getCategories(activeStatus)
        if (!result.error) {
          setCategories(result.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [activeStatus,isUpdate])

  const handleAction = async(id) => {
      try {
        setLoading(true)
        const result = await api.updateActive(id)
        if(!result.error){
          Swal.fire({
            icon: 'success',
            title: `Category ${activeStatus == true ? 'Hidded' : 'showed'} Successfully!`,
            position: 'top',
            timer: 2000,
            showConfirmButton: false,
            toast: true
        });
        }
      } catch (error) {
        console.log(error)
      }finally {
         setIsUpdate(!isUpdate)
        setLoading(false)
      }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="m-4 p-4 bg-transparent rounded-lg shadow-lg">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Categories</h2>
          <div className='flex gap-5'>
            <button
              onClick={() => setActiveStatus(!activeStatus)}
              className={`mb-3 flex items-center gap-2 rounded px-4 py-2 transition duration-150 
      ${activeStatus
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700'  // Active styles
                  : 'bg-gray-300 text-gray-500 hover:bg-gray-400'   // Inactive styles
                }`}
            >
              {activeStatus ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />  // Icon when active
              ) : (
                <XMarkIcon className="w-5 h-5 text-red-500" />          // Icon when inactive
              )}
              Unlisted Categories
            </button>

            <button
              onClick={() => setAddModal(true)}
              className="text-white mb-3 bg-green-600 rounded px-4 py-2 hover:bg-green-700 transition duration-150"
            >
              Add Category
            </button>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[550px]">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-400 p-3 text-center">Image</th>
                <th className="border border-gray-400 p-3 text-center">Category Name</th>
                <th className="border border-gray-400 p-3 text-center">Item Count</th>
                <th className="border border-gray-400 p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-100 transition duration-150">
                  <td className="border border-gray-400 p-3">
                    <img src={category.image} alt={category.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="border font-bold border-gray-400 p-3 text-gray-700">{category.name}</td>
                  <td className="border font-bold border-gray-400 p-3 text-gray-700">{category.count}</td>
                  <td className="border border-gray-400 p-3 flex justify-center">
                    <button
                      onClick={() => handleAction(category._id)}
                      className={`text-white z-10 ${activeStatus ? 'bg-yellow-600' : 'bg-green-600'} rounded px-4 py-2 hover:bg-blue-700 transition duration-150`}
                    >
                      {activeStatus ? 'Hide':'Show'}
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
