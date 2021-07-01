import react,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'
import EditServiceCategory from './EditServiceCategory'
import baseContext from '../shared/baseContext'

class serviceCategory extends Component{

state = {
	'category_info':null,
	'branch':'all',
	branchid:0,
	pending:false,
	index:null,
	category_name:null,
	updateid:0,
	editingmode:false,
	delete_id:null,
	is_modal_open:false
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

	
	axios.post(this.context.baseUrl+'/marketing/show_category/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({category_info:response.data})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
    })







}



needRefresh(){

	
	axios.post(this.context.baseUrl+'/marketing/show_category/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({category_info:response.data})
      
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
	axios.post(this.context.baseUrl+'/marketing/delete_category/',
    { 
    	
    	identify:Number(this.state.delete_id)

    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      if(response.data['status'] == 'deleted'){

      	this.state.category_info.splice(Number(this.state.index),1);
      	let copy=[...this.state.category_info];
      	this.setState({category_info:copy})
      }
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !',is_modal_open:false})
    })

}

addCat(event){

	event.preventDefault();

 this.setState({pending:true})
	
	axios.post(this.context.baseUrl+'/marketing/add_service_category/',
    { 
    	title:this.state.category_name


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


render(){
return(


								<div className="card card-custom gutter-b">
									<div className="card-header flex-wrap py-3">
										<div className="card-title">
											<h3 className="card-label">Service Category Details
											<span className="d-block text-muted pt-2 font-size-sm"></span></h3>
										</div>
										<div className="card-toolbar">
											{/*begin::Dropdown*/ }
											<form className="form-inline" onSubmit={(event)=>this.addCat(event)}>
												<div className="form-group">
													<input type="text" className="form-control" placeholder="service category name" onChange={(event)=>this.setState({category_name:event.target.value})}/>
												</div>
												<div className="form-group">
												{this.state.pending == false?
													<input type="submit" className="btn btn-primary ml-4" value="Add now" placeholder="scategory name"/>
													:<input type="submit" className="btn btn-danger ml-4" value="Loading please wait" placeholder="scategory name"/>
												}
												</div>
											</form>
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
													<th>Category Name</th>
													<th>Services Under</th>
													<th>action</th>
													
													
												</tr>
											</thead>
											<tbody>
											{this.state.category_info != null?

												this.state.category_info.map((data,index)=>{

													return(

													<tr>
													<td>{data.title}</td>
													<td>{data.total_services}</td>
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
														</td>
													
													
													
												</tr>)


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

        <EditServiceCategory closemodal = {this.closeModal.bind(this)} editingmode={this.state.editingmode} updateid={this.state.updateid}/>
									</div>
								</div>








		)
}



}


export default serviceCategory