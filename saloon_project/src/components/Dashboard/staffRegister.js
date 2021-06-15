import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
class StaffRegister extends Component{

static contextType = baseContext


    state = {
        processing:false,
        alert:false,
        errorMessage:false,
        first_name:null,
        last_name:null,
        email:null,
        password:null,
        username:null,
        role:'employee',
        is_admin:false,
        is_staff:true,
        is_manager:false
    }




setInfo(event,name){

    if(name == 'first_name'){
        this.setState({first_name:event.target.value})
    }

    if(name == 'last_name'){
        this.setState({last_name:event.target.value})
    }

    if(name == 'email'){
        this.setState({email:event.target.value})
    }

    if(name == 'password'){
        this.setState({password:event.target.value})
    }
    if(name == 'username'){
        this.setState({username:event.target.value})
    }

    if(name == 'role'){
        if(event.target.value == 'admin'){
            this.setState({is_admin:true,is_staff:false,is_manager:false})
        }
        else if(event.target.value=='manager'){
            this.setState({is_manager:true,is_admin:false,is_staff:false})
        }

        else if(event.target.value=='employee'){
            this.setState({is_staff:true,is_manager:false,is_admin:false})
        }


    }
}


addStaff(event){

 event.preventDefault();
 this.setState({processing:true});



axios.post(this.context.baseUrl+'/api/authentication/register',
    {first_name:this.state.first_name,
    last_name:this.state.last_name,
    email:this.state.email,
    password:this.state.password,
    password2:this.state.password,
    username:this.state.username,
    is_admin:this.state.is_admin,
    is_manager:this.state.is_manager,
    is_staff:this.state.is_staff


    }).then((response)=>{
      console.log(response.data);
      if(response.data.email[0]=='user with this email already exists.'){
        
        this.setState({alert:true,errorMessage:'Email is already in used !',processing:false});

        return false
      }
      
    
      this.setState({processing:false,alert:true,errorMessage:'Staff has been added ! '});
      event.target.reset()
    

    }).catch((error)=>{
      
      this.setState({processing:false,alert:true,errorMessage:'Can not create staff ! Try agian later'})
    })




}



render(){
	return(

<div>

<div className="card card-custom">
 <div className="card-header">
  <h3 className="card-title">
   Add a staff
  </h3>
  <div className="card-toolbar">
   
  </div>
 </div>
 {/*begin::Form*/}
 <form onSubmit={this.addStaff.bind(this)}>
  <div className="card-body">
   <div className="form-group mb-8">
  {this.state.alert == true ?
    <div className="alert alert-custom alert-default" role="alert">
     
     <div className="alert-text">
      {this.state.errorMessage}
     </div>
    </div>
    :null}

   </div>
   <div className="row">
   <div className="col-md-6">
     <div className="form-group">
    <label>First name <span className="text-danger">*</span></label>
    <input type="text" className="form-control"  placeholder="John" onChange={(event)=>this.setInfo(event,'first_name')} required />
    <span className="form-text text-muted"></span>
   </div>
   </div>
   <div className="col-md-6">
   <div className="form-group">
    <label>Last Name <span className="text-danger">*</span></label>
    <input type="text" className="form-control"  placeholder="Doe" onChange={(event)=>this.setInfo(event,'last_name')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>
   </div>

   <div className="row">
   <div className="col-md-6">
     <div className="form-group">
    <label>Username <span className="text-danger">*</span></label>
    <input type="text" className="form-control"  placeholder="User122" onChange={(event)=>this.setInfo(event,'username')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>
   <div className="col-md-6">
   <div className="form-group">
    <label>Email address <span className="text-danger">*</span></label>
    <input type="email" className="form-control"  placeholder="Enter email" onChange={(event)=>this.setInfo(event,'email')} required/>
    <span className="form-text text-muted">We'll never share your email with anyone else.</span>
   </div>
   </div>

   </div>
   <div className="row">
   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputPassword1">Password <span className="text-danger">*</span></label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event)=>this.setInfo(event,'password')} required/>
   </div>
   </div>

   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleSelect1">Role<span className="text-danger">*</span></label>
    <select name="role" className="form-control" id="exampleSelect1" onChange={(event)=>this.setInfo(event,'role')}>
     
     <option value="employee">Employee</option>
     <option value="admin">Admin</option>
     <option value="manager">Manager</option>
     
    </select>
   </div>
   </div>
   </div>
   
  </div>
  <div className="card-footer">
  {this.state.processing == true ?
   <button type="submit" className="btn btn-primary mr-2">proccesing data ! Please wait...</button>
   : <button type="submit" className="btn btn-primary mr-2">Add Staff</button>}



   
  </div>
 </form>
 {/*end::Form*/}
</div>
</div>









		)
}



}


export default StaffRegister