import React, { useState } from 'react';
import Modal from 'react-modal';
import eye from '../../assets/images/view_6811573.png'
import './Modal.css'

const PropertyDetailsModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [propertyDetails, setPropertyDetails] = useState({
        name: 'Cozy Cottage',
        type: 'House',
        price: '$200,000',
        location: '123 Main St, Springfield',
        description: 'A cozy cottage with a beautiful garden.'
    });

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button style={{paddingLeft:30,paddingRight:30}} onClick={openModal}><img className='eyeicon' src={eye} alt="" /></button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
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
                <h2>{propertyDetails.name}</h2>
                <p><strong>Type:</strong> {propertyDetails.type}</p>
                <p><strong>Price:</strong> {propertyDetails.price}</p>
                <p><strong>Location:</strong> {propertyDetails.location}</p>
                <p><strong>Description:</strong> {propertyDetails.description}</p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
}

export default PropertyDetailsModal;