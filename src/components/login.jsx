import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Loader from './loader';
import Error from './error';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [loading, setLoading] = useState(false);
  const [error,seterror]=useState(false);
    async function log() {
      const user = {
        email: email,
        password: password
      };
  
      try {
        setLoading(true);
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/login',
            headers: {
                'Content-Type': 'application/json',
                    },
            data: user,
        });
        console.log('Login successful:');
        setLoading(false);
        localStorage.setItem('currentUser',JSON.stringify(response.data));
        window.location.href='/home';
        // Handle the response, e.g., set user state or redirect to a dashboard page
        // console.log('Login successful:');
      } catch (error) {
        // Handle the error, e.g., show an error message
        setLoading(false);
        seterror(true);
        console.error('Error logging in:', error);
      }
    }
  
    return (
      <div>
        {loading && (<Loader/>)}
    
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
        {error && (<Error message='invalid credentials'/>)}
          <div className='bs'>
            <h2>Login</h2>
            
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
            
            <button className='btn btn-primary mt-3' onClick={log}>submit</button>
          </div>
        </div>
      </div>
      </div>
    );
}

export default Login