import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from './loader';
import { Divider, Space, Tag } from 'antd';
import Swal from 'sweetalert2';
const { TabPane } = Tabs;

function Profile() {

    const user=JSON.parse(localStorage.getItem('currentUser'));
    useEffect(() => {
      
     if(!user){
        window.location.href='/login';
     }
      
    }, [])
    
  return (
    <div class='ml-3 mt-3 bs'> <Tabs defaultActiveKey="1">
    <TabPane tab="My Profile" key="1">
      <h5>My Profile</h5>
      <hr/>
      
      <h6>name:{user.name}</h6>
      <h6>email:{user.email}</h6>
      <h6>isAdmin:{user.isAdmin?'YES':'NO'}</h6>
     
    </TabPane>
    <TabPane tab="Bookings" key="2">
    <Mybookings/>
    </TabPane>
    
  </Tabs>
  </div>
  )
}

// export default Profile;

export function Mybookings(){
    const [bookings,setbookings]=useState();
    const [loading,setloading]=useState();
    const [error,seterror]=useState();

    const user=JSON.parse(localStorage.getItem('currentUser'));
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
    
        //      setLoading(true);
          const response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/getroombyuserid',
            headers: {
                'Content-Type': 'application/json',
                    },
            data:{userid:user._id},
        });
        setbookings(response.data);
          // Replace with your actual API endpoint
        //   setroom(response);
        //   settotalamount(response.data.rentperday*total);
          // if (!response.ok) {
          //   throw new Error('Network response was not ok');
          // }
          // const data = await response.json();
          console.log("Data-->",response);
          // setData(data);
          setloading(false);
        } catch (error) {
          seterror(true);
          setloading(false);
        }
      };
      async function cancelbooking(bookingid,roomid){
        try {
        
            //      setLoading(true);
              const response = await axios({
                method: 'POST',
                url: 'http://localhost:3000/cancel',
                headers: {
                    'Content-Type': 'application/json',
                        },
                data:{bookingid:bookingid,roomid:roomid},
            });
            console.log(response);
            Swal.fire('Congrats','your booking cancelled','success').then((response)=>{
               window.location.reload();
            })
    }
    catch(error){
        console.log(error);
        Swal.fire('Oops','Something went wrong','error');
    }
      }
    return(
        <div className='row'>
            <div className='col-md-6'>
                {loading && <Loader/>}
                {bookings && bookings.map(booking=>{
                    return <div className='bs'>
                       <h5>{booking.room}</h5>
                       <p><b>booking id:</b>{booking._id}</p>
                       <p><b>Check in:</b>{booking.fromdate}</p>
                       <p><b>Check out:</b>{booking.todate}</p>
                       <p><b>amount:</b>{booking.totalamount}</p>
                       <p><b>STATUS:</b>{booking.status=='Cancelled'?<Tag color="orange">CANCELLED</Tag>:<Tag color="green">CONFIRMED</Tag>}</p>

                       {booking.status!='Cancelled' && (<div className='text-right'>
                        <button className='btn btn-primary' onClick={()=>{cancelbooking(booking._id,booking.roomid)}}>Cancel Booking</button>
                       </div>)}
                    </div>
                   

                    
                })}
            </div>
        </div>
    )
};

export default Profile;