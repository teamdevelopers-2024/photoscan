import React from 'react'
import './MainMomento.css'
import PropertyDetailsModal from '../../modal/Modal';

function MainMomento() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 4, name: 'John Doe', email: 'john@example.com' },
    { id: 5, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 6, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 7, name: 'John Doe', email: 'john@example.com' },
    { id: 8, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 9, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 10, name: 'John Doe', email: 'john@example.com' },
    { id: 11, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 12, name: 'Alice Johnson', email: 'alice@example.com' },
    
];

const handleEdit = (id) => {
    console.log(`Edit user with ID: ${id}`);
};

const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
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
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td style={{display:"flex",justifyContent:'center'}}>
                        <button onClick={() => handleEdit(user.id)}>Block</button>
                        <PropertyDetailsModal/>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>

</div>
</>
)
}

export default MainMomento