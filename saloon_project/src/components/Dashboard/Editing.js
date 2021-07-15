import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import Modal from 'react-modal';


class Editing extends Component{

static contextType = baseContext


    state = {
        service_data:null,
        processing:false,
        alert:false,
        staff_data:null,
        errorMessage:false,
        first_name:null,
        last_name:null,
        email:null,
        password:null,
        username:null,
        role:'employee',
        is_admin:false,
        is_staff:false,
        is_manager:false,

        dob:null,
        services:[],
        
        time_from:null,
        time_to:null,
        mobile:null,
        color:null,
        address:null,
        branch:0,

        workdays:[],

        user_info:null,
       


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
axios.post(this.context.baseUrl+'/staff/get_user_info/',
    { 
        userid:Number(this.props.updateid)


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      
      this.setState({user_info:response.data,processing:false,parsed:true,errorMessage:false,alert:false})
      
      }
      
    
    

    ).catch((error)=>{
      console.log(error.response);
      this.setState({processing:false,alert:true,errorMessage:'Can not load data !'})
    })
            
    }
    
}



componentDidMount(){
    

this.setState({processing:true});
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




}




setInfo(event,name){
    let copy = {...this.state.user_info};
    if(name == 'first_name'){
        copy['first_name'] = event.target.value;
        this.setState({user_info:copy,first_name:event.target.value})
    }

    if(name == 'last_name'){
        copy['last_name'] = event.target.value;
        this.setState({user_info:copy,last_name:event.target.value})
    }

    if(name == 'email'){
        this.setState({email:event.target.value})
    }

    if(name == 'password'){
        this.setState({password:event.target.value})
    }
    if(name == 'username'){
        copy['username'] = event.target.value;
        this.setState({user_info:copy,username:event.target.value})
    }

    if(name == 'role'){
        if(event.target.value == 'admin'){
            this.setState({is_admin:true,is_staff:false,is_manager:false})
        }
        else if(event.target.value=='manager'){
            this.setState({is_manager:true,is_admin:false,is_staff:false})
        }

        else if(event.target.value=='employee'){
            this.setState({is_staff:true,is_manager:false,is_admin:false})
        }


    }


    if(name=='dob'){
        copy['dob'] = event.target.value;
        this.setState({user_info:copy,dob:event.target.value})
    }


    if(name=='services'){

        this.setState({services:[]});
        let opt =[];
        let selectElement = document.getElementById('SelectServices');
        Array.from(selectElement.selectedOptions).map(option => opt.push(option.value));

        this.setState({services:opt});


    }




    if(name=='workdays'){

        this.setState({workdays:[]});
        let opt =[];
        let selectElement = document.getElementById('workdays');
        Array.from(selectElement.selectedOptions).map(option => opt.push(option.value));

        this.setState({workdays:opt});


    }


    



    if(name=='time_from'){
        copy['time_from'] = event.target.value;
        this.setState({user_info:copy,time_from:event.target.value})
    }


    if(name == 'time_to'){
        copy['time_to'] = event.target.value;
        this.setState({user_info:copy,time_to:event.target.value})
    }


    if(name=='mobile'){
        copy['mobile'] = event.target.value;
        this.setState({user_info:copy,mobile:event.target.value})
    }


    if(name=='address'){
        copy['address'] = event.target.value;
        this.setState({user_info:copy,address:event.target.value})
    }


    if(name=='color'){
        this.setState({color:event.target.value})
    }


    if(name=='branch'){
        this.setState({branch:event.target.value})
    }


}


