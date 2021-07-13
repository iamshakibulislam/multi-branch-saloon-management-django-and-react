import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import Invoice from './Invoice'


class StaffOrder extends Component{

static contextType = baseContext


    state = {
        service_data:[],
        processing:false,
        alert:false,
        staff_data:null,
        errorMessage:false,
        
        branchlist:null,

        branchid:null,
        stafflist:null,
        staffid:[],
        services:null,
        date:null,
        time:null,

        available_services:null,
        available_staff:null,
        items:null,

        items_info:[],

        service_names:[],

        itemforservice:[],

        total_cost:0,
        tax_cost:0,

        useremail:null,
        showExpress:false,
        payment_type:'zero',
        service_costs:[],

        item_names:[],

        item_prices:[],

        provider_names:[],

        eiditingmode:false,

        userMail:null,
        partial_amount:0
       


    }



componentDidUpdate(prevprops){
    if(prevprops.email != this.props.email && (this.state.useremail == null || this.state.useremail=='')){
    this.setState({useremail:this.props.email})
}
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

    if(name=='email'){
        this.setState({useremail:event.target.value})
    }

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





    this.setState({processing:true});
        axios.post(this.context.baseUrl+'/items/get_items_list/',
    { 
        identify:Number(document.getElementById('item').value)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({items:response.data,processing:false,parsed:true})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,message:'Can not load data !'})
    })


    }

  

     if(name == 'date'){
        this.setState({date:event.target.value})
    }

    if(name == 'email'){

        this.setState({useremail:event.target.value})
    }

    if(name == 'staff'){

    this.setState({staffid:event.target.value})

    }

    if(name == 'time'){
        this.setState({time:event.target.value})
    }




    if(name=='services'){

        //starting setting services

    let get_selected_row = event.target.parentElement;

    let cost = get_selected_row.previousSibling.getAttribute('value');
    let tax = get_selected_row.previousSibling.getAttribute('tax');
    let staffid = get_selected_row.previousSibling.previousSibling.getAttribute('value');
    let provider_name = get_selected_row.previousSibling.previousSibling.textContent;
    let serviceid = get_selected_row.previousSibling.previousSibling.previousSibling.getAttribute('value');

    let servicename = get_selected_row.previousSibling.previousSibling.previousSibling.textContent;


    

    if(this.state.service_data.includes(serviceid) == false){
    event.target.parentElement.parentElement.classList.add('bg-success','text-white');
    event.target.textContent = 'Deselect';
       let get_serv_data = [...this.state.service_data];

        get_serv_data.push(serviceid);

        let get_staffs = [...this.state.staffid];

        get_staffs.push(staffid);


        let getServiceCostData = [...this.state.service_costs];

        getServiceCostData.push(cost);

        let servname = [...this.state.service_names];

        servname.push(servicename);


        let providers = [...this.state.provider_names];

        providers.push(provider_name)



        this.setState({provider_names:providers,service_costs:getServiceCostData,tax_cost:Number(this.state.tax_cost)+Number(cost*tax*0.01),service_names:servname,service_data:get_serv_data,total_cost:Number(this.state.total_cost)+Number(cost)+Number(cost*0.01*tax),staffid:get_staffs});


    }else if(event.target.textContent == 'Deselect'){

        event.target.parentElement.parentElement.classList.remove('bg-success','text-white');
        event.target.textContent = 'Select';

        let get_serv_data = [...this.state.service_data];

        let findoutindex = get_serv_data.indexOf(serviceid);

       
        let filteredarr = get_serv_data.filter(el=> el != serviceid);

        let get_staff_data = [...this.state.staffid];

        get_staff_data.splice(findoutindex,1);

        let get_service_names = [...this.state.service_names];
        get_service_names.splice(findoutindex,1);


        let getServiceCosts = [...this.state.service_costs];
        getServiceCosts.splice(findoutindex,1);


        let providers = [...this.state.provider_names];

        providers.splice(findoutindex,1)

        this.setState({provider_names:providers,service_costs:getServiceCosts,tax_cost:Number(this.state.tax_cost)-Number(cost*0.01*tax),service_names:get_service_names,service_data:filteredarr,staffid:get_staff_data,total_cost:Number(this.state.total_cost) - (Number(cost)+Number(cost*0.01*tax))});






    }




        //end of requesting for staffs


    }






    if(name=='items'){

        
         //items setting starting here

    let get_selected_row = event.target.parentElement;

    let price = get_selected_row.previousSibling.getAttribute('value');
    let name = get_selected_row.previousSibling.previousSibling.textContent;
    let tax = get_selected_row.previousSibling.getAttribute('tax');
    let itemid = get_selected_row.previousSibling.previousSibling.getAttribute('value');
    
   // let itemforservicex = get_selected_row.previousSibling.children[0].value;

    

    if(this.state.items_info.includes(itemid) == false){
    event.target.parentElement.parentElement.classList.add('bg-success','text-white');
    event.target.textContent = 'Deselect';
       let get_item_data = [...this.state.items_info];

        get_item_data.push(itemid);


        //let itemforservices = [...this.state.itemforservice];

        //itemforservices.push(itemforservicex);

        let getItemNames = [...this.state.item_names];

        getItemNames.push(name);

        let getItemPrices = [...this.state.item_prices];

        getItemPrices.push(price);
        


        this.setState({item_prices:getItemPrices,item_names:getItemNames,tax_cost:Number(this.state.tax_cost)+Number(price*0.01*tax),items_info:get_item_data,total_cost:Number(this.state.total_cost)+Number(price)+Number(price*0.01*tax)});


    }else if(event.target.textContent == 'Deselect'){

        event.target.parentElement.parentElement.classList.remove('bg-success','text-white');
        event.target.textContent = 'Select';

        let get_items_data = [...this.state.items_info];

        let findoutindexno = get_items_data.indexOf(itemid);

       
        let filteredarr = get_items_data.filter(el=> el != itemid);

        let getItemnames = [...this.state.item_names];

        getItemnames.splice(findoutindexno,1);
        
        //let itemforser = [...this.state.itemforservice];

        //itemforser.splice(findoutindexno,1);

        let getItemPrices = [...this.state.item_prices];

        getItemPrices.splice(findoutindexno,1);

        this.setState({item_prices:getItemPrices,item_names:getItemnames,tax_cost:Number(this.state.tax_cost)-Number(price*0.01*tax),items_info:filteredarr,total_cost:Number(this.state.total_cost) - (Number(price)+Number(price*0.01*tax))});






    }



        //end fo setting items

    }



    


}


