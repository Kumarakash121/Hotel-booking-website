import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
const { TabPane } = Tabs;
function Admin() {

  useEffect(() => {
    
  
    if(!(JSON.parse(localStorage.getItem('currentUser')).isAdmin)){
      window.location.href='/home';
    }
  }, [])
  
  return (
    <div className='mt-3 ml-3 mr-3 bs'>
        <h1 className='text-center'><b>Admin panel</b></h1>
        <Tabs defaultActiveKey="1">
    <TabPane tab="Bookings" key="1">
      <Bookings/>
    </TabPane>
    <TabPane tab="Room" key="2">
      <Rooms/>
    </TabPane>
    <TabPane tab="Add room" key="3">
      <Add/>
    </TabPane>
    <TabPane tab="User" key="4">
      <Users/>
    </TabPane>
  </Tabs>
  
    </div>
  )
}

export default Admin;


export function Bookings(){
  const[bookings,setbookings]=useState([]);
  const [loading, setLoading] = useState();
  const [error,seterror]=useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ( await axios.post('http://localhost:3000/getallbookings', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      }));
  
      // Process the response data here
      console.log(response.data);
      setbookings(response.data);
      setLoading(false);
    } catch (error) {
      // Handle the error here
      console.log(error);
      setLoading(false);
    }
  };
      // Replace with your actual API endpoint
      
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const data = await response.json();
      // console.log("Data-->",data);
      // setDatasetLoading(true);(data);
      
    

  return(
    <div>
      
      <div>
        <table className='table table-bordered table-dark'>
         <thead className='bs'>
          <tr>
            <th>Booking id</th>
            <th>User id</th>
            <th>Room</th>
            <th>from</th>
            <th>to</th>
            <th>status</th>
          </tr>

         </thead>
         <tbody>
  {bookings.length > 0 && bookings.map((booking) => (
    <tr>
      <td>{booking._id}</td>
      <td>{booking.userid}</td>
      <td>{booking.room}</td>
      <td>{booking.fromdate}</td>
      <td>{booking.todate}</td>
      <td>{booking.status}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
     {bookings.length && <h1>there are {bookings.length} bookings</h1>}
    </div>
  );
}

export function Rooms(){
  const[rooms,setrooms]=useState([]);
  const [loading, setLoading] = useState();
  const [error,seterror]=useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ( await axios.post('http://localhost:3000/api', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      }));
  
      // Process the response data here
      console.log(response);
      setrooms(response.data);
      setLoading(false);
    } catch (error) {
      // Handle the error here
      console.log(error);
      setLoading(false);
    }
  };
      // Replace with your actual API endpoint
      
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const data = await response.json();
      // console.log("Data-->",data);
      // setDatasetLoading(true);(data);
      
    

  return(
    <div>
      
      <div>
        <table className='table table-bordered table-dark'>
         <thead className='bs'>
          <tr>
            <th>Room id</th>
            <th>Room name</th>
            <th>Room type</th>
            <th>rentperday</th>
            <th>maxcount</th>
            <th>phonenumber</th>
          </tr>

         </thead>
         <tbody>
  {rooms.length > 0 && rooms.map((room) => (
    <tr>
      <td>{room._id}</td>
      <td>{room.name}</td>
      <td>{room.type}</td>
      <td>{room.rentperday}</td>
      <td>{room.maxcount}</td>
      <td>{room.phonenumber}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
     {rooms.length && <h1>there are {rooms.length} bookings</h1>}
    </div>
  );
}

export function Users(){
  const[users,setusers]=useState([]);
  const [loading, setLoading] = useState();
  const [error,seterror]=useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ( await axios.post('http://localhost:3000/getallusers', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      }));
  
      // Process the response data here
      console.log(response);
      setusers(response.data);
      setLoading(false);
    } catch (error) {
      // Handle the error here
      console.log(error);
      setLoading(false);
    }
  };
      // Replace with your actual API endpoint
      
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const data = await response.json();
      // console.log("Data-->",data);
      // setDatasetLoading(true);(data);
      
    

  return(
    <div>
      
      <div>
        <table className='table table-bordered table-dark'>
         <thead className='bs'>
          <tr>
            <th>user id</th>
            <th>user name</th>
            <th>email</th>
            <th>isAdmin</th>
            
          </tr>

         </thead>
         <tbody>
  {users.length > 0 && users.map((user) => (
    <tr>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.isAdmin}</td>
      
    </tr>
  ))}
</tbody>
        </table>
      </div>
     {users.length && <h1>there are {users.length} bookings</h1>}
    </div>
  );
}

export function Add(){
  
    const [name,setname]=useState();
    const [rent,setrent]=useState();
    const [maxcount,setmaxcount]=useState();
    const [description,setdescription]=useState();
    const [phonenumber,setphonenumber]=useState();
    const [type,settype]=useState();
    const [url1,seturl1]=useState();
    const [url2,seturl2]=useState();
    const [url3,seturl3]=useState();
 async function addroom(){

  const newroom={
    name:name,
    maxCount:maxcount,
    phoneNumber:phonenumber,
    rentPerDay:rent,
    imageUrls:[url1,url2,url3],
    Type:type,
    Description:description
  }
  try {
    const result=await axios({
      method: 'POST',
      url: 'http://localhost:3000/addroom',
      headers: {
          'Content-Type': 'application/json',
              },
      data:newroom,
  });
  
  } catch (error) {
    
  }
}

  return(
    <div className='row'>
      
      <div className='col md-5'>
        <input type='text' className='form-control' placeholder='room name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='rentperday' value={rent} onChange={(e)=>{setrent(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='max count' value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='description' value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='phone number' value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}/>
      </div>
     

     <div className='col md-5'>
     <input type='text' className='form-control' placeholder='type' value={type} onChange={(e)=>{settype(e.target.value)}}/>
     <input type='text' className='form-control' placeholder='imageurl1' value={url1} onChange={(e)=>{seturl1(e.target.value)}}/>
     <input type='text' className='form-control' placeholder='imageurl2' value={url2} onChange={(e)=>{seturl2(e.target.value)}}/>
     <input type='text' className='form-control' placeholder='imageurl3' value={url3} onChange={(e)=>{seturl3(e.target.value)}}/>
     </div>

     <div className='text-right'>
   <button className='btn btn-primary mt-2' onClick={addroom}>add room</button>
     </div>
    </div>
  );
}