editStaff(event){

 event.preventDefault();
 this.setState({processing:true,email:this.state.user_info.email});

console.log(this.state.user_info.email,this.state.last_name);

axios.post(this.context.baseUrl+'/staff/update_user_info/',
    {
    first_name:this.state.first_name,
    last_name:this.state.last_name,
    password:this.state.password,
    email:this.state.user_info.email,
    
    username:this.state.username,
    is_admin:this.state.is_admin,
    is_manager:this.state.is_manager,
    is_staff:this.state.is_staff,
    dob:this.state.dob,
    service:JSON.stringify(this.state.services),
    workday:JSON.stringify(this.state.workdays),
    
    time_from:this.state.time_from,
    time_to:this.state.time_to,
    mobile:this.state.mobile,
    address:this.state.address,
    color:this.state.color,
    branchid:Number(this.state.branch)
    
    
    
    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
     
        
        

        
      
      
    
      this.setState({
        processing:false,
        alert:true,
        errorMessage:'Staff has been added ! ',

    first_name:null,
    last_name:null,

    email:null,
    password:null,
    
    username:null,
    is_admin:false,
    is_manager:false,
    is_staff:false,
    dob:null,
    services:[],
    workdays:[],
    
    time_from:null,
    time_to:null,
    mobile:null,
    address:null,
    color:null,
    branch:0



    });
      
    

    }).catch((error)=>{
      
      this.setState({processing:false,alert:true,errorMessage:'Can not create staff ! Try agian later'})
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
   Edit a staff
  </h3>
  <div className="card-toolbar">
   <button className="btn btn-danger text-white" onClick={this.props.closemodal}>Close</button>
  </div>
 </div>
 {/*begin::Form*/}
 <form onSubmit={this.editStaff.bind(this)}>
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
   {this.state.user_info != null?
   <div className="row">
   <div className="col-md-6">
     <div className="form-group">
    <label>First name <span className="text-danger">*</span></label>
    <input type="text" className="form-control" value={this.state.user_info.first_name}  placeholder="John" onChange={(event)=>this.setInfo(event,'first_name')} required />
    <span className="form-text text-muted"></span>
   </div>
   </div>
   <div className="col-md-6">
   <div className="form-group">
    <label>Last Name <span className="text-danger">*</span></label>
    <input type="text" className="form-control" value={this.state.user_info.last_name}  placeholder="Doe" onChange={(event)=>this.setInfo(event,'last_name')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>
   </div>:null}
   {this.state.user_info != null?
   <div className="row">
   <div className="col-md-6">
     <div className="form-group">
    <label>Username <span className="text-danger">*</span></label>
    <input type="text" className="form-control" value={this.state.user_info.username}  placeholder="User122" onChange={(event)=>this.setInfo(event,'username')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>
   <div className="col-md-6">
   <div className="form-group">
    <label>Email address <span className="text-danger">*</span></label>
    <input type="email" className="form-control" value={this.state.user_info.email} placeholder="Enter email" onChange={(event)=>this.setInfo(event,'email')} required disabled/>
    <span className="form-text text-muted">We'll never share your email with anyone else.</span>
   </div>
   </div>

   </div>:null}
   {this.state.user_info != null?
   <div className="row">
   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputPassword1">Password <span className="text-danger">*</span></label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event)=>this.setInfo(event,'password')} />
   </div>
   </div>

   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleSelectRole">Role<span className="text-danger">*</span></label>
    
     {this.state.user_info.role == 'employee' ?
     <select name="role" className="form-control" id="exampleSelectRole" onChange={(event)=>this.setInfo(event,'role')}>
     <option selected value="employee">Employee</option>
     <option value="admin">Admin</option>
     <option value="manager">Manager</option></select>:this.state.user_info.role == 'admin'?
     <select name="role" className="form-control" id="exampleSelectRole" onChange={(event)=>this.setInfo(event,'role')}>
     <option  value="employee">Employee</option>
     <option selected value="admin">Admin</option>
     <option value="manager">Manager</option></select>:this.state.user_info.role=='manager'?
     <select name="role" className="form-control" id="exampleSelectRole" onChange={(event)=>this.setInfo(event,'role')}>
     <option  value="employee">Employee</option>
     <option  value="admin">Admin</option>
     <option selected value="manager">Manager</option>




     
    </select>:null}
   </div>
   </div>
   </div>:null}
   {this.state.user_info != null ?
   <div className="row">
   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputDate">Date of birth <span className="text-danger">*</span></label>
    <input type="date" className="form-control" value={this.state.user_info.dob} id="exampleInputDate"  onChange={(event)=>this.setInfo(event,'dob')} />
   </div>
   </div>

   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleSelectServices">Services<span className="text-danger">*</span></label>
    <select name="role" multiple className="form-control" id="SelectServices" onChange={(event)=>this.setInfo(event,'services')}>
     
     {this.state.service_data != null?

    this.state.service_data.map((data,index)=>{
        return(

            this.state.user_info.services.includes(data.id)==true ?
            <option key={index} selected value={data.id}>{data.name}</option>:
            <option key={index} value={data.id}>{data.name}</option>

        


            )
    }):null

     
     
     }
    </select>
   </div>
   </div>
   </div>:null}

{this.state.user_info != null?
   <div className="row justify-content-center">
   <div className="col-md-6">
      <div className="form-group">
    <label for="exampleSelectFrom">Work days<span className="text-danger">*</span></label>
    <select name="workdays" multiple className="form-control" id="workdays" onChange={(event)=>this.setInfo(event,'workdays')}>
     {this.state.user_info.workdays.includes('Sat') == true ?
     <option key="Sat" selected value="Sat">Saturday</option>
     :<option key="Sat" value="Sat">Saturday</option>}

     {this.state.user_info.workdays.includes('Sun') == true ?
     <option key="Sun" selected value="Sun">Sunday</option>
     :<option key="Sun" value="Sun">Sunday</option>}

     {this.state.user_info.workdays.includes('Mon')==true?
     <option key="Mon" selected value="Mon">Monday</option>
     :<option key="Mon" value="Mon">Monday</option>}
     {this.state.user_info.workdays.includes('Tue')==true?
     <option key="Tue" selected value="Tue">Tuesday</option>
     :<option key="Tue" value="Tue">Tuesday</option>}

     {this.state.user_info.workdays.includes('Wed')==true?
     <option key="Wed" selected value="Wed">Wednesday</option>
     :<option key="Wed" value="Wed">Wednesday</option>}

     {this.state.user_info.workdays.includes('Thu')==true?
     <option key="Thu" selected value="Thu">Thursday</option>
     :<option key="Thu" value="Thu">Thursday</option>}
     {this.state.user_info.workdays.includes('Fri')==true?
     <option key="Fri" selected value="Fri">Friday</option>
     :<option key="Fri" value="Fri">Friday</option>}
     
    </select>
   </div>
   </div>

   

   <div className="col-md-3">
   <div className="form-group">
    <label for="exampleTimeFrom">Time (From)<span className="text-danger">*</span></label>
    <input type="time" id="timeFrom" value={this.state.user_info.time_from} className="form-control" onChange={(event)=>this.setInfo(event,'time_from')}/>
   </div>
   </div>
   <div className="col-md-3">
   <div className="form-group">
    <label for="exampleSelect1">Time (To)<span className="text-danger">*</span></label>
    <input type="time" id="timeTo" value={this.state.user_info.time_to} className="form-control" onChange={(event)=>this.setInfo(event,'time_to')}/>
   </div>
   </div>
   </div>:null}

{this.state.user_info !== null?
     <div className="row">
   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputDate">Mobile no <span className="text-danger">*</span></label>
    <input type="text" value={this.state.user_info.mobile} placeholder="+913xxxxxxxxx" className="form-control" id="exampleInputmobile"  onChange={(event)=>this.setInfo(event,'mobile')} />
   </div>
   </div>


   <div className="col-md-6">
      <div className="form-group">
    <label for="exampleSelectColour">Color<span className="text-danger">*</span></label>
    <select name="color" className="form-control" id="exampleSelectcolor" onChange={(event)=>this.setInfo(event,'color')}>
     
     {this.state.user_info.color == 'red'?
     <option selected value="red">Red</option>
     :<option value="red">Red</option>}

     {this.state.user_info.color == 'blue'?
     <option selected value="blue">Blue</option>
     :<option value="blue">Blue</option>}

     {this.state.user_info.color == 'green'?
     <option selected value="green">Green</option>
     :<option value="green">Green</option>}

     {this.state.user_info.color == 'yellow'?
     <option selected value="yellow">Yellow</option>
     :<option value="yellow">Yellow</option>}
     {this.state.user_info.color == 'orange'?

     <option selected value="orange">Orange</option>
     :<option value="orange">Orange</option>}
     {this.state.user_info.color == 'pink'?
     <option selected value="pink">Pink</option>
     :<option value="pink">Pink</option>}

     {this.state.user_info.color == 'purple'?
     <option selected value="purple">Purple</option>
     :<option value="purple">Purple</option>}

     {this.state.user_info.color == 'skyblue'?
     <option selected value="skyblue">Sky blue</option>
     :<option value="skyblue">Sky blue</option>}
    
     
    </select>
   </div>
   </div>

   
   </div>

:null}

{this.state.user_info != null?
   <div className="row">
   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputDate">Address <span className="text-danger">*</span></label>
    <textarea className="form-control" value={this.state.user_info.address} id="exampleInputAddress"  onChange={(event)=>this.setInfo(event,'address')} />
   </div>
   </div>


   <div className="col-md-6">
      <div className="form-group">
    <label for="exampleSelectBranch">Branch<span className="text-danger">*</span></label>
    <select name="branch" className="form-control" id="exampleSelectBranch" onChange={(event)=>this.setInfo(event,'branch')}>
    <option>Select branch</option>
     
     {this.state.staff_data != null?
    this.state.staff_data.branch.map((data,index)=>{
        return(
        this.state.user_info.branchid == data.id?
        <option selected value={data.id}>{data.name}</option>
        :<option value={data.id}>{data.name}</option>


        )
    }):null
     
    }
    }
 }
     
    
     
    </select>
   </div>
   </div>

   
   </div>:null}


   
  </div>
  <div className="card-footer">
  {this.state.processing == true ?
   <button type="submit" className="btn btn-primary mr-2">proccesing data ! Please wait...</button>
   : <button type="submit" className="btn btn-primary mr-2">Update Staff</button>}



   
  </div>
 </form>
 {/*end::Form*/}
</div>
</Modal>










        )
}



}


export default Editing