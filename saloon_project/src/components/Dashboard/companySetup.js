import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
class companySetup extends Component{

static contextType = baseContext


    state = {
        
        processing:false,
        alert:false,
        
        errorMessage:false,

        name:null,
        email:null,
        address:null,
        phone:null,

        cr_number:null,
        tax_number:null,
        logo:null,

        success:false,
        successMessage:null,

        company_info:[]
       
        
       


    }




componentDidMount(){



    axios.post(this.context.baseUrl+'/branch/show_company_info/',
    {






    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      
     // this.needRefresh();
     
      this.setState({pending:false,company_info:response.data});
      
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({pending:false,success:true,successMessage:'Can Not Get Company Details!'})
    })


}




fileHandler(event){

    this.setState({logo:event.target.files[0]})
}


setInfo(event){

    event.preventDefault();


    let formdata = new FormData();

    formdata.append('logo',this.state.logo);
    formdata.append('name',this.state.name);
    formdata.append('email',this.state.email);

    formdata.append('address',this.state.address);
    formdata.append('cr_number',this.state.cr_number);
    formdata.append('tax_number',this.state.tax_number);

    formdata.append('phone',this.state.phone)



//sending data to the server 



    axios.post(this.context.baseUrl+'/branch/set_company_info/',
    formdata,{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      
     // this.needRefresh();
     
      this.setState({pending:false,success:true,successMessage:'successfully updated'});
      
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({pending:false,success:true,successMessage:'Can Not Update Company !'})
    })




//end of sending data to thte server



}

render(){
	return(

<div>

<div className="card card-custom">
 <div className="card-header">
  <h3 className="card-title">
   Setup Company
  </h3>
  <div className="card-toolbar">
   Set logo and details of the company
  </div>
 </div>
 {/*begin::Form*/}
 <form onSubmit={this.setInfo.bind(this)}>
  <div className="card-body">
   <div className="form-group mb-8">
  {this.state.success == true ?
    <div className="alert alert-custom alert-default" role="alert">
     
     <div className="alert-text">
      {this.state.successMessage}
     </div>
    </div>
    :null}

   </div>
   


   <div className="col-md-6">
   <div className="form-group">
   <label>Company Name </label>
   <input type="text" className="form-control" placeholder={this.state.company_info['name']} onChange={(event)=>this.setState({name:event.target.value})} />
   </div>
   </div>

   <div className="col-md-6">
   <div className="form-group">
   <label>Email </label>
   <input type="email" className="form-control" placeholder={this.state.company_info['email']} onChange={(event)=>this.setState({email:event.target.value})} />
   </div>
   </div>



   <div className="col-md-6">
   <div className="form-group">
   <label>Phone </label>
   <input type="text" className="form-control" placeholder={this.state.company_info['phone']} onChange={(event)=>this.setState({phone:event.target.value})} />
   </div>
   </div>




   <div className="col-md-6">
   <div className="form-group">
   <label>Address </label>
   <textarea type="text" className="form-control" placeholder={this.state.company_info['address']} onChange={(event)=>this.setState({address:event.target.value})} />
   </div>
   </div>



   <div className="col-md-6">
   <div className="form-group">
   <label>CR Number </label>
   <input type="text" className="form-control" placeholder={this.state.company_info['cr_number']} onChange={(event)=>this.setState({cr_number:event.target.value})} />
   </div>
   </div>



   <div className="col-md-6">
   <div className="form-group">
   <label>Tax Number</label>
   <input type="text" className="form-control" placeholder={this.state.company_info['tax_number']} onChange={(event)=>this.setState({tax_number:event.target.value})} />
   </div>
   </div>




   <div className="col-md-6">
   <div className="form-group custom-file" style={{border:'1px solid grey'}}>
   <label>Company Logo</label>
   <input type="file" id="logo" className="form-control custom-file-input" onChange={(event)=>this.fileHandler(event)} placeholder="Upload your logo" />
   <label class="custom-file-label" for="logo">Choose Logo</label>
   </div>
   </div>



   <div className="col-md-6">
 {this.state.company_info['logo'] != undefined && this.state.company_info['logo'] != null && this.state.company_info['logo'] != ''?
   <img src={this.context.baseUrl+this.state.company_info['logo']}  height="200px" width="300px"/>

   :null}

   </div>





   
  </div>
  <div className="card-footer">
  {this.state.processing == true ?
   <button type="submit" className="btn btn-primary mr-2">proccesing data ! Please wait...</button>
   : <button type="submit" className="btn btn-primary mr-2 ">Update Company</button>}



   
  </div>
 </form>
 {/*end::Form*/}
</div>
</div>









		)
}



}


export default companySetup