import react,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import baseContext from '../shared/baseContext'

class stock extends Component{

state = {
	'stock_info':null,
	'branch':'all',
	branchid:0
}


static contextType=baseContext


componentDidMount(){

	
	axios.post(this.context.baseUrl+'/items/get_my_orders/',
    { 
    	identify:Number(this.state.branchid)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({stock_info:response.data})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
    })





	axios.post(this.context.baseUrl+'/branch/show_branch/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({branch:response.data})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
    })


}



needRefresh(){

	
	axios.post(this.context.baseUrl+'/items/get_my_orders/',
    { 
    	identify:Number(document.getElementById('branchsel').value)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({stock_info:response.data})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
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
											<h3 className="card-label">Your order list
											<span className="d-block text-muted pt-2 font-size-sm"></span></h3>
										</div>
										<div className="card-toolbar">
											{/*begin::Dropdown*/ }

											{/*}

											<div className="form-group mr-4">

											<label className="d-inline">Filter</label>

											</div>

											<div className="form-group">

											<select name="branch" id="branchsel" className="form-control d-inline" onChange={(event)=>this.setBranch(event)}>
											<option value="0">All branch</option>
											{this.state.branch != 'all'?

													this.state.branch.map((data,index)=>{
														return(

															<option value={data.id} id={data.id}>{data.name}</option>


															)
													})

												:null}
											</select>
											</div> */}
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
													<th>Appointment Date</th>
													<th>User</th>
													<th>services</th>
													<th>Status</th>
													<th>Payment status </th>
													<th>Payment method </th>
													
												</tr>
											</thead>
											<tbody>
											{this.state.stock_info != null?

												this.state.stock_info.map((data,index)=>{

													return(

													<tr>
													<td>{data.date}</td>
													<td>{data.user}</td>
													<td>{data.services}</td>
													<td>{data.status}</td>
													<td>{data.payment_status}</td>
													<td>{data.payment_method}</td>
													
													
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


export default stock