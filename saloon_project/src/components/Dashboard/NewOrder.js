import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import Modal from 'react-modal'
import StaffOrder from './StaffOrder'



class NewOrder extends Component{

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

        searchemail:null,
        foundstatus:null,

        account_created:false,

        first_name:null,
        last_name:null,
        user_email:null,
        username:null,
        password:null,
        phone:null,

        createAccount:false,
        useremail:null


       


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




checkUser(event){

  event.preventDefault();


  this.setState({foundstatus:null});
    axios.post(this.context.baseUrl+'/api/authentication/user_info_by_email/',
    { 
       email:this.state.searchemail,
       


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);

      if(response.data['status']=='found'){
        this.setState({foundstatus:true,searchemail:response.data['email'],useremail:response.data['email']});
        this.setState({alert:true,alertMessage:'User found ! please make order',processing:false,parsed:true})
      }

      else if(response.data['status'] == 'not found'){
        this.setState({foundstatus:false});
        this.setState({alert:true,alertMessage:'User Not Found ! please register first',processing:false,parsed:true})
      }
      
      
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,alertMessage:'Error has occured !'})
    })



}




createUser(event){
  event.preventDefault();


  this.setState({process:true});
  axios.post(this.context.baseUrl+'/api/authentication/register',
    {first_name:this.state.first_name,
    last_name:this.state.last_name,
    email:this.state.user_email,
    password:this.state.password,
    password2:this.state.password,
    username:this.state.username,
    phone:this.state.phone

    }).then((response)=>{
      console.log(response.data);
      if(response.data.email[0]=='user with this email already exists.'){
        
        this.setState({alert:true,errorMessage:'Email is already in used !',process:false});

        return false
      }
      
    
      this.setState({account_created:true,process:false,alert:true,alertMessage:'Account has been created ! Please book an order'})
    

    }).catch((error)=>{
      console.log(error.response)
      this.setState({process:false})
    })

}


closingUpdate(event){
this.props.closingmodal();
this.setState({foundstatus:null,account_created:false,alert:false,alertMessage:null})
}


render(){
    return(






<Modal
          isOpen={this.props.new_order_modal}
          
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


        <div className="card card-custom gutter-b" > 
                  <div className="card-header flex-wrap py-3">
                    <div className="card-title">
                      <h3 className="card-label">Search and create new  order
                      <span className="d-block text-muted pt-2 font-size-sm"></span></h3>
                    </div>
                    <div className="card-toolbar">
                      {/*begin::Dropdown*/ }
                      <a className="btn btn-info mr-3" onClick={()=>this.setState({createAccount:false})}>New Order</a>
                      <a className="btn btn-success mr-4" onClick={()=>this.setState({createAccount:true})}>Create New Account</a>
                      <a className="btn btn-danger" onClick={this.closingUpdate.bind(this)}>Close </a>
                      
                      {/*end::Button*/ }
                    </div>
                  </div>
                  <div className="card-body">
                    {/*begin: Datatable*/ }
                    
                 
                 {this.state.alert == true?
                  <div className="row justify-content-center">
                  <div className="col-md-5">
                 <div className="alert alert-success">{this.state.alertMessage}</div></div></div>:null}
                 <div className="row">
                   <div className="col-md-12">

                   

                   <form className="form form-inline" onSubmit={this.checkUser.bind(this)}>
                     <div className="form-group mr-2">
                       
                       <input type="text" placeholder="EMAIL OR PHONE" onChange={(event)=>this.setState({searchemail:event.target.value})} className="form-control" required/>
                     </div>
                     <div className="form-group">
                       <input type="submit" className="btn btn-success ml-2" value="search"/>
                     </div>
                   </form>
                   
                   </div>
                 </div>

                 
                 <div className="row justify-content-center">
                   
                   {this.state.createAccount == false?
                   <StaffOrder date={this.props.date} email={this.state.useremail}/>

                   :null}
                   

                   {this.state.createAccount == true?

                    <div className="col-md-6 mt-4">

                    <form className="form mt-4" onSubmit={this.createUser.bind(this)}>
                    <div className="row mt-4">
                      <div className="col-md-5">
                      <div className="form-group">

                      <input type="text" placeholder="first name" onChange={(event)=>this.setState({first_name:event.target.value})} className="form-control"/>

                      </div>
                      </div>


                      <div className="col-md-5">

                      <div className="form-group">

                      <input type="text" placeholder="last name" onChange={(event)=>this.setState({last_name:event.target.value})} className="form-control"/>

                      </div>
                      </div>

                      <div className="col-md-5">
                      <div className="form-group">

                      <input type="text" placeholder="Username" onChange={(event)=>this.setState({username:event.target.value})} className="form-control"/>

                      </div>
                      </div>

                      <div className="col-md-5">

                      <div className="form-group">

                      <input type="email" placeholder="Enter user email" onChange={(event)=>this.setState({user_email:event.target.value})} className="form-control"/>

                      </div>
                      </div>

                      <div className="col-md-5">

                      <div className="form-group">

                      <input type="password" placeholder="Enter User password" onChange={(event)=>this.setState({password:event.target.value})} className="form-control"/>

                      </div>
                      </div>
                      <div className="col-md-5">
                      <div className="form-group">

                      <input type="text" placeholder="Phone number" onChange={(event)=>this.setState({phone:event.target.value})} className="form-control"/>

                      </div>
                      </div>
                      <div className="col-md-12">
                      <div className="form-group">

                      <input type="submit" value="Create User"  className="btn btn-primary"/>

                      </div>
                      </div>

                      </div>
                    </form>

                    </div>:null



                 }
                   
                 </div>


                    {/*end: Datatable*/ }
                  </div>
                </div>



</Modal>










        )
}



}


export default NewOrder