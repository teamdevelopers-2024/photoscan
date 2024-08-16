import React, { useState, useEffect } from 'react';
import './MainUser.css';
import PropertyDetailsModal from '../../modal/Modal';
import api from '../../../services/api';




function MainUser() {
    const [users, setUsers] = useState([]);
    
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages , setTotalPages] = useState(null)

    // Fetch users on component mount and whenever page or limit changes
    useEffect(() => {
        const fetchUsers = async () => {
            const data = await api.getUsers(10, currentPage);
            if (data) {
                setUsers(data.users); 
                console.log(users.length)
                setTotalPages(Math.ceil(data.totalPages / 10))
            }
        };

        fetchUsers();
    }, [currentPage]);


    const handleEdit = (id) => {
        console.log(`Edit user with ID: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete user with ID: ${id}`);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <div className="user-main">
                <div className="main-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.id}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td style={{ display: "flex", justifyContent: 'center' }}>
                                        <button onClick={() => handleEdit(user.id)}>Block</button>
                                        <PropertyDetailsModal />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainUser;
