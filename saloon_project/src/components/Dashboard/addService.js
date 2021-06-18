import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
class ServiceRegister extends Component{

static contextType = baseContext


    state = {
        service_data:null,
        processing:false,
        alert:false,
        staff_data:null,
        errorMessage:false,
        service_title:null,
        cost:null,
        tax:null,
        duration:null,
        commision:null,
        target:null
        
       


    }








setInfo(event,name){

    if(name == 'title'){
        this.setState({service_title:event.target.value})
    }

    if(name == 'cost'){
        this.setState({cost:event.target.value})
    }

    if(name == 'commision'){
        this.setState({commision:event.target.value})
    }

    if(name == 'tax'){
        this.setState({tax:event.target.value})
    }

    if(name == 'target'){
        this.setState({target:event.target.value})
    }

    if(name == 'duration'){
        this.setState({duration:event.target.value})
    }


    }


    





addService(event){

 event.preventDefault();
 this.setState({processing:true});

axios.post(this.context.baseUrl+'/marketing/add_service/',
    { 
       
       title:this.state.service_title,
       costs:this.state.cost,
       target:this.state.target,
       tax:this.state.tax,
       duration:this.state.duration,
       commision:this.state.commision


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({processing:false,alert:true,errorMessage:'successfully added'})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({processing:false,alert:true,errorMessage:'Can not load data !'})
    })







}



render(){
	return(

<div>

<div className="card card-custom">
 <div className="card-header">
  <h3 className="card-title">
   Add a service
  </h3>
  <div className="card-toolbar">
   
  </div>
 </div>
 {/*begin::Form*/}
 <form onSubmit={this.addService.bind(this)}>
  <div className="card-body">
   <div className="form-group mb-8">
  {this.state.alert == true ?
    <div className="alert alert-custom alert-default" role="alert">
     
     <div className="alert-text">
      {this.state.errorMessage}
     </div>
    </div>
    :null}

   </div>
   <div className="row">
   <div className="col-md-6">
     <div className="form-group">
    <label>Service title <span className="text-danger">*</span></label>
    <input type="text" className="form-control"  placeholder="My new service" onChange={(event)=>this.setInfo(event,'title')} required />
    <span className="form-text text-muted"></span>
   </div>
   </div>
   <div className="col-md-6">
   <div className="form-group">
    <label>Cost <span className="text-danger">*</span></label>
    <input type="number" className="form-control"  placeholder="20" onChange={(event)=>this.setInfo(event,'cost')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>
   </div>

   <div className="row">
   <div className="col-md-6">
     <div className="form-group">
    <label>Tax <span className="text-danger">*</span></label>
    <input type="number" className="form-control"  placeholder="2" onChange={(event)=>this.setInfo(event,'tax')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>
   <div className="col-md-6">
   <div className="form-group">
    <label>Duration <span className="text-danger">*</span></label>
    <input type="text" className="form-control"  placeholder="60" onChange={(event)=>this.setInfo(event,'duration')} required/>
    
   </div>
   </div>

   </div>
   <div className="row">
   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputPassword1">Commision <span className="text-danger">*</span></label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="5" onChange={(event)=>this.setInfo(event,'commision')} required/>
   </div>
   </div>

   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleSelectRole">Monthly Target<span className="text-danger">*</span></label>
    <input type="number" className="form-control" placeholder="3000" onChange={(event)=>this.setInfo(event,'target')}/>
   </div>
   </div>
   </div>

 </div>
  <div className="card-footer">
  {this.state.processing == true ?
   <button type="submit" className="btn btn-primary mr-2">proccesing data ! Please wait...</button>
   : <button type="submit" className="btn btn-primary mr-2">Add Service</button>}



   
  </div>
 </form>
 {/*end::Form*/}
</div>
</div>









		)
}



}


export default ServiceRegister