import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import {Route,Link,Switch} from 'react-router-dom'
import Modal from 'react-modal'
import EditItems from './EditItems'

class itemList extends Component{





state = {

	processing:false,
	addingstatus:false,
	item_name:null,
	item_price:null,
	items:null,
	alert:false,
	message:null,
	is_modal_open:false,
	delete_id:null,
	index:null,
	cat:'selectcat',
	editingmode:false,
	updateid:0,
	sale_price:null

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
	axios.post(this.context.baseUrl+'/items/list_items/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({items:response.data,processing:false})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })


}




closeModal(){
	this.needRefresh();
	this.setState({editingmode:false,updateid:0})
}

editClick(event){

	this.setState({updateid:event.currentTarget.id,editingmode:true})
}

add_items_update(event,identify){
	if(identify=='name'){
	let getValue = event.target.value;
	this.setState({item_name:getValue})
}

 if(identify=='price'){
 	this.setState({item_price:event.target.value})
 }

 if(identify=='sale_price'){
 	this.setState({sale_price:event.target.value})
 }


 if(identify=='category'){
 	this.setState({cat:event.target.value})
 }

}

needRefresh(){

	this.setState({processing:true});
	axios.post(this.context.baseUrl+'/items/list_items/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({items:response.data,processing:false})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })
}

addItems(event){
	event.preventDefault();
	if(this.state.cat == 'selectcat'){
		alert('category must be selected');
		return false
	}
	this.setState({addingstatus:true});
	axios.post(this.context.baseUrl+'/items/add_items/',
    { 
    	name:this.state.item_name,
    	price:this.state.item_price,
    	cat:Number(this.state.cat),
    	sale_price:Number(this.state.sale_price)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      event.target.reset();
      
      this.setState({addingstatus:false,cat:'selectcat'});
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
	axios.post(this.context.baseUrl+'/items/delete_items/',
    { 
    	
    	identify:Number(this.state.delete_id)

    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      if(response.data['status'] == 'deleted'){

      	
      	this.needRefresh()
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
			<h3 className="card-label">Item list 
											<span className="text-muted pt-2 font-size-sm d-block">Add new Item and delete from list</span></h3> </div>
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
				<div className="col-lg-12 col-xl-12 col-md-12">
					<div className="row align-items-center">
						
						<div className="col-md-12 my-2 my-md-0">
							<div className="d-flex align-items-center">
							<form action="#" className="from  d-flex" onSubmit={this.addItems.bind(this)}>
							<div className="form-group mr-4">
								
								<input type="text" className="form-control" name="itemname" placeholder="New Item name" onChange={(event)=>this.add_items_update(event,'name')} required/>
								</div>

								<div className="form-group" >
				
								<input type="number" className="form-control"  name="price" placeholder="Buy price" onChange={(event)=>this.add_items_update(event,'price')} required/>
								</div>
								<div className="form-group ml-2" >
				
								<input type="number" className="form-control"  name="saleprice" placeholder="Selling price" onChange={(event)=>this.add_items_update(event,'sale_price')} required/>
								</div>
								<div className="form-group">
				
								<select  className="form-control ml-2" name="category"  onChange={(event)=>this.add_items_update(event,'category')} required>
								<option value="selectcat">Select category</option>
								{this.state.items != null?

									this.state.items.categories.map((data,index)=>{

										return (
											<option value={data.id} key={index}>{data.name}</option>

											)
									}):null


								}
								</select>
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
			<table className="datatable-table" style={{display: 'block'}}>
				<thead className="datatable-head">
					<tr className="datatable-row" style={{left: '0px'}}>
						
						
						<th data-field="Branch name" className="datatable-cell datatable-cell-sort"><span style={{width: '108px'}}>Item Name</span></th>
						<th data-field="Branch Address" className="datatable-cell datatable-cell-sort"><span style={{width: '150px',textAlign:'center'}}>Price / Unit</span></th>
						<th data-field="Branch Address" className="datatable-cell datatable-cell-sort"><span style={{width: '150px',textAlign:'center'}}>Category</span></th>
						
						<th data-field="Actions" data-autohide-disabled="false" className="datatable-cell datatable-cell-sort"><span style={{width: '125px'}}>Actions</span></th>
					</tr>
				</thead>
				<tbody className="datatable-body" >
			




{this.state.proccesing != true && this.state.items != null ?

this.state.items.items.map((data,index)=>{
	return (
<tr data-row="0" className="datatable-row datatable-row-even" style={{left: '0px'}} key={data.id}>
	
	<td data-field="Full Name"  className="datatable-cell"><span style={{width: '108px'}}>{data.name}</span></td>
	<td data-field="Email"  className="datatable-cell text-center"><span style={{width: '158px'}}>{data.price}  $</span></td>
	<td data-field="Email"  className="datatable-cell text-center"><span style={{width: '158px'}}>{data.category}  </span></td>
	
	<td  data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell"><span style={{overflow: 'visible', position: 'relative', width: '125px'}}>						

		<div id={data.id} className="d-inline" onClick={(event)=>this.preDelete(event,index)}>
		<a href="#" value={data.id}  className="btn btn-sm btn-clean btn-icon " title="Delete"> 
		

		 <i class="fas fa-trash-alt"></i>                               
		 
		 	
		 	</a>
		</div>




						

		<div id={data.id} className="d-inline" onClick={(event)=>this.editClick(event)}>
		<a href="#" value={data.id}   className="btn btn-sm btn-clean btn-icon" title="edit"> 
		<i class="fas fa-edit"></i>
		 	</a></div>
		

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

        <EditItems closemodal = {this.closeModal.bind(this)} editingmode={this.state.editingmode} updateid={this.state.updateid}/>
</div>


)}







}


export default itemList