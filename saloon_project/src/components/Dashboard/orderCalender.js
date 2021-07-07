import React,{Component,Fragment} from 'react';
import axios from 'axios'
import baseContext from '../shared/baseContext'
import CalenderOrders from './CalenderOrders'
import Modal from 'react-modal'
class orderCalender extends Component{

state = {
  
  is_modal_open:false,
  date:null,
  date_info:null,
  editingmode:false,
  weekly_selected_date:null

}

static contextType = baseContext

componentDidMount(){


 let el= document.createElement('script');
  el.src=this.context.reactBase+'/js/calender.js';
  document.getElementById('root').appendChild(el);
  
  //geting all the orders for this staff



  //end of geting all the orders for this staff

  
  let check = setInterval(()=>{

    let sel = document.getElementsByClassName('fc-day-top')[0];

    if (sel == undefined ){
      console.log('loading calender')
    }
    else{
      
      clearInterval(check);



      //send the request to server to get the dates


  axios.post(this.context.baseUrl+'/items/get_upcomming_appointment/',
    { 
      


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({date_info:response.data});

      for(let i=0;i<response.data.length;i++){

        let dt = "[data-date="+"'"+response.data[i]+"'"+"].fc-day-top";

        let evnt = document.querySelector(dt);

        
      var childno = 0;
      while( (evnt = evnt.previousSibling) != null ) {
        childno++;
      }

      evnt = document.querySelector(dt);

      document.querySelector(dt).parentElement.parentElement.parentElement.children[1].children[0].children[childno].setAttribute('class','bg-success text-white');

      evnt.parentElement.parentElement.parentElement.children[1].children[0].children[childno].textContent='New order';
       //const rm = document.querySelectorAll('.fc-button-group');
       // rm.forEach(ele => ele.remove())

      

      }



      
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
    })






      //end of sending request

      const divs = document.querySelectorAll('.fc-day-top');

      divs.forEach(el =>{ el.addEventListener('click', event => {
        //click event handling starts here
        
        this.setState({date:event.target.getAttribute('data-date'),editingmode:true});
       

       




        

        //click event handling ends here
      });el.innerHTML=el.firstElementChild.innerHTML;
      });





    //add weekly click events and handling to topbar


    let weeklyselbtn = document.querySelectorAll('.fc-timeGridWeek-button');

    weeklyselbtn.forEach(el => {el.addEventListener('click',event => {



     let get_date_range=document.querySelector('.fc-header-toolbar > .fc-center').textContent;

    // this.setState({weekly_selected_date:get_date_range});


    //sending request to server for date range 


    
  axios.post(this.context.baseUrl+'/items/order_details/',
    { 
      


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({orderdetails:response.data})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
    })



    //end of sending request to server for date range








    })})
    

    //end of adding weekly click events



      
      
    }








  },100) ;





  
}


closeModal(){
  this.setState({editingmode:false})
}

render(){

return(

  <Fragment>
<div className="card card-custom">
 <div className="card-header">
  <div className="card-title">
   <h3 className="card-label">
    Appointment Calender
   </h3>
  </div>
  <div className="card-toolbar">
   
   
  </div>
 </div>
 <div className="card-body">
  <div id="kt_calendar"></div>
 </div>
</div>

<CalenderOrders closingmodal={this.closeModal.bind(this)} editingmode={this.state.editingmode} date={this.state.date}/>

</Fragment>



	)


}



}


export default orderCalender