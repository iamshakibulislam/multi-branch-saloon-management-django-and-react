import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
class StaffRegister extends Component{

static contextType = baseContext


    state = {
        service_data:null,
        processing:false,
        alert:false,
        staff_data:null,
        errorMessage:false,
        itemid:null,
        providerid:null,
        quantity:null,
        
        items_info:null
       


    }




componentDidMount(){

this.setState({processing:true});
        axios.post(this.context.baseUrl+'/items/get_items_provider_list/',
    { 
        


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({items_info:response.data,processing:false,parsed:true})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })



}




setInfo(event,name){

    if(name == 'item'){
        this.setState({itemid:event.target.value})
    }

    if(name == 'provider'){
        this.setState({providerid:event.target.value})
    }

     if(name == 'quantity'){
        this.setState({quantity:event.target.value})
    }

    


}


addToStock(event){

 event.preventDefault();
 if (this.state.providerid==null || this.state.quantity==null || this.state.providerid==null){
    alert('All fields are required !');
    return false
 }
 this.setState({processing:true});



axios.post(this.context.baseUrl+'/items/add_to_stock/',
    {

        itemid:this.state.itemid,
        providerid:this.state.providerid,
        quantity:this.state.quantity


    


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
     
        this.setState({alert:true,errorMessage:'Email is already in used !',processing:false});

        
      
      
    
      this.setState({processing:false,alert:true,errorMessage:'Item added to stock ! '});
      event.target.reset()
    

    }).catch((error)=>{
      
      this.setState({processing:false,alert:true,errorMessage:'Can not add items to stock ! Try agian later'})
    })




}



render(){
	return(

<div>

<div className="card card-custom">
 <div className="card-header">
  <h3 className="card-title">
   Buy items
  </h3>
  <div className="card-toolbar">
   buy items from registered item provider
  </div>
 </div>
 {/*begin::Form*/}
 <form onSubmit={this.addToStock.bind(this)}>
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
   {this.state.items_info != null?
   <div className="row" style={{width:'60%'}}>
   <div className="col-md-12">
     <div className="form-group">
    <label>Select Item <span className="text-danger">*</span></label>
    <select name="item" className="form-control" id="item" onChange={(event)=>this.setInfo(event,'item')} required>
    <option key="someitems" value="selectitem" id="dome">Select Item</option>
    {this.state.items_info.items.map((data,index)=>{

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
    <label>Select Provider<span className="text-danger">*</span></label>
    <select name="provider" className="form-control" id="provider" onChange={(event)=>this.setInfo(event,'provider')} required>
    <option key="someprovider" value="selectprovider" id="dome">Select Provider</option>
    {this.state.items_info.providers.map((data,index)=>{

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
    <label>Quantity<span className="text-danger">*</span></label>
    <input type="number" className="form-control"  placeholder="1" onChange={(event)=>this.setInfo(event,'quantity')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>

   </div>:null}

   









   
  </div>
  <div className="card-footer">
  {this.state.processing == true ?
   <button type="submit" className="btn btn-primary mr-2">proccesing data ! Please wait...</button>
   : <button type="submit" className="btn btn-primary mr-2">Buy now</button>}



   
  </div>
 </form>
 {/*end::Form*/}
</div>
</div>









		)
}



}


export default StaffRegister