order(event){

 event.preventDefault();
 if (this.state.staffid==null || this.state.branchid==null || this.state.service_data==null  || this.state.time == null){
    alert('All fields are required !');
    return false
 }
 this.setState({processing:true});



axios.post(this.context.baseUrl+'/items/place_order/',
    {
        email:document.getElementById('useremail').value,
        branchid:Number(this.state.branchid),
        staffid:JSON.stringify(this.state.staffid),
        services:JSON.stringify(this.state.service_data),
        date:document.getElementById('bookdate').value,
        time:this.state.time,
        items:JSON.stringify(this.state.items_info),
        payment_type:this.state.payment_type,
        partial_amount:Number(this.state.partial_amount)
        //itemforservice:JSON.stringify(this.state.itemforservice)


    


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
     
        

        
      
      
    
      this.setState({processing:false,alert:true,errorMessage:'Order has been placed ! ',branchid:null,staffid:null,services:null,items_info:null,date:null,time:null,items:null});
      window.location.href='/dashboard/order_list/';

      console.log(response.data);

      

      
    

    }).catch((error)=>{
      
      this.setState({processing:false,alert:true,errorMessage:'Can not place order !'})
    })




}




closingmodal(){
    this.setState({editingmode:false})
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
    <label>User Email<span className="text-danger">*</span></label>

    {window.location.pathname=='/dashboard/book_appointment/'?
    <input id="useremail" type="email" className="form-control" placeholder="customeremail@gmail.com"   onChange={(event)=>this.setInfo(event,'email')}  required/>
    :



    <input type="email" id="useremail" className="form-control" value={this.state.useremail}   onChange={(event)=>this.setInfo(event,'email')}  required/>}


    <span className="form-text text-muted"></span>
   </div>
   </div>
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
    <label>Select Services and staffs<span className="text-danger">*</span></label>
    
    {this.state.available_services == null?
    <h3>No branch is Selected</h3>
    :null}
    {this.state.available_services != null?
    <table className="table table-bordered table-checkable" id="kt_datatable">
    <thead>
         <tr>
            <th>Service Name</th>
            <th>Provider</th>
            <th>Cost</th>
            <th>Select/Deselect</th>
            
                                                    
            </tr>
    </thead>

    <tbody>

    {this.state.available_services.map((data,index)=>{

        return (<tr>

                <td value={data.id}>{data.name}</td>
                <td value={data.staffid}>{data.staffname}</td>
                <td tax={data.taxes} value={data.cost}>{data.cost}</td>
                <td className="text-center"><a className="btn btn-primary text-center" 
                onClick={(event)=>this.setInfo(event,'services')}>Select</a></td>

                </tr>


            )
    })}</tbody></table>:null}
    
    <span className="form-text text-muted"></span>
   </div>
   </div>


   

<div className="col-md-12">
   <div className="form-group">
    <label>Select Items<span className="text-danger">*</span></label>
    
    {this.state.items == null?
    <h3>No Item is Selected</h3>
    :null}
    {this.state.items != null?
    <table className="table table-bordered table-checkable" id="kt_datatable">
    <thead>
         <tr>
            <th>Item Name</th>
            <th>Price</th>
           
            <th className="text-center">Select/Deselect</th>
            
                                                    
            </tr>
    </thead>

    <tbody>

    {this.state.items.map((data,index)=>{

        return (<tr>

                <td value={data.id}>{data.name}</td>
                <td tax={data.taxes} value={data.price}>{data.price}</td>
               
                <td className="text-center"><a className="btn btn-primary text-center" 
                onClick={(event)=>this.setInfo(event,'items')}>Select</a></td>

                </tr>


            )
    })}</tbody></table>:null}
    
    <span className="form-text text-muted"></span>
   </div>
   </div>





<div className="col-md-12">
   <div className="form-group">
    <label>Date<span className="text-danger">*</span></label>
    <input type="date" className="form-control" id="bookdate" value={this.props.date}  onChange={(event)=>this.setInfo(event,'date')} />
    <span className="form-text text-muted"></span>
   </div>
   </div>

   <div className="col-md-12">
   <div className="form-group">
    <label>Time<span className="text-danger">*</span></label>
    <input type="time" className="form-control"  placeholder="1" onChange={(event)=>this.setInfo(event,'time')} />
    <span className="form-text text-muted"></span>
   </div>
   </div>

   </div>:null}

   


    


