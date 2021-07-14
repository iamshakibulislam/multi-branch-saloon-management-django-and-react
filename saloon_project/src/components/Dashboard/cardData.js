import react,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import baseContext from '../shared/baseContext'
import Pagination from 'react-responsive-pagination';


class cardData extends Component{


	state = {

		card_data :null

	}

static contextType=baseContext


componentDidMount(){

	axios.post(this.context.baseUrl+'/items/card_data/',
    { 
    	


    },{
  headers: {
    Authorization: 'Token ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }}).then((response)=>{
      console.log(response.data);
      this.setState({card_data:response.data})
      
      }
      
    
    

    ).catch((error)=>{
      
      this.setState({alert:true,message:'Can not load data !'})
    })
}

render(){
	return(




		<div className="card card-custom bg-gray-100 card-stretch gutter-b">
											{/*begin::Header*/}
											<div className="card-header border-0 bg-danger py-5">
												<h3 className="card-title font-weight-bolder text-white">Sales Stat</h3>
												<div className="card-toolbar">
													<div className="dropdown dropdown-inline d-none">
														<a href="#" className="btn btn-transparent-white btn-sm font-weight-bolder dropdown-toggle px-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
														<div className="dropdown-menu dropdown-menu-sm dropdown-menu-right d-none" >
															{/*begin::Navigation*/}
															<ul className="navi navi-hover">
																<li className="navi-header pb-1">
																	<span className="text-primary text-uppercase font-weight-bold font-size-sm">Add new:</span>
																</li>
																<li className="navi-item">
																	<a href="#" className="navi-link">
																		<span className="navi-icon">
																			<i className="flaticon2-shopping-cart-1"></i>
																		</span>
																		<span className="navi-text">Order</span>
																	</a>
																</li>
																<li className="navi-item">
																	<a href="#" className="navi-link">
																		<span className="navi-icon">
																			<i className="flaticon2-calendar-8"></i>
																		</span>
																		<span className="navi-text">Event</span>
																	</a>
																</li>
																<li className="navi-item">
																	<a href="#" className="navi-link">
																		<span className="navi-icon">
																			<i className="flaticon2-graph-1"></i>
																		</span>
																		<span className="navi-text">Report</span>
																	</a>
																</li>
																<li className="navi-item">
																	<a href="#" className="navi-link">
																		<span className="navi-icon">
																			<i className="flaticon2-rocket-1"></i>
																		</span>
																		<span className="navi-text">Post</span>
																	</a>
																</li>
																<li className="navi-item">
																	<a href="#" className="navi-link">
																		<span className="navi-icon">
																			<i className="flaticon2-writing"></i>
																		</span>
																		<span className="navi-text">File</span>
																	</a>
																</li>
															</ul>
															{/*end::Navigation*/}
														</div>
													</div>
												</div>
											</div>
											{/*end::Header*/}
											{/*begin::Body*/}
											<div className="card-body p-0 position-relative overflow-hidden">
												{/*begin::Chart*/}
												<div id="kt_mixed_widget_1_chart" className="card-rounded-bottom bg-danger" style={{height: '200px', minHeight: '200px'}}><div id="apexcharts4de5ut9lg" className="apexcharts-canvas apexcharts4de5ut9lg apexcharts-theme-light" style={{width: '506px',height: '200px'}}><svg id="SvgjsSvg1271" width="506" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.com/svgjs" className="apexcharts-svg" xmlnsData="ApexChartsNS" transform="translate(0, 0)" style={{Background: 'transparent'}}><g id="SvgjsG1273" className="apexcharts-inner apexcharts-graphical" transform="translate(0, 0)"><defs id="SvgjsDefs1272"><clipPath id="gridRectMask4de5ut9lg"><rect id="SvgjsRect1276" width="513" height="203" x="-3.5" y="-1.5" rx="0" ry="0" opacity="1" strokeWidth="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="gridRectMarkerMask4de5ut9lg"><rect id="SvgjsRect1277" width="510" height="204" x="-2" y="-2" rx="0" ry="0" opacity="1" strokeWidth="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><filter id="SvgjsFilter1283" filterUnits="userSpaceOnUse" width="200%" height="200%" x="-50%" y="-50%"><feFlood id="SvgjsFeFlood1284" flood-color="#d13647" flood-opacity="0.5" result="SvgjsFeFlood1284Out" in="SourceGraphic"></feFlood><feComposite id="SvgjsFeComposite1285" in="SvgjsFeFlood1284Out" in2="SourceAlpha" operator="in" result="SvgjsFeComposite1285Out"></feComposite><feOffset id="SvgjsFeOffset1286" dx="0" dy="5" result="SvgjsFeOffset1286Out" in="SvgjsFeComposite1285Out"></feOffset><feGaussianBlur id="SvgjsFeGaussianBlur1287" stdDeviation="3 " result="SvgjsFeGaussianBlur1287Out" in="SvgjsFeOffset1286Out"></feGaussianBlur><feMerge id="SvgjsFeMerge1288" result="SvgjsFeMerge1288Out" in="SourceGraphic"><feMergeNode id="SvgjsFeMergeNode1289" in="SvgjsFeGaussianBlur1287Out"></feMergeNode><feMergeNode id="SvgjsFeMergeNode1290" in="[object Arguments]"></feMergeNode></feMerge><feBlend id="SvgjsFeBlend1291" in="SourceGraphic" in2="SvgjsFeMerge1288Out" mode="normal" result="SvgjsFeBlend1291Out"></feBlend></filter><filter id="SvgjsFilter1293" filterUnits="userSpaceOnUse" width="200%" height="200%" x="-50%" y="-50%"><feFlood id="SvgjsFeFlood1294" flood-color="#d13647" flood-opacity="0.5" result="SvgjsFeFlood1294Out" in="SourceGraphic"></feFlood><feComposite id="SvgjsFeComposite1295" in="SvgjsFeFlood1294Out" in2="SourceAlpha" operator="in" result="SvgjsFeComposite1295Out"></feComposite><feOffset id="SvgjsFeOffset1296" dx="0" dy="5" result="SvgjsFeOffset1296Out" in="SvgjsFeComposite1295Out"></feOffset><feGaussianBlur id="SvgjsFeGaussianBlur1297" stdDeviation="3 " result="SvgjsFeGaussianBlur1297Out" in="SvgjsFeOffset1296Out"></feGaussianBlur><feMerge id="SvgjsFeMerge1298" result="SvgjsFeMerge1298Out" in="SourceGraphic"><feMergeNode id="SvgjsFeMergeNode1299" in="SvgjsFeGaussianBlur1297Out"></feMergeNode><feMergeNode id="SvgjsFeMergeNode1300" in="[object Arguments]"></feMergeNode></feMerge><feBlend id="SvgjsFeBlend1301" in="SourceGraphic" in2="SvgjsFeMerge1298Out" mode="normal" result="SvgjsFeBlend1301Out"></feBlend></filter></defs><g id="SvgjsG1302" className="apexcharts-xaxis" transform="translate(0, 0)"><g id="SvgjsG1303" className="apexcharts-xaxis-texts-g" transform="translate(0, -4)"></g></g><g id="SvgjsG1312" className="apexcharts-grid"><g id="SvgjsG1313" className="apexcharts-gridlines-horizontal" style={{display: 'none'}}><line id="SvgjsLine1315" x1="0" y1="0" x2="506" y2="0" stroke="#e0e0e0" stroke-dasharray="0" className="apexcharts-gridline"></line><line id="SvgjsLine1316" x1="0" y1="20" x2="506" y2="20" stroke="#e0e0e0" stroke-dasharray="0" className="apexcharts-gridline"></line><line id="SvgjsLine1317" x1="0" y1="40" x2="506" y2="40" stroke="#e0e0e0" stroke-dasharray="0" className="apexcharts-gridline"></line><line id="SvgjsLine1318" x1="0" y1="60" x2="506" y2="60" stroke="#e0e0e0" stroke-dasharray="0" className="apexcharts-gridline"></line><line id="SvgjsLine1319" x1="0" y1="80" x2="506" y2="80" stroke="#e0e0e0" stroke-dasharray="0" className="apexcharts-gridline"></line><line id="SvgjsLine1320" x1="0" y1="100" x2="506" y2="100" stroke="#e0e0e0" stroke-dasharray="0" className="apexcharts-gridline"></line><line id="SvgjsLine1321" x1="0" y1="120" x2="506" y2="120" stroke="#e0e0e0" stroke-dasharray="0" className="apexcharts-gridline"></line><line id="SvgjsLine1322" x1="0" y1="140" x2="506" y2="140" stroke="#e0e0e0" stroke-dasharray="0" className="apexcharts-gridline"></line><line id="SvgjsLine1323" x1="0" y1="160" x2="506" y2="160" stroke="#e0e0e0" stroke-dasharray="0" className="apexcharts-gridline"></line><line id="SvgjsLine1324" x1="0" y1="180" x2="506" y2="180" stroke="#e0e0e0" stroke-dasharray="0" className="apexcharts-gridline"></line><line id="SvgjsLine1325" x1="0" y1="200" x2="506" y2="200" stroke="#e0e0e0" stroke-dasharray="0" className="apexcharts-gridline"></line></g><g id="SvgjsG1314" className="apexcharts-gridlines-vertical" style={{display: 'none'}}></g><line id="SvgjsLine1327" x1="0" y1="200" x2="506" y2="200" stroke="transparent" stroke-dasharray="0"></line><line id="SvgjsLine1326" x1="0" y1="1" x2="0" y2="200" stroke="transparent" stroke-dasharray="0"></line></g><g id="SvgjsG1278" className="apexcharts-area-series apexcharts-plot-series"><g id="SvgjsG1279" className="apexcharts-series" seriesName="NetxProfit" dataLongestSeries="true" rel="1" dataRealIndex="0"><path id="SvgjsPath1282" d="M 0 200L 0 125C 29.51666666666667 125 54.81666666666668 87.5 84.33333333333334 87.5C 113.85000000000001 87.5 139.15 120 168.66666666666669 120C 198.18333333333337 120 223.48333333333335 25 253.00000000000003 25C 282.5166666666667 25 307.8166666666667 100 337.33333333333337 100C 366.85 100 392.15000000000003 100 421.6666666666667 100C 451.18333333333334 100 476.4833333333334 100 506.00000000000006 100C 506.00000000000006 100 506.00000000000006 100 506.00000000000006 200M 506.00000000000006 100z" fill="transparent" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" strokeWidth="0" stroke-dasharray="0" className="apexcharts-area" index="0" clip-path="url(#gridRectMask4de5ut9lg)" filter="url(#SvgjsFilter1283)" pathTo="M 0 200L 0 125C 29.51666666666667 125 54.81666666666668 87.5 84.33333333333334 87.5C 113.85000000000001 87.5 139.15 120 168.66666666666669 120C 198.18333333333337 120 223.48333333333335 25 253.00000000000003 25C 282.5166666666667 25 307.8166666666667 100 337.33333333333337 100C 366.85 100 392.15000000000003 100 421.6666666666667 100C 451.18333333333334 100 476.4833333333334 100 506.00000000000006 100C 506.00000000000006 100 506.00000000000006 100 506.00000000000006 200M 506.00000000000006 100z" pathFrom="M -1 200L -1 200L 84.33333333333334 200L 168.66666666666669 200L 253.00000000000003 200L 337.33333333333337 200L 421.6666666666667 200L 506.00000000000006 200"></path><path id="SvgjsPath1292" d="M 0 125C 29.51666666666667 125 54.81666666666668 87.5 84.33333333333334 87.5C 113.85000000000001 87.5 139.15 120 168.66666666666669 120C 198.18333333333337 120 223.48333333333335 25 253.00000000000003 25C 282.5166666666667 25 307.8166666666667 100 337.33333333333337 100C 366.85 100 392.15000000000003 100 421.6666666666667 100C 451.18333333333334 100 476.4833333333334 100 506.00000000000006 100" fill="none" fill-opacity="1" stroke="#d13647" stroke-opacity="1" stroke-linecap="butt" strokeWidth="3" stroke-dasharray="0" className="apexcharts-area" index="0" clip-path="url(#gridRectMask4de5ut9lg)" filter="url(#SvgjsFilter1293)" pathTo="M 0 125C 29.51666666666667 125 54.81666666666668 87.5 84.33333333333334 87.5C 113.85000000000001 87.5 139.15 120 168.66666666666669 120C 198.18333333333337 120 223.48333333333335 25 253.00000000000003 25C 282.5166666666667 25 307.8166666666667 100 337.33333333333337 100C 366.85 100 392.15000000000003 100 421.6666666666667 100C 451.18333333333334 100 476.4833333333334 100 506.00000000000006 100" pathFrom="M -1 200L -1 200L 84.33333333333334 200L 168.66666666666669 200L 253.00000000000003 200L 337.33333333333337 200L 421.6666666666667 200L 506.00000000000006 200"></path><g id="SvgjsG1280" className="apexcharts-series-markers-wrap" dataRealIndex="0"><g className="apexcharts-series-markers"><circle id="SvgjsCircle1333" r="0" cx="253.00000000000003" cy="25" className="apexcharts-marker whtuuty2b no-pointer-events" stroke="#d13647" fill="#ffe2e5" fill-opacity="1" strokeWidth="3" stroke-opacity="0.9" default-marker-size="0"></circle></g></g></g><g id="SvgjsG1281" className="apexcharts-datalabels" dataRealIndex="0"></g></g><line id="SvgjsLine1328" x1="0" y1="0" x2="506" y2="0" stroke="#b6b6b6" stroke-dasharray="0" strokeWidth="1" className="apexcharts-ycrosshairs"></line><line id="SvgjsLine1329" x1="0" y1="0" x2="506" y2="0" stroke-dasharray="0" strokeWidth="0" className="apexcharts-ycrosshairs-hidden"></line><g id="SvgjsG1330" className="apexcharts-yaxis-annotations"></g><g id="SvgjsG1331" className="apexcharts-xaxis-annotations"></g><g id="SvgjsG1332" className="apexcharts-point-annotations"></g></g><g id="SvgjsG1311" className="apexcharts-yaxis" rel="0" transform="translate(-18, 0)"></g><g id="SvgjsG1274" className="apexcharts-annotations"></g></svg><div className="apexcharts-legend" style={{maxHeight: '100px'}}></div><div className="apexcharts-tooltip apexcharts-theme-light" style={{left: '67.9062px', top: '28px'}}><div className="apexcharts-tooltip-title" style={{fontFamily: 'Poppins',fontSize: '12px'}}>May</div><div className="apexcharts-tooltip-series-group apexcharts-active" style={{order: '1', display: 'flex'}}><span className="apexcharts-tooltip-marker" style={{backgroundColor: 'transparent', display: 'none'}}></span><div className="apexcharts-tooltip-text" style={{fontFamily: 'Poppins', fontSize: '12px'}}><div className="apexcharts-tooltip-y-group"><span className="apexcharts-tooltip-text-label">Net Profit: </span><span className="apexcharts-tooltip-text-value">$70 thousands</span></div><div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span className="apexcharts-tooltip-text-z-value"></span></div></div></div></div><div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light"><div className="apexcharts-yaxistooltip-text"></div></div></div></div>
												{/*end::Chart*/}
												{/*begin::Stats*/}
												<div className="card-spacer mt-n25">
													{/*begin::Row*/}
													<div className="row m-0">
														<div className="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
															<span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
																{/*begin::Svg Icon | path:assets/media/svg/icons/Media/Equalizer.svg*/}
																<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																	<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
																		<rect x="0" y="0" width="24" height="24"></rect>
																		<rect fill="#000000" opacity="0.3" x="13" y="4" width="3" height="16" rx="1.5"></rect>
																		<rect fill="#000000" x="8" y="9" width="3" height="11" rx="1.5"></rect>
																		<rect fill="#000000" x="18" y="11" width="3" height="9" rx="1.5"></rect>
																		<rect fill="#000000" x="3" y="13" width="3" height="7" rx="1.5"></rect>
																	</g>
																</svg>
																{/*end::Svg Icon*/}
															</span>
															<a href="#" className="text-warning font-weight-bold font-size-h6 ">Todays Appointments</a>
															{this.state.card_data !=null?
															<h3 className="text-dark text-left mt-3">{this.state.card_data.total_appointment_today}</h3>:
															<h3 className="text-dark text-left mt-3">0</h3>
															}
														</div>
														<div className="col bg-light-primary px-6 py-8 rounded-xl mb-7">
															<span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
																{/*begin::Svg Icon | path:assets/media/svg/icons/Communication/Add-user.svg*/}
																<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																	<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
																		<polygon points="0 0 24 0 24 24 0 24"></polygon>
																		<path d="M18,8 L16,8 C15.4477153,8 15,7.55228475 15,7 C15,6.44771525 15.4477153,6 16,6 L18,6 L18,4 C18,3.44771525 18.4477153,3 19,3 C19.5522847,3 20,3.44771525 20,4 L20,6 L22,6 C22.5522847,6 23,6.44771525 23,7 C23,7.55228475 22.5522847,8 22,8 L20,8 L20,10 C20,10.5522847 19.5522847,11 19,11 C18.4477153,11 18,10.5522847 18,10 L18,8 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3"></path>
																		<path d="M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fillRule="nonzero"></path>
																	</g>
																</svg>
																{/*end::Svg Icon*/}
															</span>
															<a href="#" className="text-warning font-weight-bold font-size-h6 ">Order completed Today</a>
															{this.state.card_data !=null?
															<h3 className="text-dark text-left mt-3">{this.state.card_data.total_completed_orders_today}</h3>:
															<h3 className="text-dark text-left mt-3">0</h3>}

														</div>
													</div>
													{/*end::Row*/}
													{/*begin::Row*/}
													<div className="row m-0">
														<div className="col bg-light-danger px-6 py-8 rounded-xl mr-7">
															<span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
																{/*begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg*/}
																<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																	<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
																		<polygon points="0 0 24 0 24 24 0 24"></polygon>
																		<path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fillRule="nonzero"></path>
																		<path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3"></path>
																	</g>
																</svg>
																{/*end::Svg Icon*/}
															</span>
															<a href="#" className="text-warning font-weight-bold font-size-h6 ">Current Month Cash Balance</a>
															{this.state.card_data !=null?
															<h3 className="text-dark text-left mt-3">{this.state.card_data.total_balance_this_month} $</h3>:
															<h3 className="text-dark text-left mt-3">0.00 $</h3>}

														</div>
														<div className="col bg-light-success px-6 py-8 rounded-xl">
															<span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
																{/*begin::Svg Icon | path:assets/media/svg/icons/Communication/Urgent-mail.svg*/}
																<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																	<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
																		<rect x="0" y="0" width="24" height="24"></rect>
																		<path d="M12.7037037,14 L15.6666667,10 L13.4444444,10 L13.4444444,6 L9,12 L11.2222222,12 L11.2222222,14 L6,14 C5.44771525,14 5,13.5522847 5,13 L5,3 C5,2.44771525 5.44771525,2 6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,13 C19,13.5522847 18.5522847,14 18,14 L12.7037037,14 Z" fill="#000000" opacity="0.3"></path>
																		<path d="M9.80428954,10.9142091 L9,12 L11.2222222,12 L11.2222222,16 L15.6666667,10 L15.4615385,10 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 L9.80428954,10.9142091 Z" fill="#000000"></path>
																	</g>
																</svg>
																{/*end::Svg Icon*/}
															</span>
															<a href="#" className="text-warning font-weight-bold font-size-h6 ">Todays Sale Total</a>
															{this.state.card_data !=null?
															<h3 className="text-dark text-left mt-3">{this.state.card_data.total_sales_today} $</h3>:
															<h3 className="text-dark text-left mt-3">0.00 $</h3>}

														</div>
													</div>
													{/*end::Row*/}
												</div>
												{/*end::Stats*/}
											<div className="resize-triggers"><div className="expand-trigger"><div style={{width: '507px',height: '447px'}}></div></div><div className="contract-trigger"></div></div></div>
											{/*end::Body*/}
										</div>







		)
}



}



export default cardData