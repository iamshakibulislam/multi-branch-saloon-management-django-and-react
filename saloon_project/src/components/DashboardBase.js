import React,{Fragment,Component} from 'react'
import StaffRegister from './Dashboard/staffRegister'
import staffList from './Dashboard/staffList'
import branchList from './Dashboard/branchList'
import itemList from './Dashboard/itemList'
import ServiceList from './Dashboard/serviceList'
import addService from './Dashboard/addService'
import itemProviderList from './Dashboard/itemProviderList'
import buyItems from './Dashboard/buyItems'
import stock from './Dashboard/stock'
import order from './Dashboard/order'
import orderdetails from './Dashboard/orderdetails'
import allStatistics from './Dashboard/allStatistics'
import serviceCategory from './Dashboard/serviceCategory'
import voucherList from './Dashboard/voucherList'
import axios from 'axios'
import addStaffToBranch from './Dashboard/addStaffToBranch'
import ItemCategory from './Dashboard/ItemCategory'
import orderCalender from './Dashboard/orderCalender'
import stockTransfer from './Dashboard/StockTransfer'
import {Route,Switch,Link,Render} from 'react-router-dom'
import BookAppointment from './Dashboard/StaffOrder'
import StaffOrderList from './Dashboard/StaffOrderList'
import baseContext from './shared/baseContext'
import cardData from './Dashboard/cardData'

import companySetup from './Dashboard/companySetup'



class Dashboard extends Component{

state = {
	user_info:null
}

static contextType = baseContext


componentWillMount(){
	if (sessionStorage.getItem('token') == null){
		window.location = this.context.reactBase+'/authenticate';
	}
}



componentDidMount(){

	
	
axios.post(this.context.baseUrl+'/api/authentication/user_info/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      
      this.setState({user_info:response.data})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
    })



}



signOut(){

	

	sessionStorage.removeItem('token');
	window.location=this.context.reactBase+'/authenticate';
}



