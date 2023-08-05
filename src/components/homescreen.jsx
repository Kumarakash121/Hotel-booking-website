
import ModalComponent from './Modal';
import React, { useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Rent from './rent';
import Navbar from './navbar';
import Loader from './loader';
import Error from './error';
import { DatePicker, Space } from 'antd';
// import 'antd/dist/antd.css';
import moment from 'moment/moment';

const { RangePicker } = DatePicker;
// const [modalIsOpen, setModalIsOpen] = useState(false);

//   const openModal = () => {
//     setModalIsOpen(true);
//     console.log(modalIsOpen);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };
function Homescreen() {
  const [rooms,setrooms]=useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,seterror]=useState(false);

  const [fromdate,setfromdate]=useState();
  const [todate,settodate]=useState();
  const [duplicate,setduplicate]=useState([]);
  const [searchkey,setsearchkey]=useState('');
  const [type,settype]=useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api');
        // Replace with your actual API endpoint

        if (!response.ok) {
          console.log("err");
        }
        const data = await response.json();
        console.log("Data-->", data);
        setData(data);
        setrooms(data);
        setduplicate(data);
      } catch (error) {
        seterror(true);
        
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 3000); // 5000 milliseconds = 5 seconds

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);
 if(error){
  return <Error/>;
 }
  if (loading) {
    return <Loader />; // Make sure this is the correct rendering of your Loader component
  }
  function filterbydate(dates){
    setfromdate((moment(dates[0].format('DD-MM-YYYY')))._i);
    settodate((moment(dates[1].format('DD-MM-YYYY')))._i);

  }
  console.log(fromdate);
  console.log(todate);
  console.log(data);
  function filterbysearch(){
    const temprooms=duplicate.filter(data=>data.name.toLowerCase().includes(searchkey.toLowerCase()));
    setData(temprooms);
  }

  function filterbytype(e){
    if(e!='all'){
    const temprooms=duplicate.filter(data=>data.type.toLowerCase()===e.toLowerCase());
    setData(temprooms);
    }
    else{
      setData(duplicate);
    }
  }
return(
  <div>
  
  
  
  <div className='container'>
     
     <div className='row mt-5 bs'>
      
      <div className='col md-3'>
      <RangePicker format="DD-MM-YYYY" onChange={filterbydate}/>
    {/* <RangePicker showTime /> */}
      </div>
      <div className='col-md-5'>
        <input type='text' className='form-control' placeholder='search rooms' value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterbysearch}/>
      </div>
      <select  value={type} onChange={(e)=>{filterbytype(e.target.value)}}>
        <option value="all">All</option>
        <option value="delux">Delux</option>
        <option value="non-delux">Non-delux</option>
      </select>
     </div>
      <div className='row justify-content-center mt-5'>
      <div className='col-md-9 mt-2'>
        {data.map((room) => (
           // Replace 'name' with the key you want to display
           
           <Rent room={room} fromdate={fromdate} todate={todate}/>
        ))}
      </div>
      </div>
      </div>

</div>
  );
        
    
  
}

export default Homescreen;