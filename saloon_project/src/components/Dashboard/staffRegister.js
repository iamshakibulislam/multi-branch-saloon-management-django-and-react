import React,{Component,Fragment} from 'react'
import axios from 'axios'
import baseContext from '../shared/baseContext'
class StaffRegister extends Component{

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
        is_staff:true,
        is_manager:false,

        dob:null,
        services:[],
        workdays_from:'Sat',
        workdays_to:'Sat',
        time_from:null,
        time_to:null,
        mobile:null,
        color:'red',
        address:null,
        branch:null,
       


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

    if(name == 'first_name'){
        this.setState({first_name:event.target.value})
    }

    if(name == 'last_name'){
        this.setState({last_name:event.target.value})
    }

    if(name == 'email'){
        this.setState({email:event.target.value})
    }

    if(name == 'password'){
        this.setState({password:event.target.value})
    }
    if(name == 'username'){
        this.setState({username:event.target.value})
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
        this.setState({dob:event.target.value})
    }


    if(name=='services'){

        this.setState({services:[]});
        let opt =[];
        let selectElement = document.getElementById('SelectServices');
        Array.from(selectElement.selectedOptions).map(option => opt.push(option.value));

        this.setState({services:opt});


    }


    if(name=='workdays_from'){

        this.setState({workdays_from:event.target.value})
    }


    if(name=='workdays_to'){
        this.setState({workdays_to:event.target.value})
    }

    if(name=='time_from'){

        this.setState({time_from:event.target.value})
    }


    if(name == 'time_to'){
        this.setState({time_to:event.target.value})
    }


    if(name=='mobile'){

        this.setState({mobile:event.target.value})
    }


    if(name=='address'){
        this.setState({address:event.target.value})
    }


    if(name=='color'){
        this.setState({color:event.target.value})
    }


    if(name=='branch'){
        this.setState({branch:event.target.value})
    }


}


addStaff(event){

 event.preventDefault();
 this.setState({processing:true});



axios.post(this.context.baseUrl+'/api/authentication/register',
    {first_name:this.state.first_name,
    last_name:this.state.last_name,
    email:this.state.email,
    password:this.state.password,
    password2:this.state.password,
    username:this.state.username,
    is_admin:this.state.is_admin,
    is_manager:this.state.is_manager,
    is_staff:this.state.is_staff,
    dob:this.state.dob,
    services:JSON.stringify(this.state.services),
    workdays_from:this.state.workdays_from,
    workdays_to:this.state.workdays_to,
    time_from:this.state.time_from,
    time_to:this.state.time_to,
    mobile:this.state.mobile,
    address:this.state.address,
    color:this.state.color,
    branch:Number(this.state.branch),
    is_superuser:false


    


    }).then((response)=>{
      console.log(response.data);
      if(response.data.email[0]=='user with this email already exists.'){
        
        this.setState({alert:true,errorMessage:'Email is already in used !',processing:false});

        return false
      }
      
    
      this.setState({processing:false,alert:true,errorMessage:'Staff has been added ! '});
      event.target.reset()
    

    }).catch((error)=>{
      
      this.setState({processing:false,alert:true,errorMessage:'Can not create staff ! Try agian later'})
    })




}



