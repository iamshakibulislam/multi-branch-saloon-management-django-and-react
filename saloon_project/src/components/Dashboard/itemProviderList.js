import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import {Route,Link,Switch} from 'react-router-dom'
import Modal from 'react-modal'
import EditProviders from './EditProviders'

class ProviderList extends Component{





state = {

	processing:false,
	addingstatus:false,
	
	alert:false,
	message:null,
	is_modal_open:false,
	delete_id:null,
	index:null,
	
	editingmode:false,
	updateid:0,
	provider_list:null,

	providername:null,
	providercompany:null,
	providercontact:null

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
	axios.post(this.context.baseUrl+'/items/list_providers/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({provider_list:response.data,processing:false})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })


}


editClick(event){

	this.setState({updateid:event.currentTarget.id,editingmode:true})
}


needRefresh(){
	
	this.setState({processing:true});
	axios.post(this.context.baseUrl+'/items/list_providers/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({provider_list:response.data,processing:false})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })
}


closeModal(){
	this.needRefresh();
	this.setState({editingmode:false,updateid:0})
}

add_providers_update(event,identify){
	if(identify=='name'){
	let getValue = event.target.value;
	this.setState({providername:getValue})
}

 if(identify=='company'){
 	this.setState({providercompany:event.target.value})
 }

 if(identify=='contact'){
 	this.setState({providercontact:event.target.value})
 }

}





addProviders(event){
	event.preventDefault();
	this.setState({addingstatus:true});
	axios.post(this.context.baseUrl+'/items/add_providers/',
    { 
    	name:this.state.providername,
    	company:this.state.providercompany,
    	contact:this.state.providercontact


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      event.target.reset();
      this.setState({addingstatus:false});
      this.needRefresh()
      
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
	axios.post(this.context.baseUrl+'/items/del_provider/',
    { 
    	
    	identify:Number(this.state.delete_id)

    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      if(response.data['status'] == 'deleted'){

      	this.state.provider_list.splice(Number(this.state.index),1);
      	let copy=[...this.state.provider_list];
      	this.setState({provider_list:copy})
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
			<h3 className="card-label">Item Provider management
											<span className="text-muted pt-2 font-size-sm d-block">Add,edit and delete provider from the list</span></h3> </div>
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
							<div className="d-flex align-items-center">
							<form action="#" className="form d-flex" onSubmit={this.addProviders.bind(this)}>
							<div className="form-group mr-4">
								
								<input type="text" className="form-control" name="name" placeholder="Provider name" onChange={(event)=>this.add_providers_update(event,'name')} />
								</div>

								<div className="form-group">
				
								<input type="text" className="form-control" name="company" placeholder="Company name" onChange={(event)=>this.add_providers_update(event,'company')}/>
								</div>

								<div className="form-group mr-1">
				
								<input type="text" className="form-control ml-3" name="contact" placeholder="contact information" onChange={(event)=>this.add_providers_update(event,'contact')}/>
								</div>
								<div className="ml-4"> <button type="submit"  className="btn btn-danger px-6 font-weight-bold">{this.state.addingstatus==false?
				 <span>Add </span> :
					 this.state.addingstatus==true? <span>wait...</span>:null }</button> </div>
								</form>
								
							</div>
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
			<table className="datatable-table" style={{display: 'block',width:'60%'}}>
				<thead className="datatable-head">
					<tr className="datatable-row" >
						
						
						<th data-field="name" className="datatable-cell datatable-cell-sort ">Provider Name</th>
						<th data-field="company" className="datatable-cell datatable-cell-sort ">Company</th>
						<th data-field="contact" className="datatable-cell datatable-cell-sort ">Contact</th>
						
						<th data-field="Actions" data-autohide-disabled="false" className="datatable-cell datatable-cell-sort ">Actions</th>
					</tr>
				</thead>
				<tbody className="datatable-body">
			




{this.state.proccesing != true && this.state.provider_list != null ?

this.state.provider_list.map((data,index)=>{
	return (
<tr data-row="0" className="datatable-row datatable-row-even"  key={data.id}>
	
	<td data-field="Name"  className="datatable-cell "><span style={{width:'100px',textAlign:'center'}}>{data.name}</span></td>
	<td data-field="company"  className="datatable-cell "><span style={{width:'100px',textAlign:'right'}}>{data.company}</span></td>
	<td data-field="contact"  className="datatable-cell "><span style={{width:'100px',textAlign:'center'}}>{data.contact}</span></td>
	
	
	<td  data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell ">


		<div id={data.id} className="d-inline" onClick={(event)=>this.preDelete(event,index)}>
		<a href="#" value={data.id}  className="btn btn-sm btn-clean btn-icon " title="Delete"> 
		

		 <i class="fas fa-trash-alt"></i>                               
		 
		 	
		 	</a>
		</div>




						

		<div id={data.id} className="d-inline" onClick={(event)=>this.editClick(event)}>
		<a href="#" value={data.id}   className="btn btn-sm btn-clean btn-icon" title="edit"> 
		<i class="fas fa-edit"></i>
		 	</a></div>
		

   
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

        <EditProviders closemodal = {this.closeModal.bind(this)} editingmode={this.state.editingmode} updateid={this.state.updateid}/>
</div>


)}







}


export default ProviderList