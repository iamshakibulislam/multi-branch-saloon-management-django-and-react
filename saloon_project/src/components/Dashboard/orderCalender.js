import React,{Component,Fragment} from 'react';
import axios from 'axios'
import baseContext from '../shared/baseContext'

class orderCalender extends Component{

static contextType = baseContext

componentDidMount(){


 let el= document.createElement('script');
  el.src=this.context.reactBase+'/js/calender.js';
  document.getElementById('root').appendChild(el)
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
   <a href="#" className="btn btn-light-primary font-weight-bold">
   <i className="ki ki-plus "></i> Appoint now
   </a>
  </div>
 </div>
 <div className="card-body">
  <div id="kt_calendar"></div>
 </div>
</div>



</Fragment>



	)


}



}


export default orderCalender