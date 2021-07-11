import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import Modal from 'react-modal'



class EditItems extends Component{

static contextType = baseContext


    state = {
        service_info:null,
        processing:false,
        alert:false,
        

        user_info:0,
        items_info:null

       


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
axios.post(this.context.baseUrl+'/items/get_item_info/',
    { 
        identify:Number(this.props.updateid)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({items_info:response.data,processing:false,parsed:true,errorMessage:false,alert:false})
      
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
    let copy = {...this.state.items_info};
    if(name == 'name'){
        copy['item_info']['name'] = event.target.value;
        this.setState({items_info:copy})
    }

    if(name == 'price'){
        copy['item_info']['price'] = event.target.value;
        this.setState({items_info:copy})
    }

    if(name == 'sale_price'){
        copy['item_info']['sale_price'] = event.target.value;
        this.setState({items_info:copy})
    }


    if(name == 'cat'){
        copy['item_info']['category'] = event.target.value;
        this.setState({items_info:copy})
    }


    if(name == 'commision'){
        copy['item_info']['commision'] = event.target.value;
        this.setState({items_info:copy})
    }

    if(name == 'target'){
        copy['item_info']['target'] = event.target.value;
        this.setState({items_info:copy})
    }


     if(name == 'taxes'){
        copy['item_info']['taxes'] = event.target.value;
        this.setState({items_info:copy})
    }


    

    
    


}


editItems(event){

 event.preventDefault();
 this.setState({processing:true});



axios.post(this.context.baseUrl+'/items/update_item/',
    {
    
        identify:Number(this.state.items_info.item_info.id),
        name:this.state.items_info.item_info.name,
        cat:Number(this.state.items_info.item_info.category),
        price:Number(this.state.items_info.item_info.price),
        sale_price:Number(this.state.items_info.item_info.sale_price),
        commision:Number(this.state.items_info.item_info.commision),
        target:Number(this.state.items_info.item_info.target),
        taxes:Number(this.state.items_info.item_info.taxes)

    
    
    
    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
     
        
        

        
      
      
    
      this.setState({
        processing:false,
        alert:true,
        errorMessage:'Item has been updated ! ',

    



    });
      
    

    }).catch((error)=>{
      
      this.setState({processing:false,alert:true,errorMessage:'Can not update ! Try agian later'})
    })




}



setNull(event){
  this.props.closemodal();
  this.setState({items_info:null})
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
      left: '40%',
      right: 'auto',
      bottom: '0%',
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
   Edit Items
  </h3>
  <div className="card-toolbar">
   <button className="btn btn-danger text-white" onClick={this.setNull.bind(this)}>Close</button>
  </div>
 </div>
 {/*begin::Form*/}
 <form onSubmit={this.editItems.bind(this)}>
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
   <div className="row">
   <div className="col-md-10">
     <div className="form-group">
    <label>Name <span className="text-danger">*</span></label>
    <input type="text" className="form-control" value={this.state.items_info.item_info.name} placeholder="item name" onChange={(event)=>this.setInfo(event,'name')}  />
    <span className="form-text text-muted"></span>
   </div>

   <div className="form-group">
    <label>Buy Price <span className="text-danger">*</span></label>
    <input type="number" className="form-control" value={this.state.items_info.item_info.price} placeholder="item buying price" onChange={(event)=>this.setInfo(event,'price')}  />
    <span className="form-text text-muted"></span>
   </div>


   <div className="form-group">
    <label>Selling Price <span className="text-danger">*</span></label>
    <input type="number" className="form-control" value={this.state.items_info.item_info.sale_price} placeholder="item selling price" onChange={(event)=>this.setInfo(event,'sale_price')}  />
    <span className="form-text text-muted"></span>
   </div>

   <div className="form-group">
    <label>Commision <span className="text-danger">*</span></label>
    <input type="number" className="form-control" value={this.state.items_info.item_info.commision} placeholder="commision" onChange={(event)=>this.setInfo(event,'commision')}  />
    <span className="form-text text-muted"></span>
   </div>

   <div className="form-group">
    <label>Monthly target <span className="text-danger">*</span></label>
    <input type="number" className="form-control" value={this.state.items_info.item_info.target} placeholder="target" onChange={(event)=>this.setInfo(event,'target')}  />
    <span className="form-text text-muted"></span>
   </div>


   <div className="form-group">
    <label> Taxes <span className="text-danger">*</span></label>
    <input type="number" className="form-control" value={this.state.items_info.item_info.taxes} placeholder="target" onChange={(event)=>this.setInfo(event,'taxes')}  />
    <span className="form-text text-muted"></span>
   </div>

   <div className="form-group">
   <label>Select Category <span className="text-danger">*</span></label>
     <select name="categories" onChange={(event)=>this.setInfo(event,'cat')} className="form-control" >
      {this.state.items_info.categories.map((data,index)=>{

        return (

        this.state.items_info.item_info.category == data.id?

          <option selected key={data.id} value={data.id}>{data.name}</option>
          :<option  key={data.id} value={data.id}>{data.name}</option>

        )
      })}
     
       
     </select>
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


export default EditItems