import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'


class order extends Component{

static contextType = baseContext


    state = {
        service_data:null,
        processing:false,
        alert:false,
        staff_data:null,
        errorMessage:false,
        
        branchlist:null,

        branchid:null,
        stafflist:null,
        staffid:null,
        services:null,
        date:null,
        time:null,
        available_services:null
       


    }




componentDidMount(){

this.setState({processing:true});
        axios.post(this.context.baseUrl+'/branch/show_branch/',
    { 
        


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({branchlist:response.data,processing:false,parsed:true})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })



}




setInfo(event,name){

    if(name == 'branch'){
       this.setState({branchid:event.target.value});
        this.setState({processing:true});


    axios.post(this.context.baseUrl+'/items/get_services/',
    { 
        identify:Number(event.target.value)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({available_services:response.data,processing:false,parsed:true})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })

    }

  

     if(name == 'date'){
        this.setState({date:event.target.value})
    }

    if(name == 'time'){
        this.setState({time:event.target.value})
    }


    if(name=='services'){

        this.setState({service_data:[]});
        let opt =[];
        let selectElement = document.getElementById('selected_services');
        Array.from(selectElement.selectedOptions).map(option => opt.push(option.value));

        this.setState({service_data:opt});


    }


    


}


order(event){

 event.preventDefault();
 if (this.state.staffid==null || this.state.branchid==null || this.state.service_data==null){
    alert('All fields are required !');
    return false
 }
 this.setState({processing:true});



axios.post(this.context.baseUrl+'/items/place_order/',
    {

        branchid:Number(this.state.branchid),
        staffid:Number(this.state.staffid),
        services:JSON.stringify(this.state.service_data),
        date:this.state.date,
        time:this.state.time


    


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
     
        

        
      
      
    
      this.setState({processing:false,alert:true,errorMessage:'Order has been placed ! '});
      event.target.reset()
    

    }).catch((error)=>{
      
      this.setState({processing:false,alert:true,errorMessage:'Can not place order !'})
    })




}



render(){
	return(

<div>

<div className="card card-custom">
 <div className="card-header">
  <h3 className="card-title">
   Book an appointment
  </h3>
  <div className="card-toolbar">
   Select branch and services and date
  </div>
 </div>
 {/*begin::Form*/}
 <form onSubmit={this.order.bind(this)}>
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
   {this.state.branchlist != null?
   <div className="row" style={{width:'60%'}}>
   <div className="col-md-12">
     <div className="form-group">
    <label>Select Branch <span className="text-danger">*</span></label>
    <select name="item" className="form-control" id="item" onChange={(event)=>this.setInfo(event,'branch')} required>
    <option key="someitems" value="selectitem" id="dome">Select Branch</option>
    {this.state.branchlist.map((data,index)=>{

        return (

                <option key={index} value={data.id}>{data.name}</option>


            )
    })}
    </select>
    <span className="form-text text-muted"></span>
   </div>
   </div>
   



   <div className="col-md-12">
   <div className="form-group">
    <label>Services<span className="text-danger">*</span></label>
    <select multiple name="provider" className="form-control" id="selected_services" onChange={(event)=>this.setInfo(event,'services')} required>
    {this.state.services == null?
    <option key="someprovider" value="selectprovider" id="services">Select services</option>
    :null}
    {this.state.available_services != null?
    this.state.available_services.map((data,index)=>{

        return (

                <option key={index} value={data.id}>{data.name}</option>


            )
    }):null}
    </select>
    <span className="form-text text-muted"></span>
   </div>
   </div>


   <div className="col-md-12">
   <div className="form-group">
    <label>Select staff<span className="text-danger">*</span></label>
    <select name="staff" className="form-control" id="provider" onChange={(event)=>this.setInfo(event,'staff')} required>
    <option key="someprovider" value="selectprovider" id="dome">Select Staff</option>
    {this.state.stafflist != null?

    this.state.stafflist.map((data,index)=>{

        return (

                <option key={index} value={data.id}>{data.name}</option>


            )
    }):null}
    </select>
    <span className="form-text text-muted"></span>
   </div>
   </div>




<div className="col-md-12">
   <div className="form-group">
    <label>Date<span className="text-danger">*</span></label>
    <input type="date" className="form-control"   onChange={(event)=>this.setInfo(event,'date')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>

   <div className="col-md-12">
   <div className="form-group">
    <label>Time<span className="text-danger">*</span></label>
    <input type="time" className="form-control"  placeholder="1" onChange={(event)=>this.setInfo(event,'time')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>

   </div>:null}

   









   
  </div>
  <div className="card-footer">
  {this.state.processing == true ?
   <button type="submit" className="btn btn-primary mr-2">proccesing data ! Please wait...</button>
   : <button type="submit" className="btn btn-primary mr-2">Place order</button>}



   
  </div>
 </form>
 {/*end::Form*/}
</div>
</div>









		)
}



}


export default order