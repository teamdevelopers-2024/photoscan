import React, { useState, useEffect } from 'react';
import './MainUser.css';
import PropertyDetailsModal from '../../modal/Modal';
import api from '../../../services/api';

function MainUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);  // Start loading
            try {
                const data = await api.getUsers(10, currentPage);
                if (data) {
                    setUsers(data.users); 
                    setTotalPages(Math.ceil(data.totalPages / 10));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        console.log(users);
        

        fetchUsers();
    }, [currentPage]);

    const handleEdit = (id) => {
        console.log(`Edit user with ID: ${id}`);
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
                    {loading ? (
                        <div className="spinner"></div> 
                    ) : (
                        <>
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
                                    {users.map((user,index) => (
                                        <tr key={user._id}>
                                            <td>{index+1}</td>
                                            <td>{user.name}</td>
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
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default MainUser;
