import React,{Component,Fragment} from 'react'

class StaffRegister extends Component{


render(){
	return(

<div>
<div className="card card-custom">
 <div className="card-header">
  <h3 className="card-title">
   Base Controls
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
    <div className="alert alert-custom alert-default" role="alert">
     <div className="alert-icon"><i className="flaticon-warning text-primary"></i></div>
     <div className="alert-text">
      The example form below demonstrates common HTML form elements that receive updated styles from Bootstrap with additional classes.
     </div>
    </div>
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
    <label>Static:</label>
    <p className="form-control-plaintext text-muted">email@example.com</p>
   </div>
   <div className="form-group">
    <label for="exampleSelect1">Example select <span className="text-danger">*</span></label>
    <select className="form-control" id="exampleSelect1">
     <option>1</option>
     <option>2</option>
     <option>3</option>
     <option>4</option>
     <option>5</option>
    </select>
   </div>
   <div className="form-group">
    <label for="exampleSelect2">Example multiple select <span className="text-danger">*</span></label>
    <select multiple="" className="form-control" id="exampleSelect2">
     <option>1</option>
     <option>2</option>
     <option>3</option>
     <option>4</option>
     <option>5</option>
    </select>
   </div>
   <div className="form-group mb-1">
    <label for="exampleTextarea">Example textarea <span className="text-danger">*</span></label>
    <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
   </div>
  </div>
  <div className="card-footer">
   <button type="reset" className="btn btn-primary mr-2">Submit</button>
   <button type="reset" className="btn btn-secondary">Cancel</button>
  </div>
 </form>
 {/*end::Form*/}
</div>
</div>









		)
}



}


export default StaffRegister