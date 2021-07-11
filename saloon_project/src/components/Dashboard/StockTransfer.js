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
	frombranchid:null,
	tobranchid:null,
	items:null
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

}



needRefresh(){



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

addVoucher(event){

	event.preventDefault();

 this.setState({pending:true})
	
	axios.post(this.context.baseUrl+'/marketing/add_voucher/',
    { 
    	
    	voucher_name:this.state.voucher_name,
    	voucher_price:this.state.voucher_price,
    	voucher_value:this.state.voucher_value


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({category_name:null,pending:false});
      this.needRefresh();
      event.target.reset()
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({pending:false,message:'Can not load data !'})
    })



}


setBranch(event){

	this.setState({branchid:event.target.value});
	this.needRefresh();

}


buyVoucher(event){
	


	event.preventDefault();

 this.setState({pending:false})
	
	axios.post(this.context.baseUrl+'/marketing/buy_voucher/',
    { 
    	
    	identify:Number(event.target.id)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      alert('voucher credit has been added to your balance !');
      
      this.needRefresh();
      event.target.reset();
      
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({pending:false,message:'Can not load data !'})
    })





}

render(){
return(


								<div className="card card-custom gutter-b">
									<div className="card-header flex-wrap py-3">
										
										<div className="card-toolbar">
											{/*begin::Dropdown*/ }
											{this.state.branch_info != null?
											<form className="form" onSubmit={(event)=>this.addVoucher(event)}>
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
													<select name="branch2" className="form-control" onChange={(event)=>this.updateInfo(event,'tobranch')}>
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

													<input type="number" className="form-control" placeholder="Quantity" onChange={(event)=>this.updateInfo(event,'quantity')}/>

												</div>
												</div>
												<div className="col-md-1">
												<div className="form-group">
												{this.state.pending == false?
													<input type="submit" className="btn btn-primary " value="Transfer Now" placeholder="scategory name"/>
													:<input type="submit" className="btn btn-danger" value="Loading please wait" placeholder="scategory name"/>
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
													<th>Item Name</th>
													<th>Transfer Date</th>
													<th>Quantity</th>
													<th>Status</th>
													
													
												</tr>
											</thead>
											<tbody>
											{this.state.voucher_info != null?

												this.state.voucher_info.map((data,index)=>{

													return(



													<tr>
													<td>{data.name}</td>
													<td>{data.price}</td>
													<td>{data.value}</td>
													{this.state.user_info != null && this.state.user_info.role == 'user'?
														
														<td><button id={data.id} value={data.id} class="btn btn-primary" onClick={this.buyVoucher.bind(this)}>Buy Now</button></td>:
													<td>

														<div id={data.id} className="d-inline" onClick={(event)=>this.preDelete(event,index)}>
														<a href="#" value={data.id}  className="btn btn-sm btn-clean btn-icon " title="Delete"> 
														

														 <i class="fas fa-trash-alt"></i>                               
														 
														 	
														 	</a>
														</div>




						

														<div id={data.id} className="d-inline" onClick={(event)=>this.editClick(event)}>
														<a href="#" value={data.id}   className="btn btn-sm btn-clean btn-icon" title="edit"> 
														<i class="fas fa-edit"></i>
														 	</a></div>
														</td>}
													
													
													
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