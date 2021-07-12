import react,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'
import EditServiceCategory from './EditServiceCategory'
import baseContext from '../shared/baseContext'
import EditVoucher from './EditVoucher'
class stockTransfer extends Component{

state = {
	
	
	branchid:0,
	pending:false,
	index:null,
	category_name:null,
	updateid:0,
	editingmode:false,
	delete_id:null,
	is_modal_open:false,
	voucher_info:null,
	user_info:null,
	branch_info:null,

	frombranch:null,
	tobranch:null,
	selected_item:null,
	quantity:0,

	tobranchid:null,
	items:null,
	stock_data:null
}


static contextType=baseContext



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

componentDidMount(){

	
	axios.post(this.context.baseUrl+'/branch/show_branch/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({branch_info:response.data})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
    })







	axios.post(this.context.baseUrl+'/items/get_stock_transfer_data/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({stock_data:response.data})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
    })






}



updateInfo(event,name){

if(name == 'frombranch'){

	this.setState({frombranch:event.target.value});

	//requesting for items for this branch


    this.setState({processing:true});
        axios.post(this.context.baseUrl+'/items/get_items_list/',
    { 
        identify:Number(event.target.value)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({items:response.data,processing:false,parsed:true})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })


	//end of requesting for items for this branch

}


if(name == 'tobranch'){
	this.setState({tobranch:event.target.value})
}


if(name == 'quantity'){
	this.setState({quantity:event.target.value})
}


if(name=='item'){
	this.setState({selected_item:event.target.value})
}

}



needRefresh(){



	axios.post(this.context.baseUrl+'/items/get_stock_transfer_data/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({stock_data:response.data})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
    })



}




editClick(event){

	this.setState({updateid:event.currentTarget.id,editingmode:true})
}



closeModal(){
	this.needRefresh();
	this.setState({editingmode:false,updateid:0})
}


preDelete(event,index){
	let getid = event.currentTarget.id;

	this.setState({is_modal_open:true,delete_id:getid,index:index})
}


deleteConfirmation(event){
 this.setState({is_modal_open:false});
	axios.post(this.context.baseUrl+'/marketing/delete_voucher/',
    { 
    	
    	identify:Number(this.state.delete_id)

    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      if(response.data['status'] == 'deleted'){

      	this.state.voucher_info.splice(Number(this.state.index),1);
      	let copy=[...this.state.category_info];
      	this.setState({voucher_info:copy})
      }
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !',is_modal_open:false})
    })

}


setBranch(event){

	this.setState({branchid:event.target.value});
	this.needRefresh();

}


transferItem(event){
	


	event.preventDefault();

 this.setState({pending:true})
	
	axios.post(this.context.baseUrl+'/items/item_stock_transfer/',
    { 
    	
    	frombranch:Number(this.state.frombranch),
    	tobranch:Number(this.state.tobranch),
    	selected_item:Number(this.state.selected_item),
    	quantity:Number(this.state.quantity)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      
     // this.needRefresh();
      event.target.reset();
      this.setState({pending:false});
      this.needRefresh()
      
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({pending:false,message:'Can not load data !'})
    })





}



changeStatus(event){
	event.preventDefault();

	let transfer_id = event.target.getAttribute('transfer_id');
	let status = event.target.parentElement.previousSibling.children[0].value;

//begining changing status to the server


	
	axios.post(this.context.baseUrl+'/items/change_stock_status/',
    { 
    	
    	transfer_id:Number(transfer_id),
    	status:status


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      
     // this.needRefresh();
     
      this.setState({pending:false});
      this.needRefresh()
      
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({pending:false,message:'Can not load data !'})
    })




	//end of sending change status request

	
}


