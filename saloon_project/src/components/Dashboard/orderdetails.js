import react,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import baseContext from '../shared/baseContext'

class orderdetails extends Component{

state = {
	orderdetails:null,

}


static contextType=baseContext


componentDidMount(){

	
	axios.post(this.context.baseUrl+'/items/order_details/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({orderdetails:response.data})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
    })


}



render(){
return(


								<div className="card card-custom gutter-b">
								{this.state.orderdetails != null?
								<h3 className="ml-4 mt-3">Your Balance : <span className="text-success">{this.state.orderdetails[0]['balance']} $</span>
											</h3>:null}<br/>
									<div className="card-header flex-wrap py-3">

										<div className="card-title">
										
											<h3 className="card-label d-block">Your order details
											<span className="d-block text-muted pt-2 font-size-sm"></span></h3>
										</div>
										<div className="card-toolbar">
											{/*begin::Dropdown*/ }
				
											{/*end::Dropdown*/ }
											{/*begin::Button*/ }
											<Link to="/dashboard/order/" className="btn btn-primary font-weight-bolder">
											<span className="svg-icon svg-icon-md">
												{/*begin::Svg Icon | path:assets/media/svg/icons/Design/Flatten.svg*/ }
												<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
													<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
														<rect x="0" y="0" width="24" height="24" />
														<circle fill="#000000" cx="9" cy="15" r="6" />
														<path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3" />
													</g>
												</svg>
												{/*end::Svg Icon*/ }
											</span>New appointment</Link>
											{/*end::Button*/ }
										</div>
									</div>
									<div className="card-body">
										{/*begin: Datatable*/ }
										{this.state.orderdetails !=null?
										<table className="table table-bordered table-checkable" id="kt_datatable">
											
											<thead>
												<tr>
													<th>Appointment Date</th>
													<th>Branch</th>
													<th>Staff</th>
													<th>Services</th>
													<th>ordered items</th>
													<th>Status</th>
													
												</tr>
											</thead>
											
											<tbody>
											{this.state.orderdetails != null?

												this.state.orderdetails.map((data,index)=>{

													return(

													<tr>
													<td>{data.date} at {data.time}</td>
													<td>{data.branch}</td>
													<td>{data.staff}</td>
													<td>{data.services}</td>
													{data.ordered_items==''?
													<td>No items </td>:
												
													<td>{data.ordered_items}</td>}
													<td>{data.status}</td>
													
													
												</tr>)


												})
												:null}
												
												
											</tbody>
										</table>:<h1 className="text-center mt-4 mx-auto">You have no orders </h1>}
										{/*end: Datatable*/ }
									</div>
								</div>








		)
}



}


export default orderdetails