import React,{Component} from 'react'
import {Fragment} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import baseContext from './baseContext'


class Nav extends Component{



 state = {

  informations:[],
  company_info:[]

 }

static contextType = baseContext



  componentDidMount(){


    //axios request to the server for datas starting from here



    axios.post(this.context.baseUrl+'/items/get_company_information/',
    {
  headers: {
    
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      
     // this.needRefresh();
     
      this.setState({informations:response.data});
      
      
      }
      
    
    

    ).catch((error)=>{
      
      console.log('error has occured')
    })






    //company logo getting from here




    axios.post(this.context.baseUrl+'/branch/show_company_info/',
    {






    },{
  headers: {
    
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      
     // this.needRefresh();
     
      this.setState({company_info:response.data});
      
      
      }
      
    
    

    ).catch((error)=>{
      
      console.log('An error occured')
    })


}




  render(){
	return (

<div>

<head>
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Your grooming solution at one place</title>



<link href='http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:400,200,300' rel='stylesheet' type='text/css'/>

<link rel="stylesheet" type="text/css" href="/static_files/css/master.css"/>


<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>


</head>
<div id="overlay"></div>
<div id="mobile-menu">
  <ul>
    <li className="page-scroll"><a href="/">Home</a></li>
    <li className="page-scroll"><a href="#ourteam">Meet our team</a></li>
    <li className="page-scroll"><a href="#services">Our Services</a></li>
    <li className="page-scroll"><a href="#gallery">portfolio</a></li>
    <li className="page-scroll"><Link to="/authenticate">Login/Signup</Link></li>
    
  </ul>
</div>

  <header id="pagetop">
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="logo page-scroll"><a href="#pagetop">

            {this.state.company_info.length != 0 && this.state.company_info['logo'] != null && this.state.company_info['logo'] != '' & this.state.company_info['logo'] !=undefined?
            <img src={this.context.baseUrl+this.state.company_info['logo']} alt="logo" height="26px" width="118px"/>:
            <img src="images/logo.png" alt="logo"/>}




            </a></div>
            <div className="mm-toggle-wrap">
              <div className="mm-toggle"> <i className="icon-menu"><img src="images/menu-icon.png" alt="Menu"/></i></div>
            </div>
            <ul className="menu">
              <li className="page-scroll"><a href="/">Home</a></li>
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

		)
}



}


export default Nav