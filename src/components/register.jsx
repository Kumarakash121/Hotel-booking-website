import React, { useState } from 'react';
import axios from 'axios';
import Loader from './loader';
import Error from './error';
import Success from './success';
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');


  const [success, setsuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,seterror]=useState(false);
 async function register(){

    if(password==cpassword){
        const user={
            name:name,
            email:email,
            password:password,
            cpassword:cpassword
        }
        // console.log(user);
        try {
          setLoading(true);
            const users=await axios({
                method: 'POST',
                url: 'http://localhost:3000/register',
                headers: {
                    'Content-Type': 'application/json',
                        },
                data: user,
            });
            setLoading(false);
            setsuccess(true);
            // console.log("User registration successful:", users.data);
        } catch (error) {
            console.log("error");
            setLoading(false);
            seterror(true);
        }
    }
    else{
        console.log("password not matched");
    }
 }

  return (
    <div>
    {loading && (<Loader/>)}
    {error && (<Error/>)}
    <div className='row justify-content-center mt-5'>
      <div className='col-md-5 mt-5'>
      
      {success && <Success message="Registration success"/>}
        <div className='bs'>
          <h2>Register</h2>
          <input
            type="text"
            className="form-control"
            placeholder='Name'
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          <input 
           style={{marginTop:"10px"}}
            type="text"
            className="form-control"
            placeholder='email'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <input
            style={{marginTop:"10px"}}
            type="text"
            className="form-control"
            placeholder='password'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <input
            style={{marginTop:"10px"}}
            type="text"
            className="form-control"
            placeholder='confirm password'
            value={cpassword}
            onChange={(e) => { setCpassword(e.target.value) }}
          />
          <button className='btn btn-primary mt-3' onClick={register}>submit</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;