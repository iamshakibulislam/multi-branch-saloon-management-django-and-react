import React,{Fragment} from 'react'

let Appointment = () =>{

	return (


	<section id="appoinment" className="col-padtop wow fadeInUp">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="appoimentbg">
            <div className="col-sm-12 col-md-9 col-lg-8">
              <h2>make an appointment</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar luctus est eget congue. Nam auctor nisi est, nec tempus lacus viverra nec.</p>
            </div>
            <div className="clearfix"></div>
            <div className="appfrm">	
                 <div id="SuccessMessage"></div>
                 <div id="ErrorMessage"></div>
                 <form action="/" name="AppointmentFrm"  method="get" >
                   <div className="col-sm-12 col-md-8 col-lg-7 appfrmleft">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" name="AppointmentFullName" id="AppointmentFullName" className="form-control required"/>
                    </div>
                    <div className="form-group mt-right0">
                      <label>Email</label>
                      <input type="email" className="form-control required email" name="AppointmentEmail" id="AppointmentEmail"/>
                    </div>
                    <div className="form-group pull-left">
                      <label>Contact Number</label>
                      <input type="text" name="AppointmentContactNumber" id="AppointmentContactNumber" className="form-control required number"/>
                    </div>
                    <div className="form-group mt-right0">
						<div className="input-append dateinput">
                          <label className="control-label">Date</label>
                          <div className="desktopdate text-dark"><input type="text" className="form-control required" style={{color:'black'}} name="AppointmentDate" id="datePicker" /></div>
                          <div className="mobiledate text-dark"><input type="date" className="form-control required" style={{color:'black'}} name="AppointmentMobileDate" /></div>
                        </div>
                      <div className="time">
                        <label>Time</label>
                        <select name="AppointmentTime" id="AppointmentTime">
                          <option selected>Select</option>
                          <option className="text-dark" style={{color:'black'}}>11:00am</option>
                          <option className="text-dark" style={{color:'black'}}>12:00pm</option>
                          <option className="text-dark" style={{color:'black'}}>01:00pm</option>
                          <option className="text-dark" style={{color:'black'}}>02:00pm</option>
                          <option className="text-dark" style={{color:'black'}}>03:00pm</option>
                          <option className="text-dark" style={{color:'black'}}>04:00pm</option>
                          <option className="text-dark" style={{color:'black'}}>05:00pm</option>
                          <option className="text-dark" style={{color:'black'}}>06:00pm</option>
                        </select>
                        </div>
                        
                    </div>
                  </div>
                   <div className="col-sm-12 col-md-4 col-lg-5 appfrmright">
                        <div className="form-group textarea">
                          <label className="control-label">Description</label>
                          <textarea className="form-control" name="AppointmentMessage" rows="5" id="AppointmentMessage"></textarea>
                        </div>
                         <div className="submitbtn">
                            <input type="submit" className="btn btn-default" value="Submit" />
                         </div>	
                   </div> 
                 </form>
                 <div className="clearfix"></div>
			</div>
          </div>
        </div>
      </div>
    </div>
  </section>

	

		)
}


export default Appointment