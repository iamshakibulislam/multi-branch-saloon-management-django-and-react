import React,{Fragment} from 'react'
import Navbar from './shared/Navbar'
import IndexScript from './shared/sharable-script'
import Slider from './Slider'
import Gallary from './Gallary'
import Services from './Services'
import Appointment from './Appointment'
import BottomSection from './BottomSection'
import $ from 'jquery'
let IndexPage = ()=>{

	return (
<Fragment>
	<Navbar/>
	<Slider/>
	<Gallary/>
	<Services/>
	<Appointment/>
	<BottomSection/>
	<IndexScript/>

</Fragment>	)
}


export default IndexPage