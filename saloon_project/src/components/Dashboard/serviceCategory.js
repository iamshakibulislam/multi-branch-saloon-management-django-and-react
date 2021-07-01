import react,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import baseContext from '../shared/baseContext'

class serviceCategory extends Component{

state = {
	'category_info':null,
	'branch':'all',
	branchid:0,
	pending:false,

	category_name:null
}


static contextType=baseContext


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
													<td>{data.title}</td>
													
													
													
												</tr>)


												})
												:null}
												
												
											</tbody>
										</table>
										{/*end: Datatable*/ }
									</div>
								</div>








		)
}



}


export default serviceCategory