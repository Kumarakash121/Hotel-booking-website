import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from './loader';
import moment from 'moment';
function BookingComponent() {
  const{roomid,fromdate,todate}=useParams();
  const fromDate1 = moment(fromdate);
const toDate1 = moment(todate);

  const total=moment.duration(toDate1.diff(fromDate1)).asDays()+1;
// console.log(fromdate);
  const [room, setroom] = useState([]);
  const [loading, setLoading] = useState();
  const [error,seterror]=useState();
  const [totalamount,settotalamount]=useState();
  if(!localStorage.getItem('currentUser')){
    window.location.href='/login';
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      setLoading(true);
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:3000/getroombyid',
        headers: {
            'Content-Type': 'application/json',
                },
        data:{roomid:roomid},
    });
      // Replace with your actual API endpoint
      setroom(response);
      settotalamount(response.data.rentperday*total);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const data = await response.json();
      // console.log("Data-->",data);
      // setData(data);
      setLoading(false);
    } catch (error) {
      seterror(true);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader/>;
  }
  if(error){
    console.log(error);
  }
  console.log("Room Line 48-->",room);
   
  async function bookRoom(){
   
    const bookingDetails = {
      room,
      user:JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      total,
      totalamount:totalamount, // Use totalAmount here
    };

    try {
      const result=await axios({
        method: 'POST',
        url: 'http://localhost:3000/bookroom',
        headers: {
            'Content-Type': 'application/json',
                },
        data:bookingDetails,
    });
    
    } catch (error) {
      
    }
  }
  return (
    <div className='row justify-content-center mt-5 bs'>
  <div className='col-md-5'>
    {room && room.data ? (
      <>
        <div className="image-container" style={{ float: 'left', marginRight: '20px' }}>
          <img src={room.data.imageurls[0]} alt="Room" className='bs' style={{height:'400px'}} />
        </div>
        <div className='booking-details' style={{ textAlign: 'right' }}>
          <h1>Booking details</h1>
          <hr />
          <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
          <p>From date:{fromdate}</p>
          <p>To date:{todate}</p>
        </div>
        <div className='payment-details' style={{ textAlign: 'right' }}>
          <p>Amount</p>
          <hr />
          <p>Total days:{total}</p>
          <p>Rent per day</p>
          <p>Total amount</p>
        </div>
        <div style={{ float: 'right', marginTop: '20px' }}>
          <button className='btn btn-primary' onClick={bookRoom}>Pay Now</button>
        </div>
      </>
    ) : (
      <p>Loading room data...</p>
    )}
  </div>
</div>
  );
}

export default BookingComponent;