render(){



return(




<Fragment>

	{/*begin::Head*/}
	<head><base href=""/>
		<meta charSet="utf-8" />
		<title>Dashboard</title>
		<meta name="description" content="Metronic admin dashboard live demo. Check out all the features of the admin panel. A large number of settings, additional services and widgets." />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		<link rel="canonical" href="https://keenthemes.com/metronic" />
		{/*begin::Fonts*/}
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
		{/*end::Fonts*/}
		{/*begin::Page Vendors Styles(used by this page)*/}
		<link href={this.context.reactBase+"/assets/plugins/custom/fullcalendar/fullcalendar.bundle.css" } rel="stylesheet" type="text/css" />
		{/*end::Page Vendors Styles*/}
		{/*begin::Global Theme Styles(used by all pages)*/}
		<link href={this.context.reactBase+"/assets/plugins/global/plugins.bundle.css" } rel="stylesheet" type="text/css" />
		<link href={this.context.reactBase+"/assets/plugins/custom/prismjs/prismjs.bundle.css" }  rel="stylesheet" type="text/css" />
		<link href={this.context.reactBase+"/assets/css/style.bundle.css" }  rel="stylesheet" type="text/css" />
		{/*end::Global Theme Styles*/}
		{/*begin::Layout Themes(used by all pages)*/}
		<link href={this.context.reactBase+"/assets/css/themes/layout/header/base/light.css" } rel="stylesheet" type="text/css" />
		<link href={this.context.reactBase+"/assets/css/themes/layout/header/menu/light.css" } rel="stylesheet" type="text/css" />
		<link href={this.context.reactBase+"/assets/css/themes/layout/brand/dark.css" } rel="stylesheet" type="text/css" />
		<link href={this.context.reactBase+"/assets/css/themes/layout/aside/dark.css" } rel="stylesheet" type="text/css" />
		{/*end::Layout Themes*/}
		
		<link rel="shortcut icon" href={this.context.reactBase+"/assets/media/logos/favicon.ico" } />
	</head>
	{/*end::Head*/}
	{/*begin::Body*/}
	<body id="kt_body" className="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading">
		{/*begin::Main*/}
		{/*begin::Header Mobile*/}
		<div id="kt_header_mobile" className="header-mobile align-items-center header-mobile-fixed">
			{/*begin::Logo*/}
			<a href="#">
				<img alt="Logo" src={this.context.reactBase+"/assets/logos/logo-light.png"} />
			</a>
			{/*end::Logo*/}
			{/*begin::Toolbar*/}
			<div className="d-flex align-items-center">
				{/*begin::Aside Mobile Toggle*/}
				<button className="btn p-0 burger-icon burger-icon-left" id="kt_aside_mobile_toggle">
					<span></span>
				</button>
				{/*end::Aside Mobile Toggle*/}
				{/*begin::Header Menu Mobile Toggle*/}
				<button className="btn p-0 burger-icon ml-4" id="kt_header_mobile_toggle">
					<span></span>
				</button>
				{/*end::Header Menu Mobile Toggle*/}
				{/*begin::Topbar Mobile Toggle*/}
				<button className="btn btn-hover-text-primary p-0 ml-2" id="kt_header_mobile_topbar_toggle">
					<span className="svg-icon svg-icon-xl">
						{/*begin::Svg Icon | path:./assets/media/svg/icons/General/User.svg*/}
						<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
							<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								<polygon points="0 0 24 0 24 24 0 24" />
								<path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
								<path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fill-rule="nonzero" />
							</g>
						</svg>
						{/*end::Svg Icon*/}
					</span>
				</button>
				{/*end::Topbar Mobile Toggle*/}
			</div>
			{/*end::Toolbar*/}
		</div>
		{/*end::Header Mobile*/}
		<div className="d-flex flex-column flex-root">
			{/*begin::Page*/}
			<div className="d-flex flex-row flex-column-fluid page">
				{/*begin::Aside*/}
				<div className="aside aside-left aside-fixed d-flex flex-column flex-row-auto" id="kt_aside">
					{/*begin::Brand*/}
					<div className="brand flex-column-auto" id="kt_brand">
						{/*begin::Logo*/}
						<a href="index.html" className="brand-logo">
							<img alt="Logo" src={this.context.reactBase+"/assets/logos/logo-light.png"} />
						</a>
						{/*end::Logo*/}
						{/*begin::Toggle*/}
						<button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
							<span className="svg-icon svg-icon svg-icon-xl">
								{/*begin::Svg Icon | path:./assets/media/svg/icons/Navigation/Angle-double-left.svg*/}
								<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
									<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										<polygon points="0 0 24 0 24 24 0 24" />
										<path d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z" fill="#000000" fill-rule="nonzero" transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999)" />
										<path d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999)" />
									</g>
								</svg>
								{/*end::Svg Icon*/}
							</span>
						</button>
						{/*end::Toolbar*/}
					</div>
					{/*end::Brand*/}
					{/*begin::Aside Menu*/}
					<div className="aside-menu-wrapper flex-column-fluid" id="kt_aside_menu_wrapper">
						{/*begin::Menu Container*/}
						<div id="kt_aside_menu" className="aside-menu my-4" data-menu-vertical="1" data-menu-scroll="1" data-menu-dropdown-timeout="500">
							{/*begin::Menu Nav*/}
							<ul className="menu-nav">
								<li className="menu-item menu-item-active" aria-haspopup="true">
									<a href="/dashboard/" className="menu-link">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Design/Layers.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<polygon points="0 0 24 0 24 24 0 24" />
													<path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fill-rule="nonzero" />
													<path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">Dashboard</span>
									</a>
								</li>
								{this.state.user_info != null && this.state.user_info.role=='user'?
								<li className="menu-item menu-item-active" aria-haspopup="true">
									<Link to="/dashboard/order/" className="menu-link">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Design/Layers.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<polygon points="0 0 24 0 24 24 0 24" />
													<path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fill-rule="nonzero" />
													<path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">Book Appointment</span>
									</Link>
								</li>:null}


								{this.state.user_info != null && (this.state.user_info.role=='superuser' || this.state.user_info.role=='admin' || this.state.user_info.role == 'manager')?
								<li className="menu-item menu-item-active" aria-haspopup="true">
									<Link to="/dashboard/report/" className="menu-link">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Design/Layers.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<polygon points="0 0 24 0 24 24 0 24" />
													<path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fill-rule="nonzero" />
													<path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">Sales Report</span>
									</Link>
								</li>:null}


								{this.state.user_info != null && (this.state.user_info.role=='superuser' || this.state.user_info.role=='admin' || this.state.user_info.role == 'manager')?
								<li className="menu-item menu-item-active" aria-haspopup="true">
									<Link to="/dashboard/company_setup/" className="menu-link">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Design/Layers.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<polygon points="0 0 24 0 24 24 0 24" />
													<path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fill-rule="nonzero" />
													<path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">Company Setup</span>
									</Link>
								</li>:null}

								{this.state.user_info != null && this.state.user_info.role=='staff'?
								<li className="menu-item menu-item-active" aria-haspopup="true">
									<Link to="/dashboard/book_appointment/" className="menu-link">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Design/Layers.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<polygon points="0 0 24 0 24 24 0 24" />
													<path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fill-rule="nonzero" />
													<path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">Book Appointment</span>
									</Link>
								</li>:null}

								{this.state.user_info != null && this.state.user_info.role=='staff'?
								<li className="menu-item menu-item-active" aria-haspopup="true">
									<Link to="/dashboard/order_list/" className="menu-link">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Design/Layers.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<polygon points="0 0 24 0 24 24 0 24" />
													<path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fill-rule="nonzero" />
													<path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">My Order List</span>
									</Link>
								</li>:null}


								{this.state.user_info != null && (this.state.user_info.role=='staff' || this.state.user_info.role=='manager' || this.state.user_info.role=='admin' || this.state.user_info.role=='superuser')?
								<li className="menu-item menu-item-active" aria-haspopup="true">
									<Link to="/dashboard/transfer_stock/" className="menu-link">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Design/Layers.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<polygon points="0 0 24 0 24 24 0 24" />
													<path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fill-rule="nonzero" />
													<path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">Stock Transfer</span>
									</Link>
								</li>:null}

								{this.state.user_info != null && (this.state.user_info.role=='superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager')?
								<li className="menu-section">
									<h4 className="menu-text">Management</h4>
									<i className="menu-icon ki ki-bold-more-hor icon-md"></i>
								</li>:null}

								{this.state.user_info != null && (this.state.user_info.role=='superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager')?
								<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
									<a href="javascript:;" className="menu-link menu-toggle">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Layout/Layout-4-blocks.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<rect x="0" y="0" width="24" height="24" />
													<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
													<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">Staff Management</span>
										<i className="menu-arrow"></i>
									</a>
									<div className="menu-submenu">
										<i className="menu-arrow"></i>
										<ul className="menu-subnav">
											<li className="menu-item menu-item-parent" aria-haspopup="true">
												<span className="menu-link">
													<span className="menu-text">Applications</span>
												</span>
											</li>
										
											
											
											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/add_staff" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-line">
														<span></span>
													</i>
													<span className="menu-text">Add staff</span>
													
												</Link>
												
											</li>

											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/staff_list" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-line">
														<span></span>
													</i>
													<span className="menu-text">Staff list</span>
													
												</Link>
												
											</li>
										
										
											
										
											
										</ul>
									</div>
								</li>:null}

							{/* service  managemnet here */}
							{this.state.user_info != null && (this.state.user_info.role=='superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager' || this.state.user_info.role == 'staff')?
										<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
									<a href="javascript:;" className="menu-link menu-toggle">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Shopping/Barcode-read.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<rect x="0" y="0" width="24" height="24" />
													<rect fill="#000000" opacity="0.3" x="4" y="4" width="8" height="16" />
													<path d="M6,18 L9,18 C9.66666667,18.1143819 10,18.4477153 10,19 C10,19.5522847 9.66666667,19.8856181 9,20 L4,20 L4,15 C4,14.3333333 4.33333333,14 5,14 C5.66666667,14 6,14.3333333 6,15 L6,18 Z M18,18 L18,15 C18.1143819,14.3333333 18.4477153,14 19,14 C19.5522847,14 19.8856181,14.3333333 20,15 L20,20 L15,20 C14.3333333,20 14,19.6666667 14,19 C14,18.3333333 14.3333333,18 15,18 L18,18 Z M18,6 L15,6 C14.3333333,5.88561808 14,5.55228475 14,5 C14,4.44771525 14.3333333,4.11438192 15,4 L20,4 L20,9 C20,9.66666667 19.6666667,10 19,10 C18.3333333,10 18,9.66666667 18,9 L18,6 Z M6,6 L6,9 C5.88561808,9.66666667 5.55228475,10 5,10 C4.44771525,10 4.11438192,9.66666667 4,9 L4,4 L9,4 C9.66666667,4 10,4.33333333 10,5 C10,5.66666667 9.66666667,6 9,6 L6,6 Z" fill="#000000" fill-rule="nonzero" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">Service Management</span>
										<i className="menu-arrow"></i>
									</a>
									<div className="menu-submenu">
										<i className="menu-arrow"></i>
										<ul className="menu-subnav">
											<li className="menu-item menu-item-parent" aria-haspopup="true">
												<span className="menu-link">
													<span className="menu-text">Service Management</span>
												</span>
											</li>
											
											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/service_category/" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-dot">
														<span></span>
													</i>
													<span className="menu-text">Add category</span>
													<i className="menu-arrow"></i>
												</Link>
												
											</li>

											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/add_service" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-dot">
														<span></span>
													</i>
													<span className="menu-text">Add service</span>
													<i className="menu-arrow"></i>
												</Link>
												
											</li>
											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/service_list" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-dot">
														<span></span>
													</i>
													<span className="menu-text">Service list</span>
													<i className="menu-arrow"></i>
												</Link>
												
											</li>


											


											
											
										</ul>
									</div>
								</li>:null}
							{/* end of service managemnt */}
								{this.state.user_info != null && (this.state.user_info.role=='superuser')?
								<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
									<a href="javascript:;" className="menu-link menu-toggle">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Shopping/Barcode-read.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<rect x="0" y="0" width="24" height="24" />
													<rect fill="#000000" opacity="0.3" x="4" y="4" width="8" height="16" />
													<path d="M6,18 L9,18 C9.66666667,18.1143819 10,18.4477153 10,19 C10,19.5522847 9.66666667,19.8856181 9,20 L4,20 L4,15 C4,14.3333333 4.33333333,14 5,14 C5.66666667,14 6,14.3333333 6,15 L6,18 Z M18,18 L18,15 C18.1143819,14.3333333 18.4477153,14 19,14 C19.5522847,14 19.8856181,14.3333333 20,15 L20,20 L15,20 C14.3333333,20 14,19.6666667 14,19 C14,18.3333333 14.3333333,18 15,18 L18,18 Z M18,6 L15,6 C14.3333333,5.88561808 14,5.55228475 14,5 C14,4.44771525 14.3333333,4.11438192 15,4 L20,4 L20,9 C20,9.66666667 19.6666667,10 19,10 C18.3333333,10 18,9.66666667 18,9 L18,6 Z M6,6 L6,9 C5.88561808,9.66666667 5.55228475,10 5,10 C4.44771525,10 4.11438192,9.66666667 4,9 L4,4 L9,4 C9.66666667,4 10,4.33333333 10,5 C10,5.66666667 9.66666667,6 9,6 L6,6 Z" fill="#000000" fill-rule="nonzero" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">Branch Management</span>
										<i className="menu-arrow"></i>
									</a>
									<div className="menu-submenu">
										<i className="menu-arrow"></i>
										<ul className="menu-subnav">
											<li className="menu-item menu-item-parent" aria-haspopup="true">
												<span className="menu-link">
													<span className="menu-text">Branch Management</span>
												</span>
											</li>
											

											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/branch_list" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-dot">
														<span></span>
													</i>
													<span className="menu-text">Branch list</span>
													<i className="menu-arrow"></i>
												</Link>
												
											</li>


											


											
											
										</ul>
									</div>
								</li>:null}
								

							{/* adding product management */}
							{this.state.user_info != null && (this.state.user_info.role=='superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager' || this.state.user_info.role == 'staff')?
							<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
									<a href="javascript:;" className="menu-link menu-toggle">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Shopping/Barcode-read.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<rect x="0" y="0" width="24" height="24" />
													<rect fill="#000000" opacity="0.3" x="4" y="4" width="8" height="16" />
													<path d="M6,18 L9,18 C9.66666667,18.1143819 10,18.4477153 10,19 C10,19.5522847 9.66666667,19.8856181 9,20 L4,20 L4,15 C4,14.3333333 4.33333333,14 5,14 C5.66666667,14 6,14.3333333 6,15 L6,18 Z M18,18 L18,15 C18.1143819,14.3333333 18.4477153,14 19,14 C19.5522847,14 19.8856181,14.3333333 20,15 L20,20 L15,20 C14.3333333,20 14,19.6666667 14,19 C14,18.3333333 14.3333333,18 15,18 L18,18 Z M18,6 L15,6 C14.3333333,5.88561808 14,5.55228475 14,5 C14,4.44771525 14.3333333,4.11438192 15,4 L20,4 L20,9 C20,9.66666667 19.6666667,10 19,10 C18.3333333,10 18,9.66666667 18,9 L18,6 Z M6,6 L6,9 C5.88561808,9.66666667 5.55228475,10 5,10 C4.44771525,10 4.11438192,9.66666667 4,9 L4,4 L9,4 C9.66666667,4 10,4.33333333 10,5 C10,5.66666667 9.66666667,6 9,6 L6,6 Z" fill="#000000" fill-rule="nonzero" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">Item Management</span>
										<i className="menu-arrow"></i>
									</a>
									<div className="menu-submenu">
										<i className="menu-arrow"></i>
										<ul className="menu-subnav">
											<li className="menu-item menu-item-parent" aria-haspopup="true">
												<span className="menu-link">
													<span className="menu-text">Item Management</span>
												</span>
											</li>
											
											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/item_category/" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-dot">
														<span></span>
													</i>
													<span className="menu-text">Item Category</span>
													<i className="menu-arrow"></i>
												</Link>
												
											</li>

											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/item_list" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-dot">
														<span></span>
													</i>
													<span className="menu-text">Item list</span>
													<i className="menu-arrow"></i>
												</Link>
												
											</li>


											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/provider_list" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-dot">
														<span></span>
													</i>
													<span className="menu-text">Item Providers</span>
													<i className="menu-arrow"></i>
												</Link>
												
											</li>


											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/buy_items" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-dot">
														<span></span>
													</i>
													<span className="menu-text">Buy items</span>
													<i className="menu-arrow"></i>
												</Link>
												
											</li>


											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/item_stock" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-dot">
														<span></span>
													</i>
													<span className="menu-text">Item Stock</span>
													<i className="menu-arrow"></i>
												</Link>
												
											</li>


											
											
										</ul>
									</div>
								</li>:null}





								{this.state.user_info != null && (this.state.user_info.role=='superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager' || this.state.user_info.role == 'user' )?
							<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
									<a href="javascript:;" className="menu-link menu-toggle">
										<span className="svg-icon menu-icon">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Shopping/Barcode-read.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<rect x="0" y="0" width="24" height="24" />
													<rect fill="#000000" opacity="0.3" x="4" y="4" width="8" height="16" />
													<path d="M6,18 L9,18 C9.66666667,18.1143819 10,18.4477153 10,19 C10,19.5522847 9.66666667,19.8856181 9,20 L4,20 L4,15 C4,14.3333333 4.33333333,14 5,14 C5.66666667,14 6,14.3333333 6,15 L6,18 Z M18,18 L18,15 C18.1143819,14.3333333 18.4477153,14 19,14 C19.5522847,14 19.8856181,14.3333333 20,15 L20,20 L15,20 C14.3333333,20 14,19.6666667 14,19 C14,18.3333333 14.3333333,18 15,18 L18,18 Z M18,6 L15,6 C14.3333333,5.88561808 14,5.55228475 14,5 C14,4.44771525 14.3333333,4.11438192 15,4 L20,4 L20,9 C20,9.66666667 19.6666667,10 19,10 C18.3333333,10 18,9.66666667 18,9 L18,6 Z M6,6 L6,9 C5.88561808,9.66666667 5.55228475,10 5,10 C4.44771525,10 4.11438192,9.66666667 4,9 L4,4 L9,4 C9.66666667,4 10,4.33333333 10,5 C10,5.66666667 9.66666667,6 9,6 L6,6 Z" fill="#000000" fill-rule="nonzero" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
										<span className="menu-text">Voucher Management</span>
										<i className="menu-arrow"></i>
									</a>
									<div className="menu-submenu">
										<i className="menu-arrow"></i>
										<ul className="menu-subnav">
											<li className="menu-item menu-item-parent" aria-haspopup="true">
												<span className="menu-link">
													<span className="menu-text">Voucher Management</span>
												</span>
											</li>
											
											<li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
												<Link to="/dashboard/voucher/" className="menu-link menu-toggle">
													<i className="menu-bullet menu-bullet-dot">
														<span></span>
													</i>
													<span className="menu-text">Voucher</span>
													<i className="menu-arrow"></i>
												</Link>
												
											</li>

											


											


											


											


											
											
										</ul>
									</div>
								</li>:null}



							</ul>
							{/*end::Menu Nav*/}
						</div>
						{/*end::Menu Container*/}
					</div>
					{/*end::Aside Menu*/}
				</div>
				{/*end::Aside*/}
				{/*begin::Wrapper*/}
				<div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper" style={{paddingTop:'4rem'}}>
					{/*begin::Header*/}
					<div id="kt_header" className="header header-fixed">
						{/*begin::Container*/}
						<div className="container-fluid d-flex align-items-stretch justify-content-between">
							{/*begin::Header Menu Wrapper*/}
							<div className="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
								{/*begin::Header Menu*/}
								<div id="kt_header_menu" className="header-menu header-menu-mobile header-menu-layout-default">
									{/*begin::Header Nav*/}
									<ul className="menu-nav">
										
						
									
									</ul>
									{/*end::Header Nav*/}
								</div>
								{/*end::Header Menu*/}
							</div>
							{/*end::Header Menu Wrapper*/}
							{/*begin::Topbar*/}
							<div className="topbar">
							
							
								
								
								
								
								
								
								{/*begin::User*/}
								<div className="topbar-item">
									<div className="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2" id="kt_quick_user_toggle">
										<span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>
										<span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">{this.state.user_info != null? this.state.user_info.first_name:null}</span>
										<span className="symbol symbol-lg-35 symbol-25 symbol-light-success">
											<span className="symbol-label font-size-h5 font-weight-bold">S</span>
										</span>
									</div>
								</div>
								{/*end::User*/}
							</div>
							{/*end::Topbar*/}
						</div>
						{/*end::Container*/}
					</div>
					{/*end::Header*/}
					{/*begin::Content*/}
					<div className="content d-flex flex-column flex-column-fluid" id="kt_content" style={{marginTop:'0rem'}}>
						{/*begin::Subheader*/}
						
						{/*end::Subheader*/}
						{/*begin::Entry*/}
						<div className="d-flex flex-column-fluid">
							{/*begin::Container*/}
							<div className="container">
								{/*begin::Dashboard*/}
								{/*begin::Row*/}
								<div className="row">
								{this.state.user_info != null?

									
									<div className="col-lg-10 col-xxl-10" style={{marginLeft:'auto',marginRight:'auto'}}>
									{this.state.user_info.role == 'superuser' || this.state.user_info.role == 'admin' ?
									<Route path="/dashboard/report/" exact component={allStatistics} />:null}

									{this.state.user_info.role == 'user' ?
									<Route path="/dashboard/" exact component={orderdetails} />:null}

									{this.state.user_info.role == 'superuser' || this.state.user_info.role=='admin'?
									<Route path="/dashboard/" exact component={cardData} />:null}

									{this.state.user_info.role == 'manager' || this.state.user_info.role == 'staff'?

									<Route path="/dashboard/" exact component={orderCalender} />:null}
									{this.state.user_info.role == 'superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role=='manager' ?
									<Route path="/dashboard/company_setup/" exact component={companySetup} />:null}

									{this.state.user_info != null && (this.state.user_info.role=='staff' || this.state.user_info.role=='manager' || this.state.user_info.role=='admin')?

									<Route path="/dashboard/book_appointment/" exact component={BookAppointment} />:null}

				{this.state.user_info != null && (this.state.user_info.role=='staff' || this.state.user_info.role=='manager' || this.state.user_info.role=='admin' || this.state.user_info.role=='superuser')?
					<Route path="/dashboard/transfer_stock/" component={stockTransfer} />:null}


									{this.state.user_info.role == 'superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager'?
									 <Route path="/dashboard/add_staff" exact component={StaffRegister} />:null}
									 {this.state.user_info.role == 'superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager'?
									 <Route path="/dashboard/staff_list"  component={staffList} />:null}
									 {this.state.user_info.role == 'superuser'  || this.state.user_info.role == 'manager'?
									 <Route path="/dashboard/branch_list" exact component={branchList}/>:null}
									 {this.state.user_info.role == 'superuser' ||  this.state.user_info.role == 'manager'?
									 <Route path="/dashboard/add_staff_to_branch" exact component={addStaffToBranch} />:null}
									 {this.state.user_info.role == 'superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager' || this.state.user_info.role == 'staff'?
									 <Route path="/dashboard/item_list" exact component={itemList} />:null}
									 {this.state.user_info.role == 'superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager' || this.state.user_info.role == 'staff'?
									 <Route path="/dashboard/service_list" exact component={ServiceList} />:null}
									 {this.state.user_info.role == 'superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager' || this.state.user_info.role == 'staff'?
									 <Route path="/dashboard/add_service" exact component={addService} />:null}
									 {this.state.user_info.role == 'superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager' || this.state.user_info.role == 'staff'?
									 <Route path="/dashboard/item_category/" exact component={ItemCategory} />:null}
									 {this.state.user_info.role == 'superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager' || this.state.user_info.role == 'staff'?
									 <Route path="/dashboard/provider_list/" exact component={itemProviderList} />:null}
									 {this.state.user_info.role == 'superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager' || this.state.user_info.role == 'staff'?
									 <Route path="/dashboard/buy_items/" exact component={buyItems} />:null}
									 {this.state.user_info.role == 'superuser' || this.state.user_info.role == 'admin' || this.state.user_info.role == 'manager' || this.state.user_info.role=='staff'?
									 <Route path="/dashboard/item_stock/" exact component={stock} />:null}


									  {this.state.user_info.role=='staff'?
									 <Route path="/dashboard/order_list/" exact component={StaffOrderList} />:null}
									 
									 
									 <Route path="/dashboard/voucher/" exact component={voucherList} />
									 <Route path="/dashboard/order/" exact component={order} />

									 <Route path="/dashboard/service_category/" exact component={serviceCategory} />

									</div>:null}

									
								
								</div>
								{/*end::Row*/}
								
							</div>
							{/*end::Container*/}
						</div>
						{/*end::Entry*/}
					</div>
					{/*end::Content*/}
					{/*begin::Footer*/}
					
					{/*end::Footer*/}
				</div>
				{/*end::Wrapper*/}
			</div>
			{/*end::Page*/}
		</div>
		{/*end::Main*/}
		{/* begin::User Panel*/}
		<div id="kt_quick_user" className="offcanvas offcanvas-right p-10">
			{/*begin::Header*/}
			<div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
				<h3 className="font-weight-bold m-0">User Profile
				</h3>
				<a href="#" className="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_user_close">
					<i className="ki ki-close icon-xs text-muted"></i>
				</a>
			</div>
			{/*end::Header*/}
			{/*begin::Content*/}
			<div className="offcanvas-content pr-5 mr-n5">
				{/*begin::Header*/}
				<div className="d-flex align-items-center mt-5">
				{/*
					<div className="symbol symbol-100 mr-5"> */}
						{/*<div className="symbol-label" style={{backgroundImage:'url(./assets/media/users/300_21.jpg)'}}></div> */}
						{/*<i className="symbol-badge bg-success"></i>
					</div> */}
					<div className="d-flex flex-column">
						<a href="#" className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary">{this.state.user_info != null? this.state.user_info.first_name +' '+this.state.user_info.last_name:null}</a>
						<div className="text-muted mt-1">{this.state.user_info != null? this.state.user_info.role:null}</div>
						<div className="navi mt-2">
							<a href="#" className="navi-item">
								<span className="navi-link p-0 pb-2">
									<span className="navi-icon mr-1">
										<span className="svg-icon svg-icon-lg svg-icon-primary">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Communication/Mail-notification.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<rect x="0" y="0" width="24" height="24" />
													<path d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z" fill="#000000" />
													<circle fill="#000000" opacity="0.3" cx="19.5" cy="17.5" r="2.5" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
									</span>
									<span className="navi-text text-muted text-hover-primary">{this.state.user_info != null? this.state.user_info.email:null}</span>
								</span>
							</a>
							<a  className="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5" onClick={()=>this.signOut()}>Sign Out</a>
						</div>
					</div>
				</div>
				{/*end::Header*/}
				{/*begin::Separator*/}
				<div className="separator separator-dashed mt-8 mb-5"></div>
				{/*end::Separator*/}
				{/*begin::Nav*/}
				{/*
				<div className="navi navi-spacer-x-0 p-0"> */}

					{/*begin::Item*/}
					{/*}
					<a href="custom/apps/user/profile-1/personal-information.html" className="navi-item">
						<div className="navi-link">
							<div className="symbol symbol-40 bg-light mr-3">
								<div className="symbol-label">
									<span className="svg-icon svg-icon-md svg-icon-success">
										
										<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
											<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
												<rect x="0" y="0" width="24" height="24" />
												<path d="M13.2070325,4 C13.0721672,4.47683179 13,4.97998812 13,5.5 C13,8.53756612 15.4624339,11 18.5,11 C19.0200119,11 19.5231682,10.9278328 20,10.7929675 L20,17 C20,18.6568542 18.6568542,20 17,20 L7,20 C5.34314575,20 4,18.6568542 4,17 L4,7 C4,5.34314575 5.34314575,4 7,4 L13.2070325,4 Z" fill="#000000" />
												<circle fill="#000000" opacity="0.3" cx="18.5" cy="5.5" r="2.5" />
											</g>
										</svg>
										
									</span>
								</div>
							</div>
							
							<div className="navi-text">
								<div className="font-weight-bold">My Profile</div>
								<div className="text-muted">Account settings and more
								<span className="label label-light-danger label-inline font-weight-bold">update</span></div>
							</div> 
						</div>
					</a>
					
					
				</div>*/}
				
				{/*begin::Separator*/}
				<div className="separator separator-dashed my-7"></div>
				{/*end::Separator*/}
				{/*begin::Notifications*/}
				<div>
					{/*begin:Heading*/}
					
					
					
					
					
					
					
					{/*end::Item*/}
				</div>
				{/*end::Notifications*/}
			</div>
			{/*end::Content*/}
		</div>
		{/* end::User Panel*/}
		{/*begin::Quick Cart*/}
		<div id="kt_quick_cart" className="offcanvas offcanvas-right p-10">
			{/*begin::Header*/}
			<div className="offcanvas-header d-flex align-items-center justify-content-between pb-7">
				<h4 className="font-weight-bold m-0">Shopping Cart</h4>
				<a href="#" className="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_cart_close">
					<i className="ki ki-close icon-xs text-muted"></i>
				</a>
			</div>
			{/*end::Header*/}
			{/*begin::Content*/}
			<div className="offcanvas-content">
				{/*begin::Wrapper*/}
				<div className="offcanvas-wrapper mb-5 scroll-pull">
					{/*begin::Item*/}
					<div className="d-flex align-items-center justify-content-between py-8">
						<div className="d-flex flex-column mr-2">
							<a href="#" className="font-weight-bold text-dark-75 font-size-lg text-hover-primary">iBlender</a>
							<span className="text-muted">The best kitchen gadget in 2020</span>
							<div className="d-flex align-items-center mt-2">
								<span className="font-weight-bold mr-1 text-dark-75 font-size-lg">$ 350</span>
								<span className="text-muted mr-1">for</span>
								<span className="font-weight-bold mr-2 text-dark-75 font-size-lg">5</span>
								<a href="#" className="btn btn-xs btn-light-success btn-icon mr-2">
									<i className="ki ki-minus icon-xs"></i>
								</a>
								<a href="#" className="btn btn-xs btn-light-success btn-icon">
									<i className="ki ki-plus icon-xs"></i>
								</a>
							</div>
						</div>
						<a href="#" className="symbol symbol-70 flex-shrink-0">
							<img src="./assets/media/stock-600x400/img-1.jpg" title="" alt="" />
						</a>
					</div>
					{/*end::Item*/}
					{/*begin::Separator*/}
					<div className="separator separator-solid"></div>
					{/*end::Separator*/}
					{/*begin::Item*/}
					<div className="d-flex align-items-center justify-content-between py-8">
						<div className="d-flex flex-column mr-2">
							<a href="#" className="font-weight-bold text-dark-75 font-size-lg text-hover-primary">SmartCleaner</a>
							<span className="text-muted">Smart tool for cooking</span>
							<div className="d-flex align-items-center mt-2">
								<span className="font-weight-bold mr-1 text-dark-75 font-size-lg">$ 650</span>
								<span className="text-muted mr-1">for</span>
								<span className="font-weight-bold mr-2 text-dark-75 font-size-lg">4</span>
								<a href="#" className="btn btn-xs btn-light-success btn-icon mr-2">
									<i className="ki ki-minus icon-xs"></i>
								</a>
								<a href="#" className="btn btn-xs btn-light-success btn-icon">
									<i className="ki ki-plus icon-xs"></i>
								</a>
							</div>
						</div>
						<a href="#" className="symbol symbol-70 flex-shrink-0">
							<img src="./assets/media/stock-600x400/img-2.jpg" title="" alt="" />
						</a>
					</div>
					{/*end::Item*/}
					{/*begin::Separator*/}
					<div className="separator separator-solid"></div>
					{/*end::Separator*/}
					{/*begin::Item*/}
					<div className="d-flex align-items-center justify-content-between py-8">
						<div className="d-flex flex-column mr-2">
							<a href="#" className="font-weight-bold text-dark-75 font-size-lg text-hover-primary">CameraMax</a>
							<span className="text-muted">Professional camera for edge cutting shots</span>
							<div className="d-flex align-items-center mt-2">
								<span className="font-weight-bold mr-1 text-dark-75 font-size-lg">$ 150</span>
								<span className="text-muted mr-1">for</span>
								<span className="font-weight-bold mr-2 text-dark-75 font-size-lg">3</span>
								<a href="#" className="btn btn-xs btn-light-success btn-icon mr-2">
									<i className="ki ki-minus icon-xs"></i>
								</a>
								<a href="#" className="btn btn-xs btn-light-success btn-icon">
									<i className="ki ki-plus icon-xs"></i>
								</a>
							</div>
						</div>
						<a href="#" className="symbol symbol-70 flex-shrink-0">
							<img src="./assets/media/stock-600x400/img-3.jpg" title="" alt="" />
						</a>
					</div>
					{/*end::Item*/}
					{/*begin::Separator*/}
					<div className="separator separator-solid"></div>
					{/*end::Separator*/}
					{/*begin::Item*/}
					<div className="d-flex align-items-center justify-content-between py-8">
						<div className="d-flex flex-column mr-2">
							<a href="#" className="font-weight-bold text-dark text-hover-primary">4D Printer</a>
							<span className="text-muted">Manufactoring unique objects</span>
							<div className="d-flex align-items-center mt-2">
								<span className="font-weight-bold mr-1 text-dark-75 font-size-lg">$ 1450</span>
								<span className="text-muted mr-1">for</span>
								<span className="font-weight-bold mr-2 text-dark-75 font-size-lg">7</span>
								<a href="#" className="btn btn-xs btn-light-success btn-icon mr-2">
									<i className="ki ki-minus icon-xs"></i>
								</a>
								<a href="#" className="btn btn-xs btn-light-success btn-icon">
									<i className="ki ki-plus icon-xs"></i>
								</a>
							</div>
						</div>
						<a href="#" className="symbol symbol-70 flex-shrink-0">
							<img src="./assets/media/stock-600x400/img-4.jpg" title="" alt="" />
						</a>
					</div>
					{/*end::Item*/}
					{/*begin::Separator*/}
					<div className="separator separator-solid"></div>
					{/*end::Separator*/}
					{/*begin::Item*/}
					<div className="d-flex align-items-center justify-content-between py-8">
						<div className="d-flex flex-column mr-2">
							<a href="#" className="font-weight-bold text-dark text-hover-primary">MotionWire</a>
							<span className="text-muted">Perfect animation tool</span>
							<div className="d-flex align-items-center mt-2">
								<span className="font-weight-bold mr-1 text-dark-75 font-size-lg">$ 650</span>
								<span className="text-muted mr-1">for</span>
								<span className="font-weight-bold mr-2 text-dark-75 font-size-lg">7</span>
								<a href="#" className="btn btn-xs btn-light-success btn-icon mr-2">
									<i className="ki ki-minus icon-xs"></i>
								</a>
								<a href="#" className="btn btn-xs btn-light-success btn-icon">
									<i className="ki ki-plus icon-xs"></i>
								</a>
							</div>
						</div>
						<a href="#" className="symbol symbol-70 flex-shrink-0">
							<img src="./assets/media/stock-600x400/img-8.jpg" title="" alt="" />
						</a>
					</div>
					{/*end::Item*/}
				</div>
				{/*end::Wrapper*/}
				{/*begin::Purchase*/}
				<div className="offcanvas-footer">
					<div className="d-flex align-items-center justify-content-between mb-4">
						<span className="font-weight-bold text-muted font-size-sm mr-2">Total</span>
						<span className="font-weight-bolder text-dark-50 text-right">$1840.00</span>
					</div>
					<div className="d-flex align-items-center justify-content-between mb-7">
						<span className="font-weight-bold text-muted font-size-sm mr-2">Sub total</span>
						<span className="font-weight-bolder text-primary text-right">$5640.00</span>
					</div>
					<div className="text-right">
						<button type="button" className="btn btn-primary text-weight-bold">Place Order</button>
					</div>
				</div>
				{/*end::Purchase*/}
			</div>
			{/*end::Content*/}
		</div>
		{/*end::Quick Cart*/}
		{/*begin::Quick Panel*/}
		<div id="kt_quick_panel" className="offcanvas offcanvas-right pt-5 pb-10">
			{/*begin::Header*/}
			<div className="offcanvas-header offcanvas-header-navs d-flex align-items-center justify-content-between mb-5">
				<ul className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-primary flex-grow-1 px-10" role="tablist">
					<li className="nav-item">
						<a className="nav-link active" data-toggle="tab" href="#kt_quick_panel_logs">Audit Logs</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" data-toggle="tab" href="#kt_quick_panel_notifications">Notifications</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" data-toggle="tab" href="#kt_quick_panel_settings">Settings</a>
					</li>
				</ul>
				<div className="offcanvas-close mt-n1 pr-5">
					<a href="#" className="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_panel_close">
						<i className="ki ki-close icon-xs text-muted"></i>
					</a>
				</div>
			</div>
			{/*end::Header*/}
			{/*begin::Content*/}
			<div className="offcanvas-content px-10">
				<div className="tab-content">
					{/*begin::Tabpane*/}
					<div className="tab-pane fade show pt-3 pr-5 mr-n5 active" id="kt_quick_panel_logs" role="tabpanel">
						{/*begin::Section*/}
						<div className="mb-15">
							<h5 className="font-weight-bold mb-5">System Messages</h5>
							{/*begin: Item*/}
							<div className="d-flex align-items-center flex-wrap mb-5">
								<div className="symbol symbol-50 symbol-light mr-5">
									<span className="symbol-label">
										<img src="./assets/media/svg/misc/006-plurk.svg" className="h-50 align-self-center" alt="" />
									</span>
								</div>
								<div className="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" className="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">Top Authors</a>
									<span className="text-muted font-weight-bold">Most Successful Fellas</span>
								</div>
								<span className="btn btn-sm btn-light font-weight-bolder py-1 my-lg-0 my-2 text-dark-50">+82$</span>
							</div>
							{/*end: Item*/}
							{/*begin: Item*/}
							<div className="d-flex align-items-center flex-wrap mb-5">
								<div className="symbol symbol-50 symbol-light mr-5">
									<span className="symbol-label">
										<img src="./assets/media/svg/misc/015-telegram.svg" className="h-50 align-self-center" alt="" />
									</span>
								</div>
								<div className="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" className="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">Popular Authors</a>
									<span className="text-muted font-weight-bold">Most Successful Fellas</span>
								</div>
								<span className="btn btn-sm btn-light font-weight-bolder my-lg-0 my-2 py-1 text-dark-50">+280$</span>
							</div>
							{/*end: Item*/}
							{/*begin: Item*/}
							<div className="d-flex align-items-center flex-wrap mb-5">
								<div className="symbol symbol-50 symbol-light mr-5">
									<span className="symbol-label">
										<img src="./assets/media/svg/misc/003-puzzle.svg" className="h-50 align-self-center" alt="" />
									</span>
								</div>
								<div className="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" className="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">New Users</a>
									<span className="text-muted font-weight-bold">Most Successful Fellas</span>
								</div>
								<span className="btn btn-sm btn-light font-weight-bolder my-lg-0 my-2 py-1 text-dark-50">+4500$</span>
							</div>
							{/*end: Item*/}
							{/*begin: Item*/}
							<div className="d-flex align-items-center flex-wrap mb-5">
								<div className="symbol symbol-50 symbol-light mr-5">
									<span className="symbol-label">
										<img src="./assets/media/svg/misc/005-bebo.svg" className="h-50 align-self-center" alt="" />
									</span>
								</div>
								<div className="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" className="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">Active Customers</a>
									<span className="text-muted font-weight-bold">Most Successful Fellas</span>
								</div>
								<span className="btn btn-sm btn-light font-weight-bolder my-lg-0 my-2 py-1 text-dark-50">+4500$</span>
							</div>
							{/*end: Item*/}
							{/*begin: Item*/}
							<div className="d-flex align-items-center flex-wrap">
								<div className="symbol symbol-50 symbol-light mr-5">
									<span className="symbol-label">
										<img src="./assets/media/svg/misc/014-kickstarter.svg" className="h-50 align-self-center" alt="" />
									</span>
								</div>
								<div className="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" className="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">Bestseller Theme</a>
									<span className="text-muted font-weight-bold">Most Successful Fellas</span>
								</div>
								<span className="btn btn-sm btn-light font-weight-bolder my-lg-0 my-2 py-1 text-dark-50">+4500$</span>
							</div>
							{/*end: Item*/}
						</div>
						{/*end::Section*/}
						{/*begin::Section*/}
						<div className="mb-5">
							<h5 className="font-weight-bold mb-5">Notifications</h5>
							{/*begin: Item*/}
							<div className="d-flex align-items-center bg-light-warning rounded p-5 mb-5">
								<span className="svg-icon svg-icon-warning mr-5">
									<span className="svg-icon svg-icon-lg">
										{/*begin::Svg Icon | path:./assets/media/svg/icons/Home/Library.svg*/}
										<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
											<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
												<rect x="0" y="0" width="24" height="24" />
												<path d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z" fill="#000000" />
												<rect fill="#000000" opacity="0.3" transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)" x="16.3255682" y="2.94551858" width="3" height="18" rx="1" />
											</g>
										</svg>
										{/*end::Svg Icon*/}
									</span>
								</span>
								<div className="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1">Another purpose persuade</a>
									<span className="text-muted font-size-sm">Due in 2 Days</span>
								</div>
								<span className="font-weight-bolder text-warning py-1 font-size-lg">+28%</span>
							</div>
							{/*end: Item*/}
							{/*begin: Item*/}
							<div className="d-flex align-items-center bg-light-success rounded p-5 mb-5">
								<span className="svg-icon svg-icon-success mr-5">
									<span className="svg-icon svg-icon-lg">
										{/*begin::Svg Icon | path:./assets/media/svg/icons/Communication/Write.svg*/}
										<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
											<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
												<rect x="0" y="0" width="24" height="24" />
												<path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)" />
												<path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
											</g>
										</svg>
										{/*end::Svg Icon*/}
									</span>
								</span>
								<div className="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1">Would be to people</a>
									<span className="text-muted font-size-sm">Due in 2 Days</span>
								</div>
								<span className="font-weight-bolder text-success py-1 font-size-lg">+50%</span>
							</div>
							{/*end: Item*/}
							{/*begin: Item*/}
							<div className="d-flex align-items-center bg-light-danger rounded p-5 mb-5">
								<span className="svg-icon svg-icon-danger mr-5">
									<span className="svg-icon svg-icon-lg">
										{/*begin::Svg Icon | path:./assets/media/svg/icons/Communication/Group-chat.svg*/}
										<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
											<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
												<rect x="0" y="0" width="24" height="24" />
												<path d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z" fill="#000000" />
												<path d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z" fill="#000000" opacity="0.3" />
											</g>
										</svg>
										{/*end::Svg Icon*/}
									</span>
								</span>
								<div className="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1">Purpose would be to persuade</a>
									<span className="text-muted font-size-sm">Due in 2 Days</span>
								</div>
								<span className="font-weight-bolder text-danger py-1 font-size-lg">-27%</span>
							</div>
							{/*end: Item*/}
							{/*begin: Item*/}
							<div className="d-flex align-items-center bg-light-info rounded p-5">
								<span className="svg-icon svg-icon-info mr-5">
									<span className="svg-icon svg-icon-lg">
										{/*begin::Svg Icon | path:./assets/media/svg/icons/General/Attachment2.svg*/}
										<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
											<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
												<rect x="0" y="0" width="24" height="24" />
												<path d="M11.7573593,15.2426407 L8.75735931,15.2426407 C8.20507456,15.2426407 7.75735931,15.6903559 7.75735931,16.2426407 C7.75735931,16.7949254 8.20507456,17.2426407 8.75735931,17.2426407 L11.7573593,17.2426407 L11.7573593,18.2426407 C11.7573593,19.3472102 10.8619288,20.2426407 9.75735931,20.2426407 L5.75735931,20.2426407 C4.65278981,20.2426407 3.75735931,19.3472102 3.75735931,18.2426407 L3.75735931,14.2426407 C3.75735931,13.1380712 4.65278981,12.2426407 5.75735931,12.2426407 L9.75735931,12.2426407 C10.8619288,12.2426407 11.7573593,13.1380712 11.7573593,14.2426407 L11.7573593,15.2426407 Z" fill="#000000" opacity="0.3" transform="translate(7.757359, 16.242641) rotate(-45.000000) translate(-7.757359, -16.242641)" />
												<path d="M12.2426407,8.75735931 L15.2426407,8.75735931 C15.7949254,8.75735931 16.2426407,8.30964406 16.2426407,7.75735931 C16.2426407,7.20507456 15.7949254,6.75735931 15.2426407,6.75735931 L12.2426407,6.75735931 L12.2426407,5.75735931 C12.2426407,4.65278981 13.1380712,3.75735931 14.2426407,3.75735931 L18.2426407,3.75735931 C19.3472102,3.75735931 20.2426407,4.65278981 20.2426407,5.75735931 L20.2426407,9.75735931 C20.2426407,10.8619288 19.3472102,11.7573593 18.2426407,11.7573593 L14.2426407,11.7573593 C13.1380712,11.7573593 12.2426407,10.8619288 12.2426407,9.75735931 L12.2426407,8.75735931 Z" fill="#000000" transform="translate(16.242641, 7.757359) rotate(-45.000000) translate(-16.242641, -7.757359)" />
												<path d="M5.89339828,3.42893219 C6.44568303,3.42893219 6.89339828,3.87664744 6.89339828,4.42893219 L6.89339828,6.42893219 C6.89339828,6.98121694 6.44568303,7.42893219 5.89339828,7.42893219 C5.34111353,7.42893219 4.89339828,6.98121694 4.89339828,6.42893219 L4.89339828,4.42893219 C4.89339828,3.87664744 5.34111353,3.42893219 5.89339828,3.42893219 Z M11.4289322,5.13603897 C11.8194565,5.52656326 11.8194565,6.15972824 11.4289322,6.55025253 L10.0147186,7.96446609 C9.62419433,8.35499039 8.99102936,8.35499039 8.60050506,7.96446609 C8.20998077,7.5739418 8.20998077,6.94077682 8.60050506,6.55025253 L10.0147186,5.13603897 C10.4052429,4.74551468 11.0384079,4.74551468 11.4289322,5.13603897 Z M0.600505063,5.13603897 C0.991029355,4.74551468 1.62419433,4.74551468 2.01471863,5.13603897 L3.42893219,6.55025253 C3.81945648,6.94077682 3.81945648,7.5739418 3.42893219,7.96446609 C3.0384079,8.35499039 2.40524292,8.35499039 2.01471863,7.96446609 L0.600505063,6.55025253 C0.209980772,6.15972824 0.209980772,5.52656326 0.600505063,5.13603897 Z" fill="#000000" opacity="0.3" transform="translate(6.014719, 5.843146) rotate(-45.000000) translate(-6.014719, -5.843146)" />
												<path d="M17.9142136,15.4497475 C18.4664983,15.4497475 18.9142136,15.8974627 18.9142136,16.4497475 L18.9142136,18.4497475 C18.9142136,19.0020322 18.4664983,19.4497475 17.9142136,19.4497475 C17.3619288,19.4497475 16.9142136,19.0020322 16.9142136,18.4497475 L16.9142136,16.4497475 C16.9142136,15.8974627 17.3619288,15.4497475 17.9142136,15.4497475 Z M23.4497475,17.1568542 C23.8402718,17.5473785 23.8402718,18.1805435 23.4497475,18.5710678 L22.0355339,19.9852814 C21.6450096,20.3758057 21.0118446,20.3758057 20.6213203,19.9852814 C20.2307961,19.5947571 20.2307961,18.9615921 20.6213203,18.5710678 L22.0355339,17.1568542 C22.4260582,16.76633 23.0592232,16.76633 23.4497475,17.1568542 Z M12.6213203,17.1568542 C13.0118446,16.76633 13.6450096,16.76633 14.0355339,17.1568542 L15.4497475,18.5710678 C15.8402718,18.9615921 15.8402718,19.5947571 15.4497475,19.9852814 C15.0592232,20.3758057 14.4260582,20.3758057 14.0355339,19.9852814 L12.6213203,18.5710678 C12.2307961,18.1805435 12.2307961,17.5473785 12.6213203,17.1568542 Z" fill="#000000" opacity="0.3" transform="translate(18.035534, 17.863961) scale(1, -1) rotate(45.000000) translate(-18.035534, -17.863961)" />
											</g>
										</svg>
										{/*end::Svg Icon*/}
									</span>
								</span>
								<div className="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1">The best product</a>
									<span className="text-muted font-size-sm">Due in 2 Days</span>
								</div>
								<span className="font-weight-bolder text-info py-1 font-size-lg">+8%</span>
							</div>
							{/*end: Item*/}
						</div>
						{/*end::Section*/}
					</div>
					{/*end::Tabpane*/}
					{/*begin::Tabpane*/}
					<div className="tab-pane fade pt-2 pr-5 mr-n5" id="kt_quick_panel_notifications" role="tabpanel">
						{/*begin::Nav*/}
						<div className="navi navi-icon-circle navi-spacer-x-0">
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon-bell text-success icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">5 new user generated report</div>
										<div className="text-muted">Reports based on sales</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon2-box text-danger icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">2 new items submited</div>
										<div className="text-muted">by Grog John</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon-psd text-primary icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">79 PSD files generated</div>
										<div className="text-muted">Reports based on sales</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon2-supermarket text-warning icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">$2900 worth producucts sold</div>
										<div className="text-muted">Total 234 items</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon-paper-plane-1 text-success icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">4.5h-avarage response time</div>
										<div className="text-muted">Fostest is Barry</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon-safe-shield-protection text-danger icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">3 Defence alerts</div>
										<div className="text-muted">40% less alerts thar last week</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon-notepad text-primary icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">Avarage 4 blog posts per author</div>
										<div className="text-muted">Most posted 12 time</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon-users-1 text-warning icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">16 authors joined last week</div>
										<div className="text-muted">9 photodrapehrs, 7 designer</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon2-box text-info icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">2 new items have been submited</div>
										<div className="text-muted">by Grog John</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon2-download text-success icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">2.8 GB-total downloads size</div>
										<div className="text-muted">Mostly PSD end AL concepts</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon2-supermarket text-danger icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">$2900 worth producucts sold</div>
										<div className="text-muted">Total 234 items</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon-bell text-primary icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">7 new user generated report</div>
										<div className="text-muted">Reports based on sales</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
							{/*begin::Item*/}
							<a href="#" className="navi-item">
								<div className="navi-link rounded">
									<div className="symbol symbol-50 mr-3">
										<div className="symbol-label">
											<i className="flaticon-paper-plane-1 text-success icon-lg"></i>
										</div>
									</div>
									<div className="navi-text">
										<div className="font-weight-bold font-size-lg">4.5h-avarage response time</div>
										<div className="text-muted">Fostest is Barry</div>
									</div>
								</div>
							</a>
							{/*end::Item*/}
						</div>
						{/*end::Nav*/}
					</div>
					{/*end::Tabpane*/}
					{/*begin::Tabpane*/}
					<div className="tab-pane fade pt-3 pr-5 mr-n5" id="kt_quick_panel_settings" role="tabpanel">
						<form className="form">
							{/*begin::Section*/}
							<div>
								<h5 className="font-weight-bold mb-3">Customer Care</h5>
								<div className="form-group mb-0 row align-items-center">
									<label className="col-8 col-form-label">Enable Notifications:</label>
									<div className="col-4 d-flex justify-content-end">
										<span className="switch switch-success switch-sm">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
								<div className="form-group mb-0 row align-items-center">
									<label className="col-8 col-form-label">Enable Case Tracking:</label>
									<div className="col-4 d-flex justify-content-end">
										<span className="switch switch-success switch-sm">
											<label>
												<input type="checkbox" name="quick_panel_notifications_2" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
								<div className="form-group mb-0 row align-items-center">
									<label className="col-8 col-form-label">Support Portal:</label>
									<div className="col-4 d-flex justify-content-end">
										<span className="switch switch-success switch-sm">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
							</div>
							{/*end::Section*/}
							<div className="separator separator-dashed my-6"></div>
							{/*begin::Section*/}
							<div className="pt-2">
								<h5 className="font-weight-bold mb-3">Reports</h5>
								<div className="form-group mb-0 row align-items-center">
									<label className="col-8 col-form-label">Generate Reports:</label>
									<div className="col-4 d-flex justify-content-end">
										<span className="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
								<div className="form-group mb-0 row align-items-center">
									<label className="col-8 col-form-label">Enable Report Export:</label>
									<div className="col-4 d-flex justify-content-end">
										<span className="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
								<div className="form-group mb-0 row align-items-center">
									<label className="col-8 col-form-label">Allow Data Collection:</label>
									<div className="col-4 d-flex justify-content-end">
										<span className="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
							</div>
							{/*end::Section*/}
							<div className="separator separator-dashed my-6"></div>
							{/*begin::Section*/}
							<div className="pt-2">
								<h5 className="font-weight-bold mb-3">Memebers</h5>
								<div className="form-group mb-0 row align-items-center">
									<label className="col-8 col-form-label">Enable Member singup:</label>
									<div className="col-4 d-flex justify-content-end">
										<span className="switch switch-sm switch-primary">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
								<div className="form-group mb-0 row align-items-center">
									<label className="col-8 col-form-label">Allow User Feedbacks:</label>
									<div className="col-4 d-flex justify-content-end">
										<span className="switch switch-sm switch-primary">
											<label>
												<input type="checkbox" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
								<div className="form-group mb-0 row align-items-center">
									<label className="col-8 col-form-label">Enable Customer Portal:</label>
									<div className="col-4 d-flex justify-content-end">
										<span className="switch switch-sm switch-primary">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
							</div>
							{/*end::Section*/}
						</form>
					</div>
					{/*end::Tabpane*/}
				</div>
			</div>
			{/*end::Content*/}
		</div>
		{/*end::Quick Panel*/}
		{/*begin::Chat Panel*/}
		<div className="modal modal-sticky modal-sticky-bottom-right" id="kt_chat_modal" role="dialog" data-backdrop="false">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					{/*begin::Card*/}
					<div className="card card-custom">
						{/*begin::Header*/}
						<div className="card-header align-items-center px-4 py-3">
							<div className="text-left flex-grow-1">
								{/*begin::Dropdown Menu*/}
								<div className="dropdown dropdown-inline">
									<button type="button" className="btn btn-clean btn-sm btn-icon btn-icon-md" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<span className="svg-icon svg-icon-lg">
											{/*begin::Svg Icon | path:./assets/media/svg/icons/Communication/Add-user.svg*/}
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<polygon points="0 0 24 0 24 24 0 24" />
													<path d="M18,8 L16,8 C15.4477153,8 15,7.55228475 15,7 C15,6.44771525 15.4477153,6 16,6 L18,6 L18,4 C18,3.44771525 18.4477153,3 19,3 C19.5522847,3 20,3.44771525 20,4 L20,6 L22,6 C22.5522847,6 23,6.44771525 23,7 C23,7.55228475 22.5522847,8 22,8 L20,8 L20,10 C20,10.5522847 19.5522847,11 19,11 C18.4477153,11 18,10.5522847 18,10 L18,8 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
													<path d="M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero" />
												</g>
											</svg>
											{/*end::Svg Icon*/}
										</span>
									</button>
									<div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-md">
										{/*begin::Navigation*/}
										<ul className="navi navi-hover py-5">
											<li className="navi-item">
												<a href="#" className="navi-link">
													<span className="navi-icon">
														<i className="flaticon2-drop"></i>
													</span>
													<span className="navi-text">New Group</span>
												</a>
											</li>
											<li className="navi-item">
												<a href="#" className="navi-link">
													<span className="navi-icon">
														<i className="flaticon2-list-3"></i>
													</span>
													<span className="navi-text">Contacts</span>
												</a>
											</li>
											<li className="navi-item">
												<a href="#" className="navi-link">
													<span className="navi-icon">
														<i className="flaticon2-rocket-1"></i>
													</span>
													<span className="navi-text">Groups</span>
													<span className="navi-link-badge">
														<span className="label label-light-primary label-inline font-weight-bold">new</span>
													</span>
												</a>
											</li>
											<li className="navi-item">
												<a href="#" className="navi-link">
													<span className="navi-icon">
														<i className="flaticon2-bell-2"></i>
													</span>
													<span className="navi-text">Calls</span>
												</a>
											</li>
											<li className="navi-item">
												<a href="#" className="navi-link">
													<span className="navi-icon">
														<i className="flaticon2-gear"></i>
													</span>
													<span className="navi-text">Settings</span>
												</a>
											</li>
											<li className="navi-separator my-3"></li>
											<li className="navi-item">
												<a href="#" className="navi-link">
													<span className="navi-icon">
														<i className="flaticon2-magnifier-tool"></i>
													</span>
													<span className="navi-text">Help</span>
												</a>
											</li>
											<li className="navi-item">
												<a href="#" className="navi-link">
													<span className="navi-icon">
														<i className="flaticon2-bell-2"></i>
													</span>
													<span className="navi-text">Privacy</span>
													<span className="navi-link-badge">
														<span className="label label-light-danger label-rounded font-weight-bold">5</span>
													</span>
												</a>
											</li>
										</ul>
										{/*end::Navigation*/}
									</div>
								</div>
								{/*end::Dropdown Menu*/}
							</div>
							<div className="text-center flex-grow-1">
								<div className="text-dark-75 font-weight-bold font-size-h5">Matt Pears</div>
								<div>
									<span className="label label-dot label-success"></span>
									<span className="font-weight-bold text-muted font-size-sm">Active</span>
								</div>
							</div>
							<div className="text-right flex-grow-1">
								<button type="button" className="btn btn-clean btn-sm btn-icon btn-icon-md" data-dismiss="modal">
									<i className="ki ki-close icon-1x"></i>
								</button>
							</div>
						</div>
						{/*end::Header*/}
						{/*begin::Body*/}
						<div className="card-body">
							{/*begin::Scroll*/}
							<div className="scroll scroll-pull" data-height="375" data-mobile-height="300">
								{/*begin::Messages*/}
								<div className="messages">
									{/*begin::Message In*/}
									<div className="d-flex flex-column mb-5 align-items-start">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-circle symbol-40 mr-3">
												<img alt="Pic" src="./assets/media/users/300_12.jpg" />
											</div>
											<div>
												<a href="#" className="text-dark-75 text-hover-primary font-weight-bold font-size-h6">Matt Pears</a>
												<span className="text-muted font-size-sm">2 Hours</span>
											</div>
										</div>
										<div className="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">How likely are you to recommend our company to your friends and family?</div>
									</div>
									{/*end::Message In*/}
									{/*begin::Message Out*/}
									<div className="d-flex flex-column mb-5 align-items-end">
										<div className="d-flex align-items-center">
											<div>
												<span className="text-muted font-size-sm">3 minutes</span>
												<a href="#" className="text-dark-75 text-hover-primary font-weight-bold font-size-h6">You</a>
											</div>
											<div className="symbol symbol-circle symbol-40 ml-3">
												<img alt="Pic" src="./assets/media/users/300_21.jpg" />
											</div>
										</div>
										<div className="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">Hey there, we???re just writing to let you know that you???ve been subscribed to a repository on GitHub.</div>
									</div>
									{/*end::Message Out*/}
									{/*begin::Message In*/}
									<div className="d-flex flex-column mb-5 align-items-start">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-circle symbol-40 mr-3">
												<img alt="Pic" src="./assets/media/users/300_21.jpg" />
											</div>
											<div>
												<a href="#" className="text-dark-75 text-hover-primary font-weight-bold font-size-h6">Matt Pears</a>
												<span className="text-muted font-size-sm">40 seconds</span>
											</div>
										</div>
										<div className="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">Ok, Understood!</div>
									</div>
									{/*end::Message In*/}
									{/*begin::Message Out*/}
									<div className="d-flex flex-column mb-5 align-items-end">
										<div className="d-flex align-items-center">
											<div>
												<span className="text-muted font-size-sm">Just now</span>
												<a href="#" className="text-dark-75 text-hover-primary font-weight-bold font-size-h6">You</a>
											</div>
											<div className="symbol symbol-circle symbol-40 ml-3">
												<img alt="Pic" src="./assets/media/users/300_21.jpg" />
											</div>
										</div>
										<div className="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">You???ll receive notifications for all issues, pull requests!</div>
									</div>
									{/*end::Message Out*/}
									{/*begin::Message In*/}
									<div className="d-flex flex-column mb-5 align-items-start">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-circle symbol-40 mr-3">
												<img alt="Pic" src="./assets/media/users/300_12.jpg" />
											</div>
											<div>
												<a href="#" className="text-dark-75 text-hover-primary font-weight-bold font-size-h6">Matt Pears</a>
												<span className="text-muted font-size-sm">40 seconds</span>
											</div>
										</div>
										<div className="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">You can unwatch this repository immediately by clicking here:
										<a href="#">https://github.com</a></div>
									</div>
									{/*end::Message In*/}
									{/*begin::Message Out*/}
									<div className="d-flex flex-column mb-5 align-items-end">
										<div className="d-flex align-items-center">
											<div>
												<span className="text-muted font-size-sm">Just now</span>
												<a href="#" className="text-dark-75 text-hover-primary font-weight-bold font-size-h6">You</a>
											</div>
											<div className="symbol symbol-circle symbol-40 ml-3">
												<img alt="Pic" src="./assets/media/users/300_21.jpg" />
											</div>
										</div>
										<div className="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">Discover what students who viewed Learn Figma - UI/UX Design. Essential Training also viewed</div>
									</div>
									{/*end::Message Out*/}
									{/*begin::Message In*/}
									<div className="d-flex flex-column mb-5 align-items-start">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-circle symbol-40 mr-3">
												<img alt="Pic" src="./assets/media/users/300_12.jpg" />
											</div>
											<div>
												<a href="#" className="text-dark-75 text-hover-primary font-weight-bold font-size-h6">Matt Pears</a>
												<span className="text-muted font-size-sm">40 seconds</span>
											</div>
										</div>
										<div className="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">Most purchased Business courses during this sale!</div>
									</div>
									{/*end::Message In*/}
									{/*begin::Message Out*/}
									<div className="d-flex flex-column mb-5 align-items-end">
										<div className="d-flex align-items-center">
											<div>
												<span className="text-muted font-size-sm">Just now</span>
												<a href="#" className="text-dark-75 text-hover-primary font-weight-bold font-size-h6">You</a>
											</div>
											<div className="symbol symbol-circle symbol-40 ml-3">
												<img alt="Pic" src="./assets/media/users/300_21.jpg" />
											</div>
										</div>
										<div className="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">Company BBQ to celebrate the last quater achievements and goals. Food and drinks provided</div>
									</div>
									{/*end::Message Out*/}
								</div>
								{/*end::Messages*/}
							</div>
							{/*end::Scroll*/}
						</div>
						{/*end::Body*/}
						{/*begin::Footer*/}
						<div className="card-footer align-items-center">
							{/*begin::Compose*/}
							<textarea className="form-control border-0 p-0" rows="2" placeholder="Type a message"></textarea>
							<div className="d-flex align-items-center justify-content-between mt-5">
								<div className="mr-3">
									<a href="#" className="btn btn-clean btn-icon btn-md mr-1">
										<i className="flaticon2-photograph icon-lg"></i>
									</a>
									<a href="#" className="btn btn-clean btn-icon btn-md">
										<i className="flaticon2-photo-camera icon-lg"></i>
									</a>
								</div>
								<div>
									<button type="button" className="btn btn-primary btn-md text-uppercase font-weight-bold chat-send py-2 px-6">Send</button>
								</div>
							</div>
							{/*begin::Compose*/}
						</div>
						{/*end::Footer*/}
					</div>
					{/*end::Card*/}
				</div>
			</div>
		</div>
		{/*end::Chat Panel*/}
		{/*begin::Scrolltop*/}
		<div id="kt_scrolltop" className="scrolltop">
			<span className="svg-icon">
				{/*begin::Svg Icon | path:./assets/media/svg/icons/Navigation/Up-2.svg*/}
				<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
						<polygon points="0 0 24 0 24 24 0 24" />
						<rect fill="#000000" opacity="0.3" x="11" y="10" width="2" height="10" rx="1" />
						<path d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z" fill="#000000" fill-rule="nonzero" />
					</g>
				</svg>
				{/*end::Svg Icon*/}
			</span>
		</div>
		{/*end::Scrolltop*/}
		
		{/*end::Sticky Toolbar*/}
		{/*begin::Demo Panel*/}
		<div id="kt_demo_panel" className="offcanvas offcanvas-right p-10">
			{/*begin::Header*/}
			<div className="offcanvas-header d-flex align-items-center justify-content-between pb-7">
				<h4 className="font-weight-bold m-0">Select A Demo</h4>
				<a href="#" className="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_demo_panel_close">
					<i className="ki ki-close icon-xs text-muted"></i>
				</a>
			</div>
			{/*end::Header*/}
			{/*begin::Content*/}
			<div className="offcanvas-content">
				{/*begin::Wrapper*/}
				<div className="offcanvas-wrapper mb-5 scroll-pull">
					<h5 className="font-weight-bold mb-4 text-center">Demo 1</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo offcanvas-demo-active">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo1.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo1/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo1/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 2</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo2.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo2/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo2/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 3</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo3.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo3/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo3/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 4</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo4.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo4/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo4/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 5</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo5.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo5/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo5/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 6</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo6.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo6/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo6/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 7</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo7.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo7/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo7/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 8</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo8.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo8/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo8/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 9</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo9.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo9/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo9/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 10</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo10.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo10/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo10/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 11</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo11.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo11/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo11/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 12</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo12.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo12/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo12/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 13</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo13.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="../../demo13/dist" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Default</a>
							<a href="https://preview.keenthemes.com/metronic/demo13/rtl/index.html" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">RTL Version</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 14</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo14.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 15</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo15.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 16</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo16.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 17</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo17.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 18</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo18.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 19</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo19.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 20</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo20.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 21</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo21.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 22</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo22.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 23</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo23.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 24</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo24.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 25</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo25.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 26</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo26.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 27</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo27.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 28</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo28.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 29</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo29.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
					<h5 className="font-weight-bold mb-4 text-center">Demo 30</h5>
					<div className="overlay rounded-lg mb-8 offcanvas-demo">
						<div className="overlay-wrapper rounded-lg">
							<img src="./assets/media/demos/demo30.png" alt="" className="w-100" />
						</div>
						<div className="overlay-layer">
							<a href="#" className="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow disabled opacity-90">Coming soon</a>
						</div>
					</div>
				</div>
				{/*end::Wrapper*/}
				{/*begin::Purchase*/}
				<div className="offcanvas-footer">
					<a href="https://1.envato.market/EA4JP" target="_blank" className="btn btn-block btn-danger btn-shadow font-weight-bolder text-uppercase">Buy Metronic Now!</a>
				</div>
				{/*end::Purchase*/}
			</div>
			{/*end::Content*/}
		</div>
		
	</body>
	{/*end::Body*/}

<script src={this.context.reactBase+"/assets/plugins/global/plugins.bundle.js" }></script>
</Fragment>
	
	









)}



}




export default Dashboard