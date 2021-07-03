import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import Modal from 'react-modal'



class CalenderOrders extends Component{

static contextType = baseContext


    state = {
        service_info:null,
        processing:false,
        alert:false,
        alertMessage:null,
        
        orders_info:null,

        user_info:0,
        items_info:null,
        date:null,
        orderid:null,

        modified_services:[],
        modified_items:[],
        modified_time:null,
        modified_status:null

       


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

    if(prevprops.orderid != this.props.orderid && this.props.orderid != null){
      this.setState({'alert':false});


      axios.post(this.context.baseUrl+'/items/get_order_details/',
    { 
        orderid:Number(this.props.orderid)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({orders_info:response.data,processing:false,parsed:true})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !'})
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





editItems(event){

 event.preventDefault();
 this.setState({processing:true});



axios.post(this.context.baseUrl+'/items/update_item/',
    {
    
        identify:Number(this.state.items_info.item_info.id),
        name:this.state.items_info.item_info.name,
        cat:Number(this.state.items_info.item_info.category),
        price:Number(this.state.items_info.item_info.price),
        sale_price:Number(this.state.items_info.item_info.sale_price)

    
    
    
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


setUpdate(event,name){
  if(name=='services'){
    this.setState({modified_services:[]});
        let opt =[];
        let selectElement = document.getElementById('selected_services');
        Array.from(selectElement.selectedOptions).map(option => opt.push(option.value));

        this.setState({modified_services:opt});
  }

  if(name=='items'){
    this.setState({modified_items:[]});
        let opt =[];
        let selectElement = document.getElementById('selected_items');
        Array.from(selectElement.selectedOptions).map(option => opt.push(option.value));

        this.setState({modified_items:opt});
  }


  if(name=='status'){
    this.setState({modified_status:event.target.value})
  }

  if(name == 'time'){
   let cp = {...this.state.orders_info};

    cp['time'] = event.target.value;

    
    this.setState({orders_info:cp});
    this.setState({modified_time:event.target.value})
  }
}

updateOrder(event){
  event.preventDefault();

  this.setState({processing:true});

    axios.post(this.context.baseUrl+'/items/update_order/',
    { 
        orderid:Number(this.props.orderid),
        modified_services:JSON.stringify(this.state.modified_services),
        modified_items:JSON.stringify(this.state.modified_items),
        modified_status:this.state.modified_status,
        modified_time:this.state.modified_time



    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({alert:true,alertMessage:'successfully updated order',processing:false,parsed:true})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,alertMessage:'Can not update !'})
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
      backgroundColor: 'rgba(255, 255, 255,0.10)',
      opacity:1,
      zIndex:1
    },
    content: {

      position: 'absolute',
      top: '40px',
      left: '40%',
      right: 'auto',
      bottom: '5%',
      border: '1px solid #ccc',
      background: 'grey',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px',
      backgroundColor:'grey',
      opacity:1,
      zIndex:2
    }
  }}
          contentLabel="Example Modal"
        >


        <div className="card card-custom gutter-b">
                  <div className="card-header flex-wrap py-3">
                    <div className="card-title">
                      <h3 className="card-label">Modify  order
                      <span className="d-block text-muted pt-2 font-size-sm"></span></h3>
                    </div>
                    <div className="card-toolbar">
                      {/*begin::Dropdown*/ }
                      
                      <a className="btn btn-danger" onClick={this.props.closingmodal}>Close </a>
                      
                      {/*end::Button*/ }
                    </div>
                  </div>
                  <div className="card-body">
                    {/*begin: Datatable*/ }
                    
                 
                 {this.state.alert == true?
                 <div className="alert alert-success">{this.state.alertMessage}</div>:null}

                 {this.state.orders_info !=null ?
                    <form className="form" onSubmit={this.updateOrder.bind(this)}>
                    <div className="row">
                    <div className="col-md-6">

                    <div className="form-group">
                      <label>Modify services</label>
                      <select multiple className="form-control" id="selected_services" onChange={(event)=>this.setUpdate(event,'services')}>
                        {this.state.orders_info.available_services.map((data,index)=>{return(

                          this.state.orders_info.services.some(m=>m.id == data.id)?
                          <option value={data.id} selected id={data.id}>{data.title}</option>
                          :<option value={data.id}  id={data.id}>{data.title}</option>


                          )})}
                      </select>
                    </div>
                    </div>


                    <div className="col-md-6">
                    
                    <div className="form-group">
                      <label>Modify Items</label>
                      <select multiple className="form-control" id="selected_items" onChange={(event)=>this.setUpdate(event,'items')}>
                        {this.state.orders_info.available_items.map((data,index)=>{return(

                          this.state.orders_info.items.some(m=>m.id == data.id)?
                          <option value={data.id} selected id={data.id}>{data.name}</option>
                          :<option value={data.id}  id={data.id}>{data.name}</option>


                          )})}
                      </select>
                    </div>
                    </div>
                    </div>

                    

                    {this.state.orders_info != null?
                    <div className="row">
                 <div className="col-md-12">

                    
                    <div className="row">
                    <div className="col-md-6">

                    <div className="form-group">
                      <label>Status</label>
                      {this.state.orders_info.status=='pending'?
                      <select className="form-control" onChange={(event)=>this.setUpdate(event,'status')}>
                      
                        <option selected value="pending">pending</option>
                        <option value="approved">approved</option>
                        <option value="canceled">canceled</option>
                        <option value="completed">completed</option>

                      </select>:this.state.orders_info.status == 'approved'?
                      <select className="form-control" onChange={(event)=>this.setUpdate(event,'status')}>
                      
                        <option value="pending">pending</option>
                        <option selected value="approved">approved</option>
                        <option value="canceled">canceled</option>
                        <option value="completed">completed</option>

                      </select>:this.state.orders_info.status=='canceled'?

                      <select className="form-control" onChange={(event)=>this.setUpdate(event,'status')}>
                      
                        <option value="pending">pending</option>
                        <option value="approved">approved</option>
                        <option selected value="canceled">canceled</option>
                        <option value="completed">completed</option>

                      </select>:this.state.orders_info.status=='completed'?
                      <select className="form-control" onChange={(event)=>this.setUpdate(event,'status')}>
                      
                        <option value="pending">pending</option>
                        <option  value="approved">approved</option>
                        <option value="canceled">canceled</option>
                        <option selected value="completed">completed</option>

                      </select>:null



                    }
                    </div>
                    </div>


                    <div className="col-md-6">
                    
                    <div className="form-group">
                      <label>Time</label>
                      <input type="time" value={this.state.orders_info.time} onChange={(event)=>this.setUpdate(event,'time')} className="form-control"/>
                    </div>
                    </div>
                    </div>

                    
                    </div>
                    </div>
                    :null}

                    <div className="row justify-content-center">
                    <div className="col-md-8">
                    {this.state.processing == true?
                    <button type="submit" className="btn btn-success">Please wait....</button>:
                    <button type="submit" className="btn btn-success">Update Order</button>}

                    </div>
                    </div></form>:null}


                    {/*end: Datatable*/ }
                  </div>
                </div>



</Modal>










        )
}



}


export default CalenderOrders