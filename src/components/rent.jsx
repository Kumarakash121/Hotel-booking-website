

import React from 'react'
import { useState,useEffect} from 'react';
import ModalComponent from './Modal';
import { Link } from 'react-router-dom';
function Rent({room,fromdate,todate}) {

   


    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const openModal = () => {
      setModalIsOpen(true);
      console.log("aka");
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
    return (
      
      <div className='row bs'>
  
        <div className='col-md-4'>
          <img src={room.imageurls[0]} alt="img" className='smallimg'/>      
          </div>
  
        <div className='col-md-7'>
          <h4>{room.name}</h4>
          <p>MaxCount:{room.maxcount}</p>
          <p>phoneNumber:{room.phonenumber}</p>
          <p>type:{room.type}</p>
          <div style={{float:'right'}}>
          <Link to={`/booking/${room._id}/${fromdate}/${todate}`}>
          <button className='btn btn-primary'>book now</button>
          </Link>
            <button  onClick={openModal} className='btn btn-primary'>view details</button>
            <ModalComponent room={room} isOpen={modalIsOpen} closeModal={closeModal} />
          </div>
        </div>
      </div>
      
    );
  }

export default Rent;