import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import {Route,Link,Switch} from 'react-router-dom'
import Modal from 'react-modal';

class staffList extends Component{





state = {

	processing:false,
	staff_data:null,
	branch:'all',
	alert:false,
	message:null,
	is_modal_open:false,
	delete_id:null,
	index:null

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
	axios.post(this.context.baseUrl+'/staff/staff_list/',
    { 
    	branch:this.state.branch


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({staff_data:response.data,processing:false})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })


}




updateBranch(event){
	let getValue = event.target.value;
	this.setState({branch:getValue})
}


searchEmployee(){
	this.setState({processing:true});
	axios.post(this.context.baseUrl+'/staff/staff_list/',
    { 
    	branch:this.state.branch


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({staff_data:response.data,processing:false})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })

}



preDelete(event,index){
	let getid = event.currentTarget.id;

	this.setState({is_modal_open:true,delete_id:getid,index:index})
}


deleteConfirmation(event){
 this.setState({is_modal_open:false});
	axios.post(this.context.baseUrl+'/staff/emp_delete/?idnum='+Number(this.state.delete_id),
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      if(response.data['deleted'] == 'yes'){

      	this.state.staff_data.employee.splice(Number(this.state.index),1);
      	let copy={...this.state.staff_data};
      	this.setState({staff_data:copy})
      }
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !',is_modal_open:false})
    })

}


render(){

return(

<div className="card card-custom">
	<div className="card-header flex-wrap border-0 pt-6 pb-0">
		<div className="card-title">
			<h3 className="card-label">Staff list 
											<span className="text-muted pt-2 font-size-sm d-block">Select branch to get targeted branch staff list</span></h3> </div>
		<div className="card-toolbar">
			{/*  begin::Dropdown*/ } 
		
			{/*  end::Dropdown*/ } 
			{/*  begin::Button*/ } 
			<Link to="/dashboard/add_staff" className="btn btn-primary font-weight-bolder"> <span className="svg-icon svg-icon-md">
												{/*  begin::Svg Icon | path:assets/media/svg/icons/Design/Flatten.svg*/ } 
												<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
													<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
														<rect x="0" y="0" width="24" height="24"></rect>
														<circle fill="#000000" cx="9" cy="15" r="6"></circle>
														<path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3"></path>
													</g>
												</svg>
												{/*  end::Svg Icon*/ } 
											</span>Add New</Link>
			{/*  end::Button*/ } 
		</div>
	</div>
	<div className="card-body">
		{/*  begin: Search Form*/ } 
		{/*  begin::Search Form*/ } 
		<div className="mb-7">
			<div className="row align-items-center">
				<div className="col-lg-9 col-xl-8">
					<div className="row align-items-center">
						
						<div className="col-md-6 my-2 my-md-0">
							<div className="d-flex align-items-center">
								<label className="mr-3 mb-0 d-none d-md-block">Branch:</label>
								<div className="selection">
									<select className="form-control" id="sel" tabindex="null" name="branchname" onChange={(event)=>this.updateBranch(event)}>
										<option value="all">All branch</option>
										{this.state.staff_data != null ?
										this.state.staff_data['branch'].map((name,index)=> <option value={name} key={index}>{name}</option>)
										:null}
										
									</select>
									
									
								</div>
							</div>
						</div>
						
					</div>
				</div>
				<div className="col-lg-3 col-xl-4 mt-5 mt-lg-0"> <a href="#" onClick={this.searchEmployee.bind(this)} className="btn btn-light-primary px-6 font-weight-bold">Search</a> </div>
			</div>
		</div>
		{/*  end::Search Form*/ } 
		{/*  end: Search Form*/ } 
		{/*  begin: Datatable*/ } 
		<div className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded" id="kt_datatable" >
			<table className="datatable-table" style={{display: 'block'}}>
				<thead className="datatable-head">
					<tr className="datatable-row" style={{left: '0px'}}>
						
						
						<th data-field="Full name" className="datatable-cell datatable-cell-sort"><span style={{width: '108px'}}>Full Name</span></th>
						<th data-field="Email" className="datatable-cell datatable-cell-sort"><span style={{width: '108px'}}>Email</span></th>
						<th data-field="Role" className="datatable-cell datatable-cell-sort"><span style={{width: '108px'}}>Role</span></th>
						<th data-field="Username" className="datatable-cell datatable-cell-sort"> <span style={{width:'108px'}}> Username</span></th>
						<th data-field="Branch Name" className="datatable-cell datatable-cell-sort"><span style={{width:'108px'}}>Branch Name</span></th>
						
						<th data-field="Actions" data-autohide-disabled="false" className="datatable-cell datatable-cell-sort"><span style={{width: '125px'}}>Actions</span></th>
					</tr>
				</thead>
				<tbody className="datatable-body" >
			




{this.state.proccesing != true && this.state.staff_data != null ?

this.state.staff_data['employee'].map((data,index)=>{
	return (
<tr data-row="0" className="datatable-row datatable-row-even" style={{left: '0px'}} key={data.id}>
	
	<td data-field="Full Name"  className="datatable-cell"><span style={{width: '108px'}}>{data.full_name}</span></td>
	<td data-field="Email"  className="datatable-cell"><span style={{width: '108px'}}>{data.email}</span></td>
	<td data-field="Role"  className="datatable-cell"><span style={{width: '108px'}}>{data.role}</span></td>
	<td data-field="Username"  className="datatable-cell" style={{width: '108px'}}><span style={{width: '108px'}}>{data.username}</span></td>
	<td data-field="Branch Name"  className="datatable-cell" style={{width: '108px'}}><span style={{width: '108px'}}><span style={{width:'100%',height:'100%'}} className="label font-weight-bold label-lg  label-light-danger label-inline">{data.branchname}</span></span>
	</td>
	
	<td  data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell"><span style={{overflow: 'visible', position: 'relative', width: '125px'}}>						

		<span id={data.id}  onClick={(event)=>this.preDelete(event,index)}>
		<a href="#" value={data.id}  className="btn btn-sm btn-clean btn-icon" title="Delete"> 
		<span className="svg-icon svg-icon-md">	                               
		 <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">	

		 <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
		 	<rect x="0" y="0" width="24" height="24"></rect>	
		 	<path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>
		 	<path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path> </g>	</svg> </span> 
		 	</a></span>
		</span>
	</td>
</tr>)}):<h1 className="text-center text-success">Waiting for update.... </h1>
}
</tbody>
</table>

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


export default staffList