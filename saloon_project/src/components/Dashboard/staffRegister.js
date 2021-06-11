import React,{Component,Fragment} from 'react'

class StaffRegister extends Component{


render(){
	return(

<div>

<div className="card card-custom">
 <div className="card-header">
  <h3 className="card-title">
   Add a staff
  </h3>
  <div className="card-toolbar">
   <div className="example-tools justify-content-center">
    <span className="example-toggle" data-toggle="tooltip" title="View code"></span>
    <span className="example-copy" data-toggle="tooltip" title="Copy code"></span>
   </div>
  </div>
 </div>
 {/*begin::Form*/}
 <form>
  <div className="card-body">
   <div className="form-group mb-8">
   { /*}
    <div className="alert alert-custom alert-default" role="alert">
     
     <div className="alert-text">
      
     </div>
    </div>
*/}
   </div>
     <div className="form-group">
    <label>First name <span className="text-danger">*</span></label>
    <input type="text" className="form-control"  placeholder="John"/>
    <span className="form-text text-muted"></span>
   </div>
   <div className="form-group">
    <label>Last Name <span className="text-danger">*</span></label>
    <input type="text" className="form-control"  placeholder="Doe"/>
    <span className="form-text text-muted"></span>
   </div>
     <div className="form-group">
    <label>Username <span className="text-danger">*</span></label>
    <input type="text" className="form-control"  placeholder="User122"/>
    <span className="form-text text-muted"></span>
   </div>
   <div className="form-group">
    <label>Email address <span className="text-danger">*</span></label>
    <input type="email" className="form-control"  placeholder="Enter email"/>
    <span className="form-text text-muted">We'll never share your email with anyone else.</span>
   </div>
   <div className="form-group">
    <label for="exampleInputPassword1">Password <span className="text-danger">*</span></label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
   </div>
   
   <div className="form-group">
    <label for="exampleSelect1">Role<span className="text-danger">*</span></label>
    <select name="role" className="form-control" id="exampleSelect1">
     <option value="employee">Employee</option>
     <option value="admin">Admin</option>
     <option value="manager">Manager</option>
     
    </select>
   </div>
   
   
  </div>
  <div className="card-footer">
   <button type="reset" className="btn btn-primary mr-2">Add Staff</button>
   
  </div>
 </form>
 {/*end::Form*/}
</div>
</div>









		)
}



}


export default StaffRegister