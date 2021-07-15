import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import Modal from 'react-modal'



class EditCategory extends Component{

static contextType = baseContext


    state = {
        service_info:null,
        processing:false,
        alert:false,
        

        user_info:0,
        category_info:null

       


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
axios.post(this.context.baseUrl+'/items/get_cat_info/',
    { 
        identify:Number(this.props.updateid)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({category_info:response.data,processing:false,parsed:true,errorMessage:false,alert:false})
      
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
    let copy = {...this.state.category_info};
    if(name == 'name'){
        copy['name'] = event.target.value;
        this.setState({category_info:copy})
    }

    
    


}


editCategory(event){

 event.preventDefault();
 this.setState({processing:true});



axios.post(this.context.baseUrl+'/items/cat_update/',
    {
    
        identify:Number(this.state.category_info.id),
        name:this.state.category_info.name,
        

    
    
    
    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
     
        
        

        
      
      
    
      this.setState({
        processing:false,
        alert:true,
        errorMessage:'Category has been updated ! ',

    



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
      top: 50,
      left: 0,
      right: 0,
      bottom: 50,
      backgroundColor: 'rgba(255, 255, 255,0.70)'
    },
    content: {

      position: 'absolute',
      top: '40px',
      left: '30%',
      right: 'auto',
      bottom: '20%',
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
   Edit Category
  </h3>
  <div className="card-toolbar">
   <button className="btn btn-danger text-white" onClick={this.props.closemodal}>Close</button>
  </div>
 </div>
 {/*begin::Form*/}
 <form onSubmit={this.editCategory.bind(this)}>
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
   {this.state.category_info != null?
   <div className="row">
   <div className="col-md-9">
     <div className="form-group">
    <label>Name <span className="text-danger">*</span></label>
    <input type="text" className="form-control" value={this.state.category_info.name} placeholder="category name" onChange={(event)=>this.setInfo(event,'name')}  />
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


export default EditCategory