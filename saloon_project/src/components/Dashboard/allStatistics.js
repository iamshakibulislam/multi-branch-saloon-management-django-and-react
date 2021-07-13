import react,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import baseContext from '../shared/baseContext'

class allStatistics extends Component{

state = {
	'stock_info':null,
	'branch':'all',
	branchid:0,
	from:new Date().toISOString().slice(0, 10),
	to:new Date().toISOString().slice(0, 10),
	report:[],
	staffid:0,
	staff_data:null,
	commonth:null
}


static contextType=baseContext


componentDidMount(){

	
	axios.post(this.context.baseUrl+'/items/sales_report/',
    { 
    	branchid:Number(this.state.branchid),
    	fromdate:this.state.from,
    	todate:this.state.to,
    	staffid:Number(this.state.staffid),
    	commonth:this.state.commonth


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({report:response.data})
      
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

	
	axios.post(this.context.baseUrl+'/items/sales_report/',
    { 
    	branchid:Number(this.state.branchid),
    	fromdate:this.state.from,
    	todate:this.state.to,
    	staffid:Number(this.state.staffid),
    	commonth:this.state.commonth


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({report:response.data})
      
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







setInfo(event,name){

	if(name=='branch'){

	this.setState((state)=>({branchid:event.target.value}),()=>this.needRefresh());
	
	
}

if(name=='fromdate'){
	this.setState((state)=>({from:event.target.value}),()=>this.needRefresh());
	
}

if(name=='staffid'){
	this.setState((state)=>({staffid:event.target.value}),()=>this.needRefresh());
	
}

if(name=='todate'){
	this.setState((state)=>({to:event.target.value}),()=>this.needRefresh());
	
}


if(name=='commonth'){
	this.setState((state)=>({commonth:event.target.value}),()=>this.needRefresh());
	
}


}


render(){
return(


								<div className="card card-custom gutter-b">
									<div className="card-header flex-wrap py-3">
										<div className="card-title">
											<h3 className="card-label">Sales report
											<span className="d-block text-muted pt-2 font-size-sm"></span></h3>
										</div>
										<div className="card-toolbar">
										<form className="form d-flex">
											{/*begin::Dropdown*/ }
											<div className="form-group">
											<label>Branch</label>
											<select name="branch" id="branchsel" className="form-control d-inline" onChange={(event)=>this.setInfo(event,'branch')}>
											<option value="0">All branch</option>
											{this.state.branch != 'all'?

													this.state.branch.map((data,index)=>{
														return(

															<option value={data.id} id={data.id}>{data.name}</option>


															)
													})

												:null}
											</select>
											</div>



											<div className="form-group">
											<label>Staff</label>
											<select name="branch" id="branchsel" className="form-control d-inline" onChange={(event)=>this.setInfo(event,'staffid')}>
											<option value="0">Select Staff</option>
											{this.state.branchid != 0 && this.state.report.length!=0 &&  (this.state.report != null)?

													this.state.report[0].staff_list.map((data,index)=>{
														return(

															<option value={data.id} id={data.id}>{data.name}</option>


															)
													})

												:null}
											</select>
											</div>






											<div className="form-group">
											<label>From: </label>
											<input type="date" id="fromdate" className="form-control" onChange={(event)=>this.setInfo(event,'fromdate')} required/>

											</div>

											<div className="form-group">
											<label>To: </label>
											<input type="date" id="todate" className="form-control" onChange={(event)=>this.setInfo(event,'todate')} required/>

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
													<th>Date</th>
													<th>Branch</th>
													<th>Staff name</th>
													<th>Services</th>
													<th>Items</th>
													<th>Total sales</th>
													
												</tr>
											</thead>
											<tbody>
											{this.state.report != null?

												this.state.report.map((data,index)=>{

													return(

													<tr>
													<td>{data.date}</td>
													<td>{data.branch}</td>
													<td>{data.staff}</td>
													<td>{data.services}</td>
													<td>{data.items}</td>
													<td>{data.cost}</td>
													
													
												</tr>)


												})
												:null}
												
												
											</tbody>
										</table>

										<div className="row">
										<div className="col-md-6">
										<h6 className="mt-4 mb-4" style={{marginTop:'5rem'}}>Commision report</h6>
										<form className="form form-inline mb-4 ml-2">
										<label>Select Month</label>
										<input className="form-control ml-3" id="commonth" onChange={(event)=>this.setInfo(event,'commonth')} type="month"/>
										</form>
										</div>
										</div>

										<table className="table table-bordered table-checkable" id="kt_datatable">

											<thead>
												<tr>
													
													
													<th>Staff name</th>
													<th>service/item</th>
													<th>Commision (%)</th>
													<th>Total Sales</th>
													<th>Target Status</th>
													<th>Total Commision</th>
													
												</tr>
											</thead>
											<tbody>
											{this.state.report != null && this.state.report.length!=0 && this.state.report[0].commision_data.length !=0?

												this.state.report[0].commision_data.map((data,index)=>{

													return(

													<tr>
													
													<td>{data.staff_name}</td>
													<td>{data.service_name}</td>
													<td>{data.commision_rate} %</td>
													<td>{data.total_sale}</td>
													<td>{data.target_status}</td>
													<td>{data.commision_value}</td>
													
													
													
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


export default allStatistics