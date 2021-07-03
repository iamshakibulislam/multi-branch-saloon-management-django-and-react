import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import Modal from 'react-modal';


class EditVoucher extends Component{

static contextType = baseContext


    state = {
        cat_info:null,
        processing:false,
        alert:false,
        

        user_info:0,
        branch_info:null,
        voucher_edit_info:null

       


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
axios.post(this.context.baseUrl+'/marketing/get_voucher_info/',
    { 
        identify:Number(this.props.updateid)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({voucher_edit_info:response.data,processing:false,parsed:true,errorMessage:false,alert:false})
      
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
    let copy = {...this.state.voucher_edit_info};
    if(name == 'name'){
        copy['name'] = event.target.value;
        this.setState({voucher_edit_info:copy})
    }

    if(name == 'price'){
        copy['price'] = event.target.value;
        this.setState({voucher_edit_info:copy})
    }

    if(name == 'value'){
        copy['value'] = event.target.value;
        this.setState({voucher_edit_info:copy})
    }


    

    


}


editVoucher(event){

 event.preventDefault();
 this.setState({processing:true});



axios.post(this.context.baseUrl+'/marketing/update_voucher/',
    {
    
        identify:Number(this.state.voucher_edit_info.id),
        name:this.state.voucher_edit_info.name,
        price:Number(this.state.voucher_edit_info.price),
        value:Number(this.state.voucher_edit_info.value)
        
    
    
    
    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
     
        
        

        
      
      
    
      this.setState({
        processing:false,
        alert:true,
        errorMessage:'voucher has been updated ! ',

    



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
   Edit Voucher
  </h3>
  <div className="card-toolbar">
   <button className="btn btn-danger text-white" onClick={this.props.closemodal}>Close</button>
  </div>
 </div>
 {/*begin::Form*/}
 <form onSubmit={this.editVoucher.bind(this)}>
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
   {this.state.voucher_edit_info != null?
   <div className="row">
   <div className="col-md-10">
     <div className="form-group">
    <label>name <span className="text-danger">*</span></label>
    <input type="text" className="form-control" value={this.state.voucher_edit_info.name} placeholder="Voucher name" onChange={(event)=>this.setInfo(event,'name')}  />
    <span className="form-text text-muted"></span>
   </div>

   <div className="form-group">
    <label>price <span className="text-danger">*</span></label>
    <input type="number" className="form-control" value={this.state.voucher_edit_info.price} placeholder="Voucher price" onChange={(event)=>this.setInfo(event,'price')}  />
    <span className="form-text text-muted"></span>
   </div>


   <div className="form-group">
    <label>value <span className="text-danger">*</span></label>
    <input type="number" className="form-control" value={this.state.voucher_edit_info.value} placeholder="Voucher value" onChange={(event)=>this.setInfo(event,'value')}  />
    <span className="form-text text-muted"></span>
   </div>


   </div>
   

   

   
   </div>:null}
   







   
  </div>
  <div className="card-footer">
  {this.state.processing == true ?
   <button type="submit" className="btn btn-primary mr-2">proccesing data ! Please wait...</button>
   : <button type="submit" className="btn btn-primary mr-2">Update</button>}



   
  </div>
 </form>
 {/*end::Form*/}
</div>
</Modal>










        )
}



}


export default EditVoucher