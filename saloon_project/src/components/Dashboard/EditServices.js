import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import Modal from 'react-modal';


class EditServices extends Component{

static contextType = baseContext


    state = {
        service_info:null,
        processing:false,
        alert:false,
        

        user_info:0,
       


    }



customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflow               :'auto',
  }
};



componentDidUpdate(prevprops,prevstate){

    if(prevprops.updateid != this.props.updateid && this.props.updateid != 0){
axios.post(this.context.baseUrl+'/marketing/get_service_info/',
    { 
        serviceid:Number(this.props.updateid)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({service_info:response.data,processing:false,parsed:true,errorMessage:false,alert:false})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,errorMessage:'Can not load data !'})
    })
            
    }
    
}



componentDidMount(){
    

/* this.setState({processing:true});
        axios.post(this.context.baseUrl+'/staff/staff_to_add/',
    { 
        


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({staff_data:response.data,processing:false,parsed:true})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })





    axios.post(this.context.baseUrl+'/staff/get_services/',
    { 
        


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({service_data:response.data,processing:false,parsed:true})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })
*/



}




setInfo(event,name){
    let copy = {...this.state.service_info};
    if(name == 'title'){
        copy['title'] = event.target.value;
        this.setState({service_info:copy})
    }

    if(name == 'location'){
        copy['servicelocation'] = event.target.value;
        this.setState({service_info:copy})
    }

    if(name == 'cost'){
        copy['cost'] = event.target.value;
        this.setState({service_info:copy})
    }

    if(name == 'taxes'){
        copy['taxes'] = event.target.value;
        this.setState({service_info:copy})
    }

    if(name == 'duration'){
        copy['serviceduration'] = event.target.value;
        this.setState({service_info:copy})
    }

    if(name == 'commision'){
        copy['servicecommision'] = event.target.value;
        this.setState({service_info:copy})
    }

    if(name == 'target'){
        copy['monthlytarget'] = event.target.value;
        this.setState({service_info:copy})
    }

    


}


editService(event){

 event.preventDefault();
 this.setState({processing:true});



axios.post(this.context.baseUrl+'/marketing/update_services/',
    {
    
        identify:Number(this.state.service_info.id),
        title:this.state.service_info.title,
        servicelocation:this.state.service_info.servicelocation,
        cost:Number(this.state.service_info.cost),
        taxes:Number(this.state.service_info.taxes),
        serviceduration:Number(this.state.service_info.serviceduration),
        servicecommision:Number(this.state.service_info.servicecommision),
        monthlytarget:Number(this.state.service_info.monthlytarget)

    
    
    
    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
     
        
        

        
      
      
    
      this.setState({
        processing:false,
        alert:true,
        errorMessage:'Service has been updated ! ',

    



    });
      
    

    }).catch((error)=>{
      
      this.setState({processing:false,alert:true,errorMessage:'Can not update ! Try agian later'})
    })




}



render(){
    return(


<Modal
          isOpen={this.props.editingmode}
          
          style={{
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255,0.70)'
    },
    content: {

      position: 'absolute',
      top: '40px',
      left: '30%',
      right: 'auto',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
  }}
          contentLabel="Example Modal"
        >

<div className="card card-custom" style={{overflow:'scroll',height:'100%'}}>
 <div className="card-header">
  <h3 className="card-title">
   Edit Service
  </h3>
  <div className="card-toolbar">
   <button className="btn btn-danger text-white" onClick={this.props.closemodal}>Close</button>
  </div>
 </div>
 {/*begin::Form*/}
 <form onSubmit={this.editService.bind(this)}>
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
   {this.state.service_info != null?
   <div className="row">
   <div className="col-md-6">
     <div className="form-group">
    <label>Title <span className="text-danger">*</span></label>
    <input type="text" className="form-control" value={this.state.service_info.title} placeholder="Service title" onChange={(event)=>this.setInfo(event,'title')}  />
    <span className="form-text text-muted"></span>
   </div>
   </div>
   

   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputDate">Duration(minute)<span className="text-danger">*</span></label>
    <input type="number" className="form-control" value={this.state.service_info.serviceduration} id="exampleInputDate"  onChange={(event)=>this.setInfo(event,'duration')} />
   </div>
   </div>
   </div>:null}
   {this.state.service_info != null?
   <div className="row">
   <div className="col-md-6">
     <div className="form-group">
    <label>Cost <span className="text-danger">*</span></label>
    <input type="number" className="form-control" value={this.state.service_info.cost}  placeholder="22" onChange={(event)=>this.setInfo(event,'cost')} />
    <span className="form-text text-muted"></span>
   </div>
   </div>
   <div className="col-md-6">
   <div className="form-group">
    <label>Tax <span className="text-danger">*</span></label>
    <input type="number" value={this.state.service_info.taxes} className="form-control"  placeholder="2" onChange={(event)=>this.setInfo(event,'taxes')} />
    
   </div>
   </div>

   </div>:null}

   {this.state.service_info != null ?
   <div className="row">
   <div className="col-md-12">
   <div className="form-group">
    <label>Service location <span className="text-danger">*</span></label>
    <textarea type="text" className="form-control" value={this.state.service_info.servicelocation}  placeholder="Location" onChange={(event)=>this.setInfo(event,'location')} />
    <span className="form-text text-muted"></span>
   </div>
   </div>

  
   </div>:null}




{this.state.service_info != null?
   <div className="row">
   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputDate">Commision($) <span className="text-danger">*</span></label>
    <input type="number" className="form-control" value={this.state.service_info.servicecommision}  id="exampleCommison"  onChange={(event)=>this.setInfo(event,'commision')} />
   </div>
   </div>

   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputDate">Monthly target($) <span className="text-danger">*</span></label>
    <input type="number" className="form-control" value={this.state.service_info.monthlytarget}  id="exampleTarget"  onChange={(event)=>this.setInfo(event,'target')} />
   </div>
   </div>


 
   
   </div>:null}


   
  </div>
  <div className="card-footer">
  {this.state.processing == true ?
   <button type="submit" className="btn btn-primary mr-2">proccesing data ! Please wait...</button>
   : <button type="submit" className="btn btn-primary mr-2">Update Staff</button>}



   
  </div>
 </form>
 {/*end::Form*/}
</div>
</Modal>










        )
}



}


export default EditServices