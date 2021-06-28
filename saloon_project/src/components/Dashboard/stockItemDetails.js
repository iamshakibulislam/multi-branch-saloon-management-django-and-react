import react,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import baseContext from '../shared/baseContext'

class stockItemDetails extends Component{

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
									<div className="card-header flex-wrap py-3">
										<div className="card-title">
											<h3 className="card-label">Admin statictics and card area
											<span className="d-block text-muted pt-2 font-size-sm"></span></h3>
										</div>
										<div className="card-toolbar">
											{/*begin::Dropdown*/ }
				
											{/*end::Dropdown*/ }
											{/*begin::Button*/ }
											
											{/*end::Button*/ }
										</div>
									</div>
									<div className="card-body">
										{/*begin: Datatable*/ }

										<h1 className="mt-4 text-center">Admin and superuser will see all statictics here--></h1>
										
									</div>
								</div>








		)
}



}


export default stockItemDetails