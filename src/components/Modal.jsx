import React from 'react'
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


// Modal.setAppElement('#root');

const modalStyles = {
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      maxWidth: '100%', // Adjust this value to your preference
      maxHeight: '100%', // Adjust this value to your preference

    
    },
  };
const ModalComponent = ({ room,isOpen, closeModal }) => {
    return (
      <Modal style={modalStyles}
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h4>{room.name}</h4>
        <Carousel showThumbs={false}>
        {room.imageurls.map((image,index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </Carousel>
      <p>{room.description}</p>
        
      <button style={{float:"right",color:"black"}} className="close" onClick={closeModal}>Close</button>
      </Modal>
    );
  };

export default ModalComponent;