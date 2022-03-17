import React from 'react'
import { Link } from "react-router-dom";
import '././Navbar.css';

function Navbar() {
  const home = "Home";
  const login = "LogIn";
  const register = "Register"
  return (
 <>     
<nav className="navbar navbar-expand-lg navbar-bg">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Fundoo</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to="/">{home}</Link> 
        </li> 
        <li className="nav-item">
          <Link className="nav-link" to="/login">{login}</Link> 
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/registration">{register}</Link> 
        </li>
      </ul>
    </div>
  </div>
</nav> 
</>

 )
}

export default Navbar