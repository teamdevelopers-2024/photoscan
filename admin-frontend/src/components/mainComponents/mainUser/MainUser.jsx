import React, { useState, useEffect } from "react";
import "./MainUser.css";
import api from "../../../services/api";
import Modal from "../../modal/Modal";
import eye from '../../../assets/images/eye_4571787.png';
import Swal from 'sweetalert2';

function MainUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate , setIsUpdate ] = useState(false)

   useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      try {
        const data = await api.getUsers(10, currentPage);
        if (data) {
          setUsers(data.users);
          setTotalPages(Math.ceil(data.totalPages / 10));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage,isUpdate]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const handleBlock = (id ,status) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${status} this user?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        setLoading(true)
        const result = await api.blockUser(id)
        if(!result.error){
          Swal.fire({
            title: 'Success!',
            text: `The user has been ${status} successfully.`,
            icon: 'success',
            confirmButtonText: 'OK',
            width: '300px', // makes it smaller
            position: 'top', // positions it at the top
            toast: true, // makes it appear like a small toast notification
            timer: 2000, // auto-close after 2 seconds (optional)
            showConfirmButton: false, // hides the confirm button
            customClass: {
              popup: 'swal2-top-toast'
            }
          });
        }else{
          Swal.fire({
            title: 'Error',
            text: `There was an issue ${status} the user.`,
            icon: 'error',
            position: 'top',
            width: '300px',
            toast: true,
            timer: 2000,
            showConfirmButton: false,
          });
        }
        setIsUpdate(!isUpdate)
        setLoading(false)
      }
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="user-main p-6 rounded-lg shadow-md">
      <div className="main-table overflow-x-auto">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-200 text-gray-700">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  <th className="py-3 px-4 border-b">ID</th>
                  <th className="py-3 px-4 border-b">F Name</th>
                  <th className="py-3 px-4 border-b">L Name</th>
                  <th className="py-3 px-4 border-b">Email</th>
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{index + 1}</td>
                    <td className="py-3 px-4 border-b">{user.firstName}</td>
                    <td className="py-3 px-4 border-b">{user.lastName}</td>
                    <td className="py-3 px-4 border-b">{user.email}</td>
                    <td className="py-3 px-4 border-b text-center flex items-center justify-center gap-4">
                      {!user.isBlocked ?  <button onClick={()=> handleBlock(user._id , 'block')} className="bg-red-100 w-20 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200">
                        Block
                      </button> :
                       <button onClick={()=> handleBlock(user._id ,'unblock')} className="bg-green-100 text-green-600 px-3 py-1 w-20 rounded-md text-sm hover:bg-green-200">
                       Unblock
                     </button> 
                      }
                 
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200"
                      >
                        <img src={eye} className="h-7" alt="" />
                      </button>
                      <Modal
                        user={selectedUser}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination flex items-center justify-center mt-4 space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MainUser;
