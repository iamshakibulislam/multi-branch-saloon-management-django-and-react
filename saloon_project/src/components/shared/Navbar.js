import React from 'react'
import {Fragment} from 'react'
import {Link} from 'react-router-dom'
let Nav = ()=>{
	return (

<div>

<div id="mobile-menu">
  <ul>
    <li className="page-scroll"><a href="#salon">The Salon</a></li>
    <li className="page-scroll"><a href="#ourteam">Meet our team</a></li>
    <li className="page-scroll"><a href="#services">Our Services</a></li>
    <li className="page-scroll"><a href="#gallery">portfolio</a></li>
    
    <li className="page-scroll"><a href="/authenticate">Login/Signup</a></li>
    <li className="page-scroll"><a href="#contact">Contact</a></li>
  </ul>
</div>
<div id="page">
  <header id="pagetop">
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="logo page-scroll"><a href="#pagetop"><img src="/images/logo.png" alt="logo"/></a></div>
            <div className="mm-toggle-wrap">
              <div className="mm-toggle"> <i className="icon-menu"><img src="/images/menu-icon.png" alt="Menu"/></i></div>
            </div>
            <ul className="menu">
              <li className="page-scroll"><a href="#salon">The Salon</a></li>
              <li className="page-scroll"><a href="#ourteam">Meet our team</a></li>
              <li className="page-scroll"><a href="#services">Our Services</a></li>
              <li className="page-scroll"><a href="#gallery">portfolio</a></li>
              <li className="page-scroll"><Link to="/authenticate">Login/Signup</Link></li>
             	
               <li className="page-scroll"><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
    </nav>
  </header>
  </div>
  </div>

		)
}


export default Nav