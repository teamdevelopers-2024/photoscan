import React from 'react';
import Modal from 'react-modal';
import eye from '../../assets/images/view_6811573.png';
import './Modal.css';

const PropertyDetailsModal = ({ user, isOpen, onClose }) => {
    // Ensure user object exists before attempting to access its properties
    if (!user) return null;

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Property Details"
                ariaHideApp={false}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <h2>{user.name}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <button onClick={onClose}>Close</button>
            </Modal>
        </div>
    );
}

export default PropertyDetailsModal;