render(){
	return(

<div>

<div className="card card-custom">
 <div className="card-header">
  <h3 className="card-title">
   Add a staff
  </h3>
  <div className="card-toolbar">
   
  </div>
 </div>
 {/*begin::Form*/}
 <form onSubmit={this.addStaff.bind(this)}>
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
   <div className="row">
   <div className="col-md-6">
     <div className="form-group">
    <label>First name <span className="text-danger">*</span></label>
    <input type="text" className="form-control"  placeholder="John" onChange={(event)=>this.setInfo(event,'first_name')} required />
    <span className="form-text text-muted"></span>
   </div>
   </div>
   <div className="col-md-6">
   <div className="form-group">
    <label>Last Name <span className="text-danger">*</span></label>
    <input type="text" className="form-control"  placeholder="Doe" onChange={(event)=>this.setInfo(event,'last_name')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>
   </div>

   <div className="row">
   <div className="col-md-6">
     <div className="form-group">
    <label>Username <span className="text-danger">*</span></label>
    <input type="text" className="form-control"  placeholder="User122" onChange={(event)=>this.setInfo(event,'username')} required/>
    <span className="form-text text-muted"></span>
   </div>
   </div>
   <div className="col-md-6">
   <div className="form-group">
    <label>Email address <span className="text-danger">*</span></label>
    <input type="email" className="form-control"  placeholder="Enter email" onChange={(event)=>this.setInfo(event,'email')} required/>
    <span className="form-text text-muted">We'll never share your email with anyone else.</span>
   </div>
   </div>

   </div>
   <div className="row">
   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputPassword1">Password <span className="text-danger">*</span></label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event)=>this.setInfo(event,'password')} required/>
   </div>
   </div>

   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleSelectRole">Role<span className="text-danger">*</span></label>
    <select name="role" className="form-control" id="exampleSelectRole" onChange={(event)=>this.setInfo(event,'role')}>
     
     <option value="employee">Employee</option>
     <option value="admin">Admin</option>
     <option value="manager">Manager</option>
     
    </select>
   </div>
   </div>
   </div>

   <div className="row">
   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputDate">Date of birth <span className="text-danger">*</span></label>
    <input type="date" className="form-control" id="exampleInputDate"  onChange={(event)=>this.setInfo(event,'dob')} required/>
   </div>
   </div>

   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleSelectServices">Services<span className="text-danger">*</span></label>
    <select name="role" multiple className="form-control" id="SelectServices" onChange={(event)=>this.setInfo(event,'services')}>
     
     {this.state.service_data != null?

    this.state.service_data.map((data,index)=>{
        return(


            <option value={data.id}>{data.name}</option>


            )
    }):null

     
     
     }
    </select>
   </div>
   </div>
   </div>


   <div className="row">
   <div className="col-md-3">
      <div className="form-group">
    <label for="exampleSelectFrom">Work days(From)<span className="text-danger">*</span></label>
    <select name="workday" className="form-control" id="exampleSelectworkday" onChange={(event)=>this.setInfo(event,'workdays_from')}>
     
     <option value="Sat">Saturday</option>
     <option value="Sun">Sunday</option>
     <option value="Mon">Monday</option>
     <option value="Tue">Tuesday</option>
     <option value="Wed">Wednesday</option>
     <option value="Thu">Thursday</option>
     <option value="Fri">Friday</option>
     
    </select>
   </div>
   </div>

   <div className="col-md-3">
      <div className="form-group">
    <label for="exampleSelectWorkdayto">Work days(To)<span className="text-danger">*</span></label>
    <select name="role" className="form-control" id="exampleSelectWorkdayto" onChange={(event)=>this.setInfo(event,'workdays_to')}>
     
     <option value="Sat">Saturday</option>
     <option value="Sun">Sunday</option>
     <option value="Mon">Monday</option>
     <option value="Tue">Tuesday</option>
     <option value="Wed">Wednesday</option>
     <option value="Thu">Thursday</option>
     <option value="Fri">Friday</option>
     
    </select>
   </div>
   </div>

   <div className="col-md-3">
   <div className="form-group">
    <label for="exampleTimeFrom">Time (From)<span className="text-danger">*</span></label>
    <input type="time" id="timeFrom" className="form-control" onChange={(event)=>this.setInfo(event,'time_from')}/>
   </div>
   </div>
   <div className="col-md-3">
   <div className="form-group">
    <label for="exampleSelect1">Time (To)<span className="text-danger">*</span></label>
    <input type="time" id="timeTo" className="form-control" onChange={(event)=>this.setInfo(event,'time_to')}/>
   </div>
   </div>
   </div>


     <div className="row">
   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputDate">Mobile no <span className="text-danger">*</span></label>
    <input type="text" placeholder="+913xxxxxxxxx" className="form-control" id="exampleInputmobile"  onChange={(event)=>this.setInfo(event,'mobile')} required/>
   </div>
   </div>


   <div className="col-md-6">
      <div className="form-group">
    <label for="exampleSelectColour">Color<span className="text-danger">*</span></label>
    <select name="color" className="form-control" id="exampleSelectcolor" onChange={(event)=>this.setInfo(event,'color')}>
     
     <option value="red">Red</option>
     <option value="blue">Blue</option>
     <option value="green">Green</option>
     <option value="yellow">Yellow</option>
     <option value="orange">Orange</option>
     <option value="pink">Pink</option>
     <option value="purple">Purple</option>
     <option value="skyblue">Sky blue</option>
    
     
    </select>
   </div>
   </div>

   
   </div>




   <div className="row">
   <div className="col-md-6">
   <div className="form-group">
    <label for="exampleInputDate">Address <span className="text-danger">*</span></label>
    <textarea className="form-control" id="exampleInputAddress"  onChange={(event)=>this.setInfo(event,'address')} required/>
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
        <option value={data.id}>{data.name}</option>
        )
    }):null
     
    }
    }
 }
     
    
     
    </select>
   </div>
   </div>

   
   </div>


   
  </div>
  <div className="card-footer">
  {this.state.processing == true ?
   <button type="submit" className="btn btn-primary mr-2">proccesing data ! Please wait...</button>
   : <button type="submit" className="btn btn-primary mr-2">Add Staff</button>}



   
  </div>
 </form>
 {/*end::Form*/}
</div>
</div>









		)
}



}


export default StaffRegister