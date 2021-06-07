import React,{Component,Fragment} from 'react'
import {Helmet} from 'react-helmet'
import Navbar from './shared/Navbar'
import  '../static_files/css/AuthPage.css'
import axios from 'axios'
import baseContext from './shared/baseContext'
import {Redirect} from 'react-router-dom'
class LoginPage extends Component {


state = {
  mode:'signup',
  signup:{firstName:null,lastName:'null',email:null,passWord1:null,passWord2:null,userName:null},
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
    username:this.state.signup.userName

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
    this.props.history.push('/dashboard');
    this.setState({process:false});






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
   <div>
   <Navbar/>
    <div className='row justify-content-right'>
    <div className="col col-md-5 col-lg-5" style={{marginLeft:'auto',marginRight:'auto',marginTop:'4rem'}}>

		<div className="form">
    {this.state.alert == true?
      <div className="alert alert-warning">{this.state.errorMessage}</div>
      :null
    }
      
      <ul className="tab-group">
      { this.state.mode == 'signup' ?
        <li className="tab active"><a onClick={this.modeChangeHandler.bind(this,'signup')}>Sign Up</a></li>
        : <li className="tab"><a  onClick={this.modeChangeHandler.bind(this,'signup')}>Sign Up</a></li>
      }

      {this.state.mode == 'login' ?
        <li className="tab active "><a  onClick={this.modeChangeHandler.bind(this,'login')}>Log In</a></li>
        : <li className="tab"><a  onClick={this.modeChangeHandler.bind(this,'login')}>Log In</a></li>
      }
      </ul> 
      
      <div className="tab-content">
      { this.state.mode == 'signup' ?
        <div id="signup" style={{display:'block'}}>   
          <h1>Sign Up for Free</h1>
          
          <form action="#" method="post" onSubmit={this.signUp.bind(this)}>
          
          <div className="top-row">
            <div className="field-wrap">
              
              <input type="text" required  placeholder="First Name" onChange={(event)=>this.signupInfoUpdate(event,'first_name')}/>
            </div>
        
            <div className="field-wrap">
              
              <input type="text"required placeholder="Last name" onChange={(event)=>this.signupInfoUpdate(event,'last_name')} />
            </div>
          </div>

          <div className="field-wrap">
            
            <input type="text"required placeholder="Username"  onChange={(event)=>this.signupInfoUpdate(event,'username')}/>
          </div>

          <div className="field-wrap">
            
            <input type="email"required placeholder="Email" onChange={(event)=>this.signupInfoUpdate(event,'email')}/>
          </div>
          
          <div className="field-wrap">
            
            <input type="password"required placeholder="Password"  onChange={(event)=>this.signupInfoUpdate(event,'password1')}/>
          </div>


          <div className="field-wrap">
           
            <input type="password" placeholder="Confirm Password" required  onChange={(event)=>this.signupInfoUpdate(event,'password2')}/>
          </div>
          { this.state.process == false ?
          <button type="submit" className="button button-block">Get Started</button>
          : this.state.process == true ?
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

        : this.state.mode == 'login' ?

      
        


        <div id="login" style={{display:'block'}}>   
          <h1>Welcome Back!</h1>
          
          <form action="#" method="post" onSubmit={this.loginHandler.bind(this)}>
          
            <div className="field-wrap">
            
            <input type="email" placeholder="Email" required onChange={(event)=>this.loginUpdate(event,'email')}/>
          </div>
          
          <div className="field-wrap">
            
            <input type="password" placeholder="Password" required onChange={(event)=>this.loginUpdate(event,'password')}/>
          </div>
          
          <p className="forgot"><a href="#">Forgot Password?</a></p>
          
          {this.state.process == false ?
            <button className="button button-block">Log In</button>
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