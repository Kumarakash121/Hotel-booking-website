import React from 'react'
import { Link } from 'react-router-dom';
function navbar() {
  const user=JSON.parse(localStorage.getItem('currentUser'));
  function logout(){
    localStorage.removeItem('currentUser');
    window.location.href='/login';
  }
  
  return (
    <div>

        <nav class="navbar navbar-expand-lg ">
  <a class="navbar-brand" href="#">our rooms</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"><i class='fa fa-bars' style={{color:'white'}}></i></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav mr-5">
      
     {user?(<><div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class='fa fa-user'></i>{user.name}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <a class="dropdown-item" type="button" href='/profile'>Profile</a>
    <button class="dropdown-item" type="button" onClick={logout}>Logout</button>
    
  </div>
</div></>):( <><li class="nav-item">
        
        <Link to="/register" className="nav-link">
              Register
            </Link>
        </li>
        
        <li class="nav-item">
        <Link to="/login" className="nav-link ">
              Login
            </Link>
        </li></>)}
    </ul>
  </div>
</nav>
    </div>
  )
}

export default navbar;