render(){
return(


								<div className="card card-custom gutter-b">
									<div className="card-header flex-wrap py-3">
										
										<div className="card-toolbar">
											{/*begin::Dropdown*/ }
											{this.state.branch_info != null?
											<form className="form" onSubmit={(event)=>this.transferItem(event)}>
											<div className="row">
											<div className="col-md-3">
												<div className="form-group">
													<select name="branch1" className="form-control" onChange={(event)=>this.updateInfo(event,'frombranch')}>

													<option value="selectfrom">Select branch</option>

													{this.state.branch_info.map((data,index)=>{return(


														<option value={data.id}>{data.name}</option>



														)})}

													</select>
												</div>
												</div>

												
												<div className="form-group">
													<p className="lead mt-2 ">TO</p>
												</div>
												

												<div className="col-md-2">
												<div className="form-group">
													<select name="branch2" className="form-control" onChange={(event)=>this.updateInfo(event,'tobranch')}>
													<option value="tobranch">Destination</option>
													{this.state.branch_info.map((data,index)=>{return(


														<option value={data.id}>{data.name}</option>



														)})}

													</select>
												</div>
												</div>

												

												<div className="col-md-3">
												<div className="form-group">
													<select name="branch2" className="form-control" onChange={(event)=>this.updateInfo(event,'item')}>
													<option value="selectitem">Select Item</option>
													{this.state.items != null?

													this.state.items.map((data,index)=>{return(


														<option value={data.id}>{data.name}</option>



														)}):null}

													</select>
												</div>
												</div>

												<div className="col-md-2">

												<div className="form-group" >

													<input type="number" className="form-control" placeholder="Quantity" onChange={(event)=>this.updateInfo(event,'quantity')} required/>

												</div>
												</div>
												<div className="col-md-1">
												<div className="form-group">
												{this.state.pending == false?
													<input type="submit" className="btn btn-primary " value="Transfer Now" placeholder="scategory name"/>
													:<input type="submit" className="btn btn-danger" value="Loading.." placeholder="scategory name"/>
												}
												</div>
												</div>
												</div>
											</form>:null}
											{/*end::Dropdown*/ }
											{/*begin::Button*/ }
											
											{/*end::Button*/ }
										</div>
									</div>
									<div className="card-body">
										{/*begin: Datatable*/ }
										<table className="table table-bordered table-checkable" id="kt_datatable">
											<thead>
												<tr>
													<th>Transfer Date</th>
													<th>Item Name</th>
													<th>Quantity</th>
													<th>Branch </th>
													<th>Status</th>
													<th>Change Status</th>
													<th>Action</th>
													
													
												</tr>
											</thead>
											<tbody>
											{this.state.stock_data != null?

												this.state.stock_data.map((data,index)=>{

													return(



													<tr>
													<td>{data.date}</td>
													<td value={data.item_id}>{data.itemname}</td>
													<td value={data.quantity}>{data.quantity}</td>
													<td value={data.branch_id}>{data.branchname}</td>
													{data.status == 'pending'?
													<td className="bg-warning text-white">{data.status}</td>
													: data.status == 'sent'?
													<td className="bg-primary text-white">Item Sent</td>
													:data.status == 'recieved'?
													<td className="bg-info text-white">Item Recieved</td>
													:data.status == 'confirmed'?
													<td className="bg-success text-white">Confirmed</td>:null




												}
													<td> {data.status != 'confirmed'?
															<select name="status" className="form-control d-inline">
															{data.sender == true?
																<option value="pending">Pending Transfer</option>:null}
																{data.sender == true?
																<option value="sent">Item sent</option>:null}
																{data.sender == false?
																<option value="recieved">Item recieved</option>:null}
																{data.sender == false?
																<option value="confirmed">Confirmed</option>:null}

															</select>:
															
															<h6 className="text-center mt-1"> Transfered</h6>}
															
															
													

													</td>

													
													<td>
													{data.status !='confirmed'?
													<a className="btn btn-danger mt-1 ml-1" transfer_id={data.transfer_id} onClick={(event)=>this.changeStatus(event)}>Change</a>
													:<a className="btn btn-dark mt-1" disabled>Unavailable</a>}
													</td>
													
													
												</tr>   )


												})
												:null}
												
												
											</tbody>
										</table>
										{/*end: Datatable*/ }
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

        <EditVoucher closemodal = {this.closeModal.bind(this)} editingmode={this.state.editingmode} updateid={this.state.updateid}/>
									</div>
								</div>








		)
}



}


export default stockTransfer