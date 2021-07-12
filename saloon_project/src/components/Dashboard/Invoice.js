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
        modified_status:null,
        modified_payment_method:null,
        modified_payment_status:null

       


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

    if(prevprops.provider_names != this.props.provider_names && this.props.provider_names != null){
      this.setState({'alert':false});


      
      

            
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
        modified_time:this.state.modified_time,
        modified_payment_method:this.state.modified_payment_method,
        modified_payment_status:this.state.modified_payment_status



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
      top: 10,
      left: 0,
      right: 0,
      bottom: 10,
      backgroundColor: 'rgba(255, 255, 255,0.10)',
      opacity:1,
      zIndex:1
    },
    content: {

      position: 'absolute',
      top: '40px',
      left: '30%',
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
                      <h3 className="card-label">Order Summery
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
                    <table className="table table-bordered table-checkable" id="kt_datatable">
                      <thead>
                        <tr>
                          <th>Service Name</th>
                          <th>Provider</th>
                          
                          <th>Price Value</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                      {this.props.service_names != null?

                        this.props.service_names.map((data,index)=>{

                          return(

                          <tr>
                          <td>{data}</td>
                          <td>{this.props.provider_names[index]} </td>
                          
                          <td>{this.props.service_costs[index]} $</td>
                          
                          <td nowrap="nowrap"></td>
                        </tr>)


                        })
                        :null}
                        
                        
                      </tbody>
                    </table>

                    <h4 className="text-center">Items Summery</h4>

                    <table className="table table-bordered table-checkable" id="kt_datatable">
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          
                          
                          <th>Price</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                      {this.props.item_names != null?

                        this.props.item_names.map((data,index)=>{

                          return(

                          <tr>
                          <td>{data}</td>
                          <td>{this.props.item_prices[index]} $</td>
                          
                          
                          
                          
                        </tr>)


                        })
                        :null}
                        
                        
                      </tbody>
                    </table>

                    <h5 className="text-dark font-weight-bold">Total cost(included tax):{this.props.total_cost.toFixed(2)} $</h5>
                    <h5 className="text-dark font-weight-bold">Total Tax : {this.props.tax_cost.toFixed(2)} $</h5><br/>
                    {this.props.processing == true?
                    <button type="button" onClick={this.props.order} className="btn btn-primary">Please wait .... </button>
                    :<button type="button" onClick={this.props.order} className="btn btn-primary">Proceed </button>}
                    {/*end: Datatable*/ }
                  </div>

                  
                </div>



</Modal>










        )
}



}


export default CalenderOrders