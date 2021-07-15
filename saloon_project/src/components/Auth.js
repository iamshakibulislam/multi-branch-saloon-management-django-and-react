import React,{Component,Fragment} from 'react'
import {Helmet} from 'react-helmet'
import Navbar from './shared/Navbar'
import styles from '../css/authPage.module.css'
import axios from 'axios'
import baseContext from './shared/baseContext'
import {Redirect} from 'react-router-dom'

class LoginPage extends Component {


state = {
  mode:'signup',
  signup:{firstName:null,lastName:'null',email:null,passWord1:null,passWord2:null,userName:null,phone:null},
  login:{email:null,passWord:null},
  process:false,
  alert:false,
  errorMessage:null,
}


static contextType = baseContext

modeChangeHandler(selectedbtn){

if (selectedbtn == 'signup'){
 
  this.setState((state,props) =>{

    return {
      mode : 'signup',
    }
  })
}

else if(selectedbtn=='login'){
  this.setState((state,props) =>{

    return {
      mode : 'login',
    }
})
}

}



signUp(event){

  event.preventDefault();
  
  
  if (this.state.signup.passWord1 != this.state.signup.passWord2){

    this.setState({alert:true,errorMessage:'Password did not match !'});
    return false
  }

  this.setState({process:true});
  axios.post(this.context.baseUrl+'/api/authentication/register',
    {first_name:this.state.signup.firstName,
    last_name:this.state.signup.lastName,
    email:this.state.signup.email,
    password:this.state.signup.passWord1,
    password2:this.state.signup.passWord2,
    username:this.state.signup.userName,
    phone:this.state.signup.phone

    }).then((response)=>{
      console.log(response.data);
      if(response.data.email[0]=='user with this email already exists.'){
        
        this.setState({alert:true,errorMessage:'Email is already in used !',process:false});

        return false
      }
      
    
      this.setState({process:false,alert:true,errorMessage:'Account has been created ! Please login'})
    

    }).catch((error)=>{
      console.log(error.response)
      this.setState({process:false})
    })








}



signupInfoUpdate(event,inputId){

  if (inputId == 'first_name'){
    let State = {...this.state.signup};
    State.firstName = event.target.value;

    this.setState((state,props)=>{
      
      return {signup:State}
    });

    }



  if (inputId == 'phone'){
    let State = {...this.state.signup};
    State.phone = event.target.value;

    this.setState((state,props)=>{
      
      return {signup:State}
    });

    }




if (inputId == 'last_name'){
    let State = {...this.state.signup};
    State.lastName = event.target.value;

    this.setState((state,props)=>{
      
      return {signup:State}
    });

    }

  
if (inputId == 'email'){
    let State = {...this.state.signup};
    State.email = event.target.value;

    this.setState((state,props)=>{
      
      return {signup:State}
    });

    }


if (inputId == 'password1'){
    let State = {...this.state.signup};
    State.passWord1 = event.target.value;

    this.setState((state,props)=>{
      
      return {signup:State}
    });

    }

if (inputId == 'password2'){
    let State = {...this.state.signup};
    State.passWord2 = event.target.value;

    this.setState((state,props)=>{
      
      return {signup:State}
    });

    }


    if (inputId == 'username'){
    let State = {...this.state.signup};
    State.userName = event.target.value;

    this.setState((state,props)=>{
      
      return {signup:State}
    });

    }

}



loginHandler(event){

event.preventDefault();
  this.setState({process:true})
  axios.post(this.context.baseUrl+'/api/authentication/login',{
    username:this.state.login.email,
    password:this.state.login.passWord
  }).then((response)=>{
    
    sessionStorage.setItem("token", response.data.token);
    document.location.href = '/dashboard'

    






  }).catch((err)=>{
    this.setState({alert:true,errorMessage:'Can not be logged in with this information '})
    this.setState({process:false})
  })

}


loginUpdate(event,inputId){

  if (inputId == 'email'){
    let State = {...this.state.login};
    State.email = event.target.value;

    this.setState((state,props)=>{
      
      return {login:State}
    });

    }

if (inputId == 'password'){
    let State = {...this.state.login};
    State.passWord = event.target.value;

    this.setState((state,props)=>{
      
      return {login:State}
    });

    }



  }


render(){

	return(
   <div className={styles.body}>
   <Navbar/>

<head>
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Your grooming solution at one place</title>



<link href='http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:400,200,300' rel='stylesheet' type='text/css'/>

<link rel="stylesheet" type="text/css" href="/static_files/css/bootstrap.min.css" />



<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>


</head>
    <div className='row justify-content-center'>
    <div className="col col-sm-12 col-md-6 col-lg-5 mx-auto" style={{marginLeft:'auto',marginRight:'auto',marginTop:'7rem'}}>

		<div className={styles.form}>
    {this.state.alert == true?
      <div className="alert alert-warning">{this.state.errorMessage}</div>
      :null
    }
      
      <ul className={styles.tab_group}>
      { this.state.mode == 'signup' ?
        <li className={[styles.tab, styles.active].join(' ')}><a className={styles.a} className={styles.a} onClick={this.modeChangeHandler.bind(this,'signup')}>Sign Up</a></li>
        : <li className={styles.tab}><a className={styles.a} className={styles.a}  onClick={this.modeChangeHandler.bind(this,'signup')}>Sign Up</a></li>
      }

      {this.state.mode == 'login' ?
        <li className={[styles.tab,styles.active].join(' ')}><a className={styles.a}  onClick={this.modeChangeHandler.bind(this,'login')}>Log In</a></li>
        : <li className="tab"><a className={styles.a}  onClick={this.modeChangeHandler.bind(this,'login')}>Log In</a></li>
      }
      </ul> 
      
      <div className={styles.tab_content}>
      { this.state.mode == 'signup' ?
        <div id="signup" style={{display:'block'}}>   
          <h1 className={styles.h1}>Sign Up for Free</h1>
          
          <form className={styles.form} action="#" method="post" onSubmit={this.signUp.bind(this)}>
          
          
            <div className={styles.field_wrap}>
              
              <input className={styles.input} type="text" required  placeholder="First Name" onChange={(event)=>this.signupInfoUpdate(event,'first_name')}/>
            </div>
        
            <div className={styles.field_wrap}>
              
              <input className={styles.input} type="text"required placeholder="Last name" onChange={(event)=>this.signupInfoUpdate(event,'last_name')} />
            </div>
         

          <div className={styles.field_wrap}>
            
            <input className={styles.input} type="text"required placeholder="Username"  onChange={(event)=>this.signupInfoUpdate(event,'username')}/>
          </div>

          <div className={styles.field_wrap}>
            
            <input className={styles.input} type="email"required placeholder="Email" onChange={(event)=>this.signupInfoUpdate(event,'email')}/>
          </div>


          <div className={styles.field_wrap}>
            
            <input className={styles.input} type="text"required placeholder="phone number" onChange={(event)=>this.signupInfoUpdate(event,'phone')}/>
          </div>
          
          
          <div className={styles.field_wrap}>
            
            <input className={styles.input} type="password"required placeholder="Password"  onChange={(event)=>this.signupInfoUpdate(event,'password1')}/>
          </div>


          <div className={styles.field_wrap}>
           
            <input className={styles.input} type="password" placeholder="Confirm Password" required  onChange={(event)=>this.signupInfoUpdate(event,'password2')}/>
          </div>
          { this.state.process == false ?
          <button type="submit" className={[styles.button,styles.button_block].join(' ')}>Get Started</button>
          : this.state.process == true ?
         <div className="row justify-content-center">
          <div className={[styles.loadingio_spinner_double_ring_g8plyq4mxma].join(' ')} style={{marginLeft:'auto',marginRight:'auto'}}>
          <div className={[styles.ldio_gdeh23jxin,'ml-auto'].join(' ')}>
          <div></div>
          <div></div>
          <div><div></div></div>
          <div><div></div></div>
          </div></div>
          </div>
          : null}
          
          </form>

        </div>

        : this.state.mode == 'login' ?

      
        


        <div id="login" style={{display:'block'}}>   
          <h1 className={styles.h1}>Welcome Back!</h1>
          
          <form action="#" className={styles.form} method="post" onSubmit={this.loginHandler.bind(this)}>
          
            <div className={styles.field_wrap}>
            
            <input className={styles.input} type="email" placeholder="Email" required onChange={(event)=>this.loginUpdate(event,'email')}/>
          </div>
          
          <div className={styles.field_wrap}>
            
            <input className={styles.input} type="password" placeholder="Password" required onChange={(event)=>this.loginUpdate(event,'password')}/>
          </div>
          
          <p className={styles.forgot}><a className={styles.a} href="#">Forgot Password?</a></p>
          
          {this.state.process == false ?
            <button className={[styles.button,styles.button_block].join(' ')}>Log In</button>
            :this.state.process == true ?

            <div className="row justify-content-center">
          <div className="loadingio-spinner-double-ring-g8plyq4mxma" style={{marginLeft:'auto',marginRight:'auto'}}>
          <div className="ldio-gdeh23jxin ml-auto">
          <div></div>
          <div></div>
          <div><div></div></div>
          <div><div></div></div>
          </div></div>
          </div>
          : null}


          
          
          </form>

        </div>

        :null }
        
      </div>
      </div>
      
</div>
</div>
</div>


		



)

}


}


export default LoginPage