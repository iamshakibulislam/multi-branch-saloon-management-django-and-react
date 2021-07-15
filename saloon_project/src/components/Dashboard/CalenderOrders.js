import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import Modal from 'react-modal'
import ModifyOrder from './ModifyOrder'
import NewOrder from './NewOrder'



class CalenderOrders extends Component{

static contextType = baseContext


    state = {
        service_info:null,
        processing:false,
        alert:false,
        
        orders_info:[],

        user_info:0,
        items_info:null,
        date:null,
        orderid:null,
        eiditngmode:false,
        new_order_modal:false

       


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

    if(prevprops.date != this.props.date && this.props.date != null){
axios.post(this.context.baseUrl+'/staff/my_orders/',
    { 
        date:this.props.date


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({orders_info:response.data,processing:false,parsed:true,errorMessage:false,alert:false})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,errorMessage:'Can not load data !'})
    })
            
    }
    
}


needRefresh(){
  axios.post(this.context.baseUrl+'/staff/my_orders/',
    { 
        date:this.props.date


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({orders_info:response.data,processing:false,parsed:true,errorMessage:false,alert:false})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,errorMessage:'Can not load data !'})
    })
}


closeModal(){
  this.setState({editingmode:false,orderid:null,new_order_modal:false});
  this.needRefresh()
}

openOrder(event){

  this.setState({orderid:event.currentTarget.id,editingmode:true});


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


openOrderForm(event){

  this.setState({new_order_modal:true})

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
      left: '20%',
      right: 'auto',
      bottom: '5%',
      border: '1px solid #ccc',
      background: 'rgba(255, 255, 255,0.10)',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px',
      backgroundColor:'rgba(255, 255, 255,0.10)',
      opacity:1,
      zIndex:2
    }
  }}
          contentLabel="Example Modal"
        >


        <div className="card card-custom gutter-b">
                  <div className="card-header flex-wrap py-3">
                    <div className="card-title">
                      <h3 className="card-label">Your upcomming Orders Of this day
                      <span className="d-block text-muted pt-2 font-size-sm"></span></h3>
                    </div>
                    <div className="card-toolbar">
                      {/*begin::Dropdown*/ }
                      <a className="btn btn-primary mr-4" onClick={(event)=>this.openOrderForm(event)}>Create New Order</a>
                      <a className="btn btn-danger" onClick={this.props.closingmodal}>Close</a>
                      {/*end::Dropdown*/ }
                      {/*begin::Button*/ }
                      
                      {/*end::Button*/ }
                    </div>
                  </div>
                  <div className="card-body">
                    {/*begin: Datatable*/ }
                    <table className="table table-bordered table-checkable" id="kt_datatable">
                      <thead>
                        <tr>
                          <th>Order date</th>
                          <th>User name</th>
                          <th>Services</th>
                          <th>Items</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th>Action</th>
                          
                        </tr>
                      </thead>
                      {this.state.orders_info.length != 0?
                      <tbody>
                        {this.state.orders_info.map((data,index)=>{return(

                          <tr>
                          <td>{data.date}</td>
                          <td>{data.user}</td>
                          <td>{data.services}</td>
                          <td>{data.items}</td>
                          <td>{data.time}</td>
                          <td>{data.status}</td>
                          <td id={data.id} onClick={(event)=>this.openOrder(event)} className="btn btn-primary btn-sm">Modify order</td>
                          </tr>


                          )})}
                        
                         
                      


                        
                        
                        
                        
                      </tbody>:
                      <tbody><tr> <td colspan = "7" className="text-center">No data available</td></tr></tbody>}
                    </table>
                    {/*end: Datatable*/ }
                  </div>
                </div>


                <ModifyOrder closingmodal={this.closeModal.bind(this)} orderid={this.state.orderid} editingmode={this.state.editingmode}/>
                <NewOrder date={this.props.date} closingmodal={this.closeModal.bind(this)}  new_order_modal={this.state.new_order_modal}/>



</Modal>










        )
}



}


export default CalenderOrders