{this.state.showExpress == true?
    <div className="col-md-12">
   <form className="form form-inline">
    <div className="form-group mr-4">
    
    <input name="payment" id="voucher" onClick={()=>this.setState({editingmode:true,payment_type:'voucher'})} className="form-control ml-2" value="voucher" type="radio"/>
    <label className="ml-2" for="voucher">VOUCHER</label>
    </div>
    
    
   
   
    <div className="form-group mr-4">
    
    <input id="cash" name="payment" onClick={()=>this.setState({editingmode:true,payment_type:'cash'})} className="form-control ml-2" value="paid" type="radio"/>
    <label className="ml-2" for="cash">CASH </label>
    </div>
    
    
   

   
    <div className="form-group">
    
    <input name="payment" id="partial" onClick={()=>this.setState({payment_type:'partial'})} className="form-control ml-2" value="partial" type="radio"/>
    
    <label className="ml-2" for="partial">PARTIAL CASH PAYMENT </label>
    </div>
    
    
   </form>
   {this.state.payment_type == 'partial'?

    <form className="form form-inline">
    <div className="form-group">
    <input type="number" className="form-control" onChange={(event)=>this.setState({partial_amount:event.target.value})} placeholder="Partial paid amount" />

    </div>
    <div className="form-group">
    <button type="button" className="btn btn-success" onClick={()=>this.setState({editingmode:true})}>Continue</button>
    </div>

    </form>

    :null}
   </div>:null}






   
  </div>
  <div className="card-footer">
  {this.state.processing == true ?
   <button type="submit" className="btn btn-primary mr-2">proccesing data ! Please wait...</button>
   : <button type="submit" className="btn btn-primary mr-2">Save Order</button>}

{this.state.showExpress == false?
   <a onClick={()=>this.setState({showExpress:true})} className="btn btn-danger">Express Checkout </a>:null}



   
  </div>
 </form>
 {/*end::Form*/}

 <Invoice processing={this.state.processing} order={(event)=>this.order(event)} total_cost={this.state.total_cost} tax_cost={this.state.tax_cost} item_names={this.state.item_names} item_prices={this.state.item_prices} provider_names={this.state.provider_names} service_costs={this.state.service_costs} service_names={this.state.service_names} editingmode={this.state.editingmode} closingmodal={this.closingmodal.bind(this)}/>
</div>
</div>









		)
}



}


export default StaffOrder