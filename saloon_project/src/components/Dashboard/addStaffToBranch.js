import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import {Route,Link,Switch} from 'react-router-dom'
import Modal from 'react-modal';

class addStaffToBranch extends Component{





state = {

	processing:false,
	added:false,
	addingstatus:false,
	branch_name:null,
	branch_address:null,
	branch:null,
	alert:false,
	message:null,
	is_modal_open:false,
	staff_data:null,
	index:null,
	parsed:false,
	showNotification:false,

	innerBranch:null,
	innerStaff:null,
	selectedEmployee:null,
	selectedBranch:null

}



customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


static contextType=baseContext

componentDidMount(){

	this.setState({processing:true});
		axios.post(this.context.baseUrl+'/staff/staff_to_add/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({staff_data:response.data,processing:false,parsed:true})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })



}



selectEmployee(event,index){
	try{
	document.querySelector(".emp").className="list-group-item";
 }

 catch{}
	this.setState({selectedEmployee:event.target.id,showNotification:false,innerStaff:event.target.innerText,index:index});
	event.target.className = "list-group-item emp active"
}





selectBranch(event){

try{
	document.querySelector(".branch").className="list-group-item";
 }

 catch{}
	this.setState({selectedBranch:event.target.id,innerBranch:event.target.innerText});
	event.target.className = "list-group-item branch active";
	this.setState({showNotification:true})

}





addToBranch(event){
   event.preventDefault();
   this.setState({'addingstatus':true});

   axios.post(this.context.baseUrl+'/staff/add_to_branch/',
    { 
    	userid:Number(this.state.selectedEmployee),
    	branchid:Number(this.state.selectedBranch)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({addingstatus:false,parsed:true,added:true,showNotification:false});
      document.querySelector('.emp').className="list-group-item";
      document.querySelector('.branch').className="list-group-item";
      let copy = {...this.state.staff_data};

      copy['employee'].splice(Number(this.state.index),1);

      this.setState({staff_data:copy})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })


}




render(){

return(

<div className="card card-custom">
	<div className="card-header flex-wrap border-0 pt-6 pb-0">
		<div className="card-title">
			<h3 className="card-label">Branch list 
											<span className="text-muted pt-2 font-size-sm d-block">Add new branch and delete from list</span></h3> </div>
		<div className="card-toolbar">
			{/*  begin::Dropdown*/ } 
		
			{/*  end::Dropdown*/ } 
			{/*  begin::Button*/ } 
			
			{/*  end::Button*/ } 
		</div>
	</div>
	<div className="card-body">
		{/*  begin: Search Form*/ } 
		{/*  begin::Search Form*/ } 
		<div className="mb-7">
			<div className="row align-items-center">
				<div className="col-lg-11 col-xl-10">
					<div className="row align-items-center">
						
						<div className="col-md-12 my-2 my-md-0">
						{this.state.showNotification == true?
							<div className="d-flex align-items-center">
							
							<form action="#" className="from form-inline" onSubmit={this.addToBranch.bind(this)}>
							

								<div className="form-group">
								
								<p className="lead font-weight-bold mr-4">
								Are you sure adding <span className="text-danger">{this.state.innerStaff}</span> to the branch 
								<span className="text-danger"> {this.state.innerBranch} </span></p>
								</div>
								<div className="ml-4"> <button type="submit"  className="btn btn-danger px-6 font-weight-bold">{this.state.addingstatus==false?
				 <span>Yes , I am</span>  :
					 this.state.addingstatus==true? <span>wait...</span>:null }</button> </div>
								</form>
							
								
							</div>:this.state.added == true? 
								<div className="alert alert-success text-white" style={{width:'100%'}}>Staff has been added !</div>:null}
						</div>
						
					</div>
				</div>
				{/* here is the button area */}
				
			</div>
		</div>
		{/*  end::Search Form*/ } 
		{/*  end: Search Form*/ } 
		{/*  begin: Datatable*/ } 
		<div className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded" id="kt_datatable" >
		<div className="row justify-content-center">

			<div className="text-dark"><p>Select employee and branch and click on add now to add the employee </p></div>
		</div>
		<div className="row mt-4">
			<div className="col-md-5">
				<h3 className="text-dark text-center mb-4">Select employee</h3>
				<ul className="list-group mt-4">

				{this.state.parsed == true?

					this.state.staff_data["employee"].map((data,index)=>{
						return (
							<li id={data.id}  key={index} className="list-group-item" onClick={(event)=>this.selectEmployee(event,index)}>{data.name} ({data.role})</li>
							)
					}) : <h2>No data to Show</h2>
					
				}
					
				</ul>
			</div>
			<div className="col-md-2 d-flex align-items-center justify-content-center" style={{height:"inherit"}}>TO</div>
			<div className="col-md-5">
				<h3 className="text-dark text-center">Select a Branch</h3>
				<ul className="list-group">
					{this.state.parsed == true ?
					 this.state.staff_data["branch"].map((data,index)=>{
					 	return(

					 		<li id={data.id} onClick={(event)=>this.selectBranch(event)} className="list-group-item">{data.name}</li>

					 		)
					 }): <h2>No data to show</h2>
					

				}
					
				</ul>
			</div>
		</div>

</div>
{/*  end: Datatable*/ } 
</div>
<Modal
          isOpen={this.state.is_modal_open}
          
          style={this.customStyles}
          contentLabel="Example Modal"
        >

        <div className="row">
        	<div className="col-sm-12">
          <h2 className="text-dark font-weight-bold mb-4">Are you sure ?</h2>
          <button className="btn btn-success mr-3" onClick={(event)=>this.deleteConfirmation(event)}>Yes, I am sure</button>
          <button className="btn btn-danger" onClick={()=>this.setState({is_modal_open:false})}>No, Take me back</button>

          </div>

          </div>
          
        </Modal>
</div>


)}







}


export default addStaffToBranch