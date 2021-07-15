import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'


class order extends Component{

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
        tax_cost:0
       


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


    if(name == 'staff'){

    this.setState({staffid:event.target.value})

    }

    if(name == 'time'){
        this.setState({time:event.target.value})
    }




    if(name=='services'){

        //this.setState({service_data:[]});
        
    let get_selected_row = event.target.parentElement;

    let cost = get_selected_row.previousSibling.getAttribute('value');
    let tax = get_selected_row.previousSibling.getAttribute('tax');
    let staffid = get_selected_row.previousSibling.previousSibling.getAttribute('value');
    let serviceid = get_selected_row.previousSibling.previousSibling.previousSibling.getAttribute('value');

    let servicename = get_selected_row.previousSibling.previousSibling.previousSibling.textContent;


    

    if(this.state.service_data.includes(serviceid) == false){
    event.target.parentElement.parentElement.classList.add('bg-success','text-white');
    event.target.textContent = 'Deselect';
       let get_serv_data = [...this.state.service_data];

        get_serv_data.push(serviceid);

        let get_staffs = [...this.state.staffid];

        get_staffs.push(staffid);



        let servname = [...this.state.service_names];

        servname.push(servicename)



        this.setState({tax_cost:Number(this.state.tax_cost)+Number(cost*tax*0.01),service_names:servname,service_data:get_serv_data,total_cost:Number(this.state.total_cost)+Number(cost)+Number(cost*0.01*tax),staffid:get_staffs});


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

        this.setState({tax_cost:Number(this.state.tax_cost)-Number(cost*0.01*tax),service_names:get_service_names,service_data:filteredarr,staffid:get_staff_data,total_cost:Number(this.state.total_cost) - (Number(cost)+Number(cost*0.01*tax))});






    }




    
        

        




        //end of requesting for staffs


    }






    if(name=='items'){

        //items setting starting here

    let get_selected_row = event.target.parentElement;

    let price = get_selected_row.previousSibling.previousSibling.getAttribute('value');
    let tax = get_selected_row.previousSibling.previousSibling.getAttribute('tax');

    let itemid = get_selected_row.previousSibling.previousSibling.previousSibling.getAttribute('value');
    
    let itemforservicex = get_selected_row.previousSibling.children[0].value;

    

    if(this.state.items_info.includes(itemid) == false){
    event.target.parentElement.parentElement.classList.add('bg-success','text-white');
    event.target.textContent = 'Deselect';
       let get_item_data = [...this.state.items_info];

        get_item_data.push(itemid);


        let itemforservices = [...this.state.itemforservice];

        itemforservices.push(itemforservicex);

        


        this.setState({tax_cost:Number(this.state.tax_cost)+Number(price*0.01*tax),itemforservice:itemforservices,items_info:get_item_data,total_cost:Number(this.state.total_cost)+Number(price)+Number(price*0.01*tax)});


    }else if(event.target.textContent == 'Deselect'){

        event.target.parentElement.parentElement.classList.remove('bg-success','text-white');
        event.target.textContent = 'Select';

        let get_items_data = [...this.state.items_info];

        let findoutindexno = get_items_data.indexOf(itemid);

       
        let filteredarr = get_items_data.filter(el=> el != itemid);

        
        let itemforser = [...this.state.itemforservice];

        itemforser.splice(findoutindexno,1);

        this.setState({tax_cost:Number(this.state.tax_cost)-Number(price*0.01*tax),itemforservice:itemforser,items_info:filteredarr,total_cost:Number(this.state.total_cost) - (Number(price)+Number(price*0.01*tax))});






    }



        //end fo setting items
        
        


    
    }



    


}


order(event){

 event.preventDefault();
 if (this.state.staffid==null || this.state.branchid==null || this.state.service_data==null || this.state.date == null || this.state.time == null){
    alert('All fields are required !');
    return false
 }
 this.setState({processing:true});



axios.post(this.context.baseUrl+'/items/place_order/',
    {

        branchid:Number(this.state.branchid),
        staffid:JSON.stringify(this.state.staffid),
        services:JSON.stringify(this.state.service_data),
        date:this.state.date,
        time:this.state.time,
        items:JSON.stringify(this.state.items_info),
        itemforservice:JSON.stringify(this.state.itemforservice)


    


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
     
        

        
      
      
    
      this.setState({processing:false,alert:true,errorMessage:'Order has been placed ! '});
      event.target.reset()
    

    }).catch((error)=>{
      
      this.setState({processing:false,alert:true,errorMessage:'Can not place order !'})
    })




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
            <th>For service</th>
            <th className="text-center">Select/Deselect</th>
            
                                                    
            </tr>
    </thead>

    <tbody>

    {this.state.items.map((data,index)=>{

        return (<tr>

                <td value={data.id}>{data.name}</td>
                <td tax={data.taxes} value={data.price}>{data.price}</td>
                <td>
                <select className="form-control">
                {this.state.service_data.length !=0?
                this.state.service_data.map((data,index)=>{
                    return(

                        <option value={data}>{this.state.service_names[index]}</option>

                        )
                })
                
                :null}
                </select></td>
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
    <input type="date" className="form-control"   onChange={(event)=>this.setInfo(event,'date')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>

   <div className="col-md-12">
   <div className="form-group">
    <label>Time<span className="text-danger">*</span></label>
    <input type="time" className="form-control"  placeholder="1" onChange={(event)=>this.setInfo(event,'time')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>


   <div className="col-md-12">
   <div className="form-group">
    <h4 style={{height:'4rem'}}>Total Cost : {this.state.total_cost.toFixed(2)} $</h4><br/>
    <h4 style={{height:'4rem'}}>Total Tax(included) : {this.state.tax_cost.toFixed(2)} $</h4>


    
    
   </div>
   </div>

   </div>:null}

   









   
  </div>
  <div className="card-footer">
  {this.state.processing == true ?
   <button type="submit" className="btn btn-primary mr-2">proccesing data ! Please wait...</button>
   : <button type="submit" className="btn btn-primary mr-2">Place order</button>}



   
  </div>
 </form>
 {/*end::Form*/}
</div>
</div>









		)
}



}


export default order