import React,{Fragment} from 'react'
import Navbar from './shared/Navbar'
import IndexScript from './shared/sharable-script'

import Slider from './Slider'
import Gallary from './Gallary'
import Services from './Services'
import Appointment from './Appointment'
import BottomSection from './BottomSection'
import Footer from './shared/Footer'
import $ from 'jquery'
let IndexPage = ()=>{

	return (
    <div>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Your grooming solution at one place</title>

        <link
          href="http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:400,200,300"
          rel="stylesheet"
          type="text/css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="/static_files/css/master.css"
        />

        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
      </head>

      <Navbar />

      <div className="sliderfull">
        <div
          id="rev_slider_4_1_wrapper"
          className="rev_slider_wrapper fullwidthbanner-container"
          data-alias="classicslider1"
          style={{
            margin: "0px auto",
            backgroundColor: "transparent",
            padding: "0px",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          <div
            id="rev_slider_4_1"
            className="rev_slider fullwidthabanner"
            style={{ display: "none" }}
            data-version="5.0.7"
          >
            <ul>
              <li
                data-index="rs-16"
                data-transition="zoomout"
                data-slotamount="default"
                data-easein="Power4.easeInOut"
                data-easeout="Power4.easeInOut"
                data-masterspeed="2000"
                data-rotate="0"
                data-fstransition="fade"
                data-fsmasterspeed="1500"
                data-fsslotamount="7"
                data-saveperformance="off"
                data-title="Intro"
                data-description=""
              >
                <img
                  src="/images/main/slider1.jpg"
                  alt="slider"
                  data-bgposition="center center"
                  data-bgfit="cover"
                  data-bgrepeat="no-repeat"
                  data-bgparallax="10"
                  className="rev-slidebg"
                  data-no-retina
                />
              </li>

              <li
                data-index="rs-17"
                data-transition="zoomout"
                data-slotamount="default"
                data-easein="Power4.easeInOut"
                data-easeout="Power4.easeInOut"
                data-masterspeed="2000"
                data-rotate="0"
                data-fstransition="fade"
                data-fsmasterspeed="1500"
                data-fsslotamount="7"
                data-saveperformance="off"
                data-title="Intro"
                data-description=""
              >
                <img
                  src="/images/main/slider2.jpg"
                  alt="slider"
                  data-bgposition="center center"
                  data-bgfit="cover"
                  data-bgrepeat="no-repeat"
                  data-bgparallax="10"
                  className="rev-slidebg"
                  data-no-retina
                />
              </li>
              <li
                data-index="rs-18"
                data-transition="zoomout"
                data-slotamount="default"
                data-easein="Power4.easeInOut"
                data-easeout="Power4.easeInOut"
                data-masterspeed="2000"
                data-rotate="0"
                data-fstransition="fade"
                data-fsmasterspeed="1500"
                data-fsslotamount="7"
                data-saveperformance="off"
                data-title="Intro"
                data-description=""
              >
                <img
                  src="/images/main/slider3.jpg"
                  alt="slider"
                  data-bgposition="center center"
                  data-bgfit="cover"
                  data-bgrepeat="no-repeat"
                  data-bgparallax="10"
                  className="rev-slidebg"
                  data-no-retina
                />
              </li>
            </ul>
            <div className="tp-static-layers"></div>
            <div
              className="tp-bannertimer"
              style={{ height: "7px", backgroundColor: "#ffffff" }}
            ></div>
          </div>
        </div>
      </div>
      <section className="slider-titile">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 pull-right">
              <div className="sliderarrow">
                <a className="left rev-leftarrow">Left</a>
                <a className="right rev-rightarrow">Right</a>
              </div>
              <div className="titile-bg">
                <h1>The Kewl Salon</h1>
              </div>
              <div className="white-bg">
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  pulvinar luctus est eget congue. Nam auctor nisi est, nec
                  tempus lacus viverra nec. Nullam cursus, neque non congue
                  aliquam, mauris massa consequat sem, ut laoreet nisi erat et
                  lectus.Nam auctor nisi est, nec tempus lacus viverra nec.
                  Nullam cursus, neque non congue aliquam, mauris massa
                  consequat sem, ut laoreet nisi erat et lectus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="salon" className="col-padtop wow fadeInUp">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6 col-padright-none wow fadeInLeft">
              <img src="/images/main/saloon-1.jpg" alt="Saloon" />
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-padleft-none wow fadeInRight">
              <img src="/images/main/saloon-2.jpg" alt="Saloon" />
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-padleft-none wow fadeInRight">
              <img src="/images/main/saloon-3.jpg" alt="Saloon" />
            </div>
          </div>
        </div>
      </section>
      <section id="ourteam" className="wow fadeInUp">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-4">
              <h2>Meet our Expert Stylists</h2>
              <div className="ourteamd">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  pulvinar luctus est eget congue. Nam auctor nisi est, nec
                  tempus lacus viverra nec. Nullam cursus, neque non congue
                  aliquam, mauris massa consequat sem, ut laoreet nisi erat et
                  lectus. Nullam non neque eros. Pellentesque nec vulputate
                  eros.
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-8 col-lg-8">
              <div className="responsive">
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-3.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>
                  <div className="team">
                    <h3>Sara Anderson</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-1.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>
                  <div className="team">
                    <h3>Medona Johnson</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-2.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>

                  <div className="team">
                    <h3>Andria Joseph</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-1.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>
                  <div className="team">
                    <h3>Sara Anderson</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-2.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>
                  <div className="team">
                    <h3>Medona Johnson</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-3.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>

                  <div className="team">
                    <h3>Andria Joseph</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-1.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>
                  <div className="team">
                    <h3>Sara Anderson</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-3.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>
                  <div className="team">
                    <h3>Medona Johnson</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-2.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>

                  <div className="team">
                    <h3>Andria Joseph</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-3.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>
                  <div className="team">
                    <h3>Sara Anderson</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-2.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>
                  <div className="team">
                    <h3>Medona Johnson</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="third-effect">
                    <img
                      src="/images/main/out-tem-pic-1.jpg"
                      className="img-responsive"
                      alt="Our Team"
                    />
                    <div className="mask">
                      <a href="#">Facebook</a>
                      <a href="#" className="twitter">
                        Twitter
                      </a>
                    </div>
                  </div>

                  <div className="team">
                    <h3>Andria Joseph</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
      </section>
      <section id="services" className="col-padtop">
        <div className="container">
          <div className="row marbottom">
            <div className="col-sm-12 col-md-7 col-lg-5 pull-right wow fadeInUp">
              <h2>Our Services</h2>
              <p className="pull-right">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                pulvinar luctus est eget congue. Nam auctor nisi est, nec tempus
                lacus.
              </p>
            </div>
          </div>
          <div className="row marbottom wow fadeInUp">
            <div className="col-sm-12 col-md-7 col-lg-7 col-padright-none">
              <div className="subtitle">
                <h2 className="titile col-xs-offset-1 col-sm-offset-0 col-md-offset-1 ">
                  CUTTING
                </h2>
              </div>
              <img
                src="/images/main/cutting.jpg"
                className="img-responsive"
                alt="cutting"
              />
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5 col-padleft-none">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>CUT</th>
                    <th>WOMENS</th>
                    <th>MENS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Stylist</td>
                    <td>$80</td>
                    <td>$70</td>
                  </tr>
                  <tr>
                    <td>Senior Stylist</td>
                    <td>$90</td>
                    <td>$80</td>
                  </tr>
                  <tr>
                    <td>Master Stylist</td>
                    <td>$110</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>Celebrity Stylist</td>
                    <td>$POA</td>
                    <td>$POA</td>
                  </tr>
                  <tr>
                    <td>Cut</td>
                    <td>$</td>
                    <td>$</td>
                  </tr>
                  <tr>
                    <td>Cut</td>
                    <td>$</td>
                    <td>$</td>
                  </tr>
                  <tr>
                    <td>Cut</td>
                    <td>$</td>
                    <td>$</td>
                  </tr>
                  <tr>
                    <td>Cut</td>
                    <td>$</td>
                    <td>$</td>
                  </tr>
                  <tr>
                    <td>Cut</td>
                    <td>$</td>
                    <td>$</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row marbottom wow fadeInUp">
            <div className="col-sm-12 col-md-7 col-lg-7 col-padleft-none displayhide">
              <div className="subtitle">
                <h2 className="titile col-xs-offset-2">COLOUR</h2>
              </div>
              <div className="subtitle">
                <h2 className="color">COLOUR</h2>
              </div>
              <img
                src="/images/main/color.jpg"
                className="img-responsive"
                alt="Colour"
              />{" "}
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5 col-padright-none">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>COLOUR</th>
                    <th>Jnr</th>
                    <th>Snr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bigw">Permanent, Demi Gloss</td>
                    <td className="smallw">from $70</td>
                    <td>from $80</td>
                  </tr>
                  <tr>
                    <td>Colour Correction</td>
                    <td>from $90</td>
                    <td>from $110</td>
                  </tr>
                  <tr>
                    <td>Fashion Foiling</td>
                    <td>from $75</td>
                    <td>from $85</td>
                  </tr>
                  <tr>
                    <td>Tint roots</td>
                    <td>$75</td>
                    <td>$85</td>
                  </tr>
                  <tr>
                    <td>Tint and foils</td>
                    <td>$110</td>
                    <td>$120</td>
                  </tr>
                  <tr>
                    <td>Half Head - Short</td>
                    <td>from $120</td>
                    <td>from $130</td>
                  </tr>
                  <tr>
                    <td>Half Head - Long</td>
                    <td>from $150</td>
                    <td>from $170</td>
                  </tr>
                  <tr>
                    <td>Full Head - Short</td>
                    <td>from $160</td>
                    <td>from $180</td>
                  </tr>
                  <tr>
                    <td>Full Head - Long</td>
                    <td>from $220</td>
                    <td>from $250</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-sm-12 col-md-7 col-lg-7 col-padleft-none displayvisible">
              <div className="subtitle">
                <h2 className="titile col-xs-offset-2">COLOUR</h2>
              </div>
              <img
                src="/images/main/color.jpg"
                className="img-responsive"
                alt="Colour"
              />{" "}
            </div>
          </div>
          <div className="row wow fadeInUp">
            <div className="col-sm-12 col-md-7 col-lg-7 col-padright-none">
              <div className="subtitle">
                <h2 className="titile col-xs-offset-1">STYLE</h2>
              </div>
              <img
                src="/images/main/style.jpg"
                className="img-responsive"
                alt="Style"
              />{" "}
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5 col-padleft-none">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>STYLE</th>
                    <th>PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Blowdrying - Short</td>
                    <td>$60</td>
                  </tr>
                  <tr>
                    <td>Blowdrying - Medium</td>
                    <td>$70</td>
                  </tr>
                  <tr>
                    <td>Blowdrying - Long</td>
                    <td>$80</td>
                  </tr>
                  <tr>
                    <td>Formals</td>
                    <td>$130</td>
                  </tr>
                  <tr>
                    <td>Bride</td>
                    <td>$180</td>
                  </tr>
                  <tr>
                    <td>Style</td>
                    <td>$</td>
                  </tr>
                  <tr>
                    <td>Style</td>
                    <td>$</td>
                  </tr>
                  <tr>
                    <td>Style</td>
                    <td>$</td>
                  </tr>
                  <tr>
                    <td>Style</td>
                    <td>$</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section id="appoinment" className="col-padtop wow fadeInUp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="appoimentbg">
                <div className="col-sm-12 col-md-9 col-lg-8">
                  <h2>make an appointment</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    pulvinar luctus est eget congue. Nam auctor nisi est, nec
                    tempus lacus viverra nec.
                  </p>
                </div>
                <div className="clearfix"></div>
                <div className="appfrm">
                  <div id="SuccessMessage"></div>
                  <div id="ErrorMessage"></div>
                  <form name="AppointmentFrm" id="AppointmentFrm" method="post">
                    <div className="col-sm-12 col-md-8 col-lg-7 appfrmleft">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          name="AppointmentFullName"
                          id="AppointmentFullName"
                          className="form-control required"
                        />
                      </div>
                      <div className="form-group mt-right0">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control required email"
                          name="AppointmentEmail"
                          id="AppointmentEmail"
                        />
                      </div>
                      <div className="form-group pull-left">
                        <label>Contact Number</label>
                        <input
                          type="text"
                          name="AppointmentContactNumber"
                          id="AppointmentContactNumber"
                          className="form-control required number"
                        />
                      </div>
                      <div className="form-group mt-right0">
                        <div className="input-append dateinput">
                          <label className="control-label">Date</label>
                          <div className="desktopdate">
                            <input
                              type="text"
                              className="form-control required"
                              name="AppointmentDate"
                              id="datePicker"
                            />
                          </div>
                          <div className="mobiledate">
                            <input
                              type="date"
                              className="form-control required"
                              name="AppointmentMobileDate"
                            />
                          </div>
                        </div>
                        <div className="time">
                          <label>Time</label>
                          <select name="AppointmentTime" id="AppointmentTime">
                            <option selected>Select</option>
                            <option>11:00am</option>
                            <option>12:00pm</option>
                            <option>01:00pm</option>
                            <option>02:00pm</option>
                            <option>03:00pm</option>
                            <option>04:00pm</option>
                            <option>05:00pm</option>
                            <option>06:00pm</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-5 appfrmright">
                      <div className="form-group textarea">
                        <label className="control-label">Description</label>
                        <textarea
                          className="form-control"
                          name="AppointmentMessage"
                          rows="5"
                          id="AppointmentMessage"
                        ></textarea>
                      </div>
                      <div className="submitbtn">
                        <button
                          type="submit"
                          className="btn btn-default"
                          value="Submit"
                        >
                          SUBMIT
                        </button>
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
      <section className="excellence wow fadeInUp">
        <div id="parallax-2" className="parallax fixed fixed-desktop">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-5 col-lg-5 pull-right col-pad5 bg-white">
                <h2>Expression of Excellence</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  pulvinar luctus est eget congue. Nam auctor nisi est, nec
                  tempus lacus viverra nec. Nullam cursus, neque non congue
                  aliquam, mauris massa consequat sem, ut laoreet nisi erat et
                  lectus. Nullam non neque eros. Pellentesque nec vulputate
                  eros. Integer scelerisque lorem id massa accumsan, ut faucibus
                  ante suscipit. Nunc tincidunt et ligula vitae pharetra.
                </p>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </section>
      <section id="gallery">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>Proud portfolio</h2>
            </div>
            <div className="col-lg-12 filter">
              <ul>
                <li>
                  <a href="#" data-filter="*" className="active">
                    All
                  </a>
                </li>
                <li>
                  <a href="#" data-filter=".Wcut">
                    Cutting
                  </a>
                </li>
                <li>
                  <a href="#" data-filter=".coloring">
                    Coloring
                  </a>
                </li>
                <li>
                  <a href="#" data-filter=".Hspa">
                    Conditioning
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-fancybox-group="manucuring"
                    data-filter=".manucuring"
                  >
                    Manicuring
                  </a>
                </li>
                <li>
                  <a href="#" data-filter=".Bspa">
                    Styling
                  </a>
                </li>
              </ul>
            </div>
            <div className="clearfix"></div>
            <div className="portfoliodiv">
              <div className="col-25 coloring manucuring">
                {" "}
                <a
                  className="fancybox"
                  href="/images/main/1.jpg"
                  data-fancybox-group="gallery"
                >
                  <div className="hover">
                    <img src="/images/main/2.jpg" alt="Portfolio" />
                    <div className="mask-img">
                      <div className="hvrlink">
                        <h3>Cut</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing
                          industry.
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-25 Wcut manucuring">
                {" "}
                <a
                  className="fancybox"
                  href="/images/main/1.jpg"
                  data-fancybox-group="gallery"
                >
                  <div className="hover">
                    <img src="/images/main/1.jpg" alt="Portfolio" />
                    <div className="mask-img">
                      <div className="hvrlink">
                        <h3>Style</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing
                          industry.
                        </p>
                      </div>
                    </div>
                  </div>
                </a>{" "}
              </div>
              <div className="col-25 coloring Hspa">
                {" "}
                <a
                  className="fancybox"
                  href="/images/main/3.jpg"
                  data-fancybox-group="gallery"
                >
                  <div className="hover">
                    <img src="/images/main/3.jpg" alt="Portfolio" />
                    <div className="mask-img">
                      <div className="hvrlink">
                        <h3>Cut</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing
                          industry.
                        </p>
                      </div>
                    </div>
                  </div>
                </a>{" "}
              </div>
              <div className="col-25 Wcut">
                {" "}
                <a
                  className="fancybox"
                  href="/images/main/4.jpg"
                  data-fancybox-group="gallery"
                >
                  <div className="hover">
                    <img src="/images/main/4.jpg" alt="Portfolio" />
                    <div className="mask-img">
                      <div className="hvrlink">
                        <h3>Style</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing
                          industry.
                        </p>
                      </div>
                    </div>
                  </div>
                </a>{" "}
              </div>
              <div className="col-25 coloring">
                {" "}
                <a
                  className="fancybox"
                  href="/images/main/5.jpg"
                  data-fancybox-group="gallery"
                >
                  <div className="hover">
                    <img src="/images/main/5.jpg" alt="Portfolio" />
                    <div className="mask-img">
                      <div className="hvrlink">
                        <h3>Cut</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing
                          industry.
                        </p>
                      </div>
                    </div>
                  </div>
                </a>{" "}
              </div>
              <div className="col-25 Bspa">
                {" "}
                <a
                  className="fancybox"
                  href="/images/main/6.jpg"
                  data-fancybox-group="gallery"
                >
                  <div className="hover">
                    <img src="/images/main/6.jpg" alt="Portfolio" />
                    <div className="mask-img">
                      <div className="hvrlink">
                        <h3>Style</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing
                          industry.
                        </p>
                      </div>
                    </div>
                  </div>
                </a>{" "}
              </div>
              <div className="col-25 Bspa">
                {" "}
                <a
                  className="fancybox"
                  href="/images/main/6.jpg"
                  data-fancybox-group="gallery"
                >
                  <div className="hover">
                    <img src="/images/main/6.jpg" alt="Portfolio" />
                    <div className="mask-img">
                      <div className="hvrlink">
                        <h3>Cut</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing
                          industry.
                        </p>
                      </div>
                    </div>
                  </div>
                </a>{" "}
              </div>
              <div className="col-25">
                {" "}
                <a
                  className="fancybox"
                  href="/images/main/7.jpg"
                  data-fancybox-group="gallery"
                >
                  <div className="hover">
                    <img src="/images/main/7.jpg" alt="Portfolio" />
                    <div className="mask-img">
                      <div className="hvrlink">
                        <h3>Style</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing
                          industry.
                        </p>
                      </div>
                    </div>
                  </div>
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="promotions" className="col-padtop wow fadeInUp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bg-gray">
                <h2 className="text-center">Promotions and Specials</h2>
                <div className="col-sm-12 col-lg-12">
                  <div
                    id="myCarousel-1"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner" role="listbox">
                      <div className="item active">
                        <div className="img-right">
                          <img
                            src="/images/main/P-slide-2.jpg"
                            alt="First slide"
                            className="img-responsive"
                          />
                        </div>
                        <div className="col-pad4 gbg-white">
                          <h4>Free hair treatment</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed pulvinar luctus est eget congue. Nam
                            auctor nisi est, nec tempus lacus viverra nec.
                            Nullam cursus, neque non congue aliquam, mauris
                            massa consequat sem, ut laoreet nisi erat et lectus.
                          </p>
                        </div>
                      </div>
                      <div className="item">
                        <div className="img-right">
                          <img
                            src="/images/main/P-slide-1.jpg"
                            alt="First slide"
                            className="img-responsive"
                          />
                        </div>
                        <div className="gbg-white col-pad4">
                          <h4>Monday Makeup</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed pulvinar luctus est eget congue. Nam
                            auctor nisi est, nec tempus lacus viverra nec.
                            Nullam cursus, neque non congue aliquam, mauris
                            massa consequat sem, ut laoreet nisi erat et lectus.
                          </p>
                        </div>
                      </div>
                      <div className="item">
                        <div className="img-right">
                          <img
                            src="/images/main/P-slide-3.jpg"
                            alt="First slide"
                            className="img-responsive"
                          />
                        </div>
                        <div className="gbg-white col-pad4">
                          <h4>Happy Hair</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed pulvinar luctus est eget congue. Nam
                            auctor nisi est, nec tempus lacus viverra nec.
                            Nullam cursus, neque non congue aliquam, mauris
                            massa consequat sem, ut laoreet nisi erat et lectus.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-control">
                      {" "}
                      <a
                        className="left"
                        href="#myCarousel-1"
                        role="button"
                        data-slide="prev"
                      ></a>{" "}
                      <a
                        className="right"
                        href="#myCarousel-1"
                        role="button"
                        data-slide="next"
                      ></a>{" "}
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="video" className="col-padtop wow fadeInUp">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-lg-8">
              <div className="responsive-object">
                <iframe src="https://www.youtube.com/embed/idjnjfPbRSg?rel=0&amp;controls=0&amp;showinfo=0"></iframe>
              </div>
            </div>
            <div className="col-md-5 col-lg-4 pull-right">
              <h2>Showreel</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                pulvinar luctus est eget congue. Nam auctor nisi est, nec tempus
                lacus viverra nec. Nullam cursus, neque non congue aliquam,
                mauris massa consequat sem, ut laoreet nisi erat et lectus.
                Nullam non neque eros. Pellentesque nec vulputate eros. Integer
                scelerisque lorem id massa accumsan, ut faucibus ante suscipit.
                Nunc tincidunt et ligula vitae pharetra. Fusce ut lobortis
                augue, eget volutpat felis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonialdiv wow fadeInUp">
        <div className="container">
          <div className="testimonilabg">
            <h2>Testimonials</h2>
            <div
              id="myCarousel-2"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner" role="listbox">
                <div className="item active">
                  <div className="img-left">
                    <img
                      src="/images/main/user-icon.jpg"
                      alt="Testimonial"
                      className="img-responsive"
                    />
                  </div>
                  <div className="col-pad4 tbg-white">
                    <h4>Free hair treatment</h4>
                    <h6>Advertising Model</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus viverra nec. Nullam cursus, neque non
                      congue aliquam, mauris massa consequat sem, ut laoreet
                      nisi erat et lectus.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="img-left">
                    <img
                      src="/images/main/user-icon.jpg"
                      alt="Testimonial"
                      className="img-responsive"
                    />
                  </div>
                  <div className="col-pad4 tbg-white">
                    <h4>Monday Makeup</h4>
                    <h6>Advertising Model</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus viverra nec. Nullam cursus, neque non
                      congue aliquam, mauris massa consequat sem, ut laoreet
                      nisi erat et lectus.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="img-left">
                    <img
                      src="/images/main/user-icon.jpg"
                      alt="Testimonial"
                      className="img-responsive"
                    />
                  </div>
                  <div className="col-pad4 tbg-white">
                    <h4>Free hair treatment</h4>
                    <h6>Advertising Model</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus viverra nec. Nullam cursus, neque non
                      congue aliquam, mauris massa consequat sem, ut laoreet
                      nisi erat et lectus.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="img-left">
                    <img
                      src="/images/main/user-icon.jpg"
                      alt="Testimonial"
                      className="img-responsive"
                    />
                  </div>
                  <div className="col-pad4 tbg-white">
                    <h4>Monday Makeup</h4>
                    <h6>Advertising Model</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed pulvinar luctus est eget congue. Nam auctor nisi est,
                      nec tempus lacus viverra nec. Nullam cursus, neque non
                      congue aliquam, mauris massa consequat sem, ut laoreet
                      nisi erat et lectus.
                    </p>
                  </div>
                </div>
              </div>
              <div className="carousel-control">
                {" "}
                <a
                  className="left"
                  href="#myCarousel-2"
                  role="button"
                  data-slide="prev"
                ></a>{" "}
                <a
                  className="right"
                  href="#myCarousel-2"
                  role="button"
                  data-slide="next"
                ></a>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="wow fadeInUp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Contact</h2>
            </div>
            <div className="col-sm-12 col-md-8 col-lg-8">
              <div className="contactmap">
                <div className="mapcont">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25216.227802888236!2d144.956981!3d-37.812802!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4e793770d3%3A0x9e44d6ad0d76ba7c!2s121+King+St%2C+Melbourne+VIC+3000%2C+Australia!5e0!3m2!1sen!2sus!4v1429013152809"
                    style={{ border: "0px" }}
                  ></iframe>
                </div>
                <div className="social">
                  <p>121 King Street, Melbourne Victoria 3000 Australia</p>
                  <span>Phone - +61 0 0000 0000s </span>{" "}
                  <span>
                    Email -{" "}
                    <a href="mailto:info@websitec.com">info@blackair.com</a>
                  </span>
                  <div className="social-icon">
                    {" "}
                    <a href="#" className="facebook"></a>{" "}
                    <a href="#" className="twitter"></a>{" "}
                    <a href="#" className="google"></a>{" "}
                    <a href="#" className="youtube"></a>{" "}
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4 pull-right">
              <div id="ContactSuccessMessage"></div>
              <div id="ContactErrorMessage"></div>
              <form name="ContactForm" id="ContactForm" method="post">
                <div className="form-group pull-left">
                  <input
                    type="text"
                    className="form-control required"
                    name="ContactFullName"
                    id="ContactFullName"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group pull-left marright0">
                  <input
                    type="email"
                    className="form-control required email"
                    name="ContactEmail"
                    id="ContactEmail"
                    placeholder="Email Id"
                  />
                </div>
                <div className="form-group pull-left">
                  <input
                    type="text"
                    className="form-control required number"
                    name="ContactNumber"
                    id="ContactNumber"
                    placeholder="Conatct Number"
                  />
                </div>
                <div className="form-group pull-left marright0">
                  <input
                    type="text"
                    className="form-control required"
                    name="ContactCompanyName"
                    id="ContactCompanyName"
                    placeholder="Company Name"
                  />
                </div>
                <div className="textarea pull-left">
                  <textarea
                    placeholder="Description"
                    name="ContactDescription"
                    id="ContactDescription"
                    className="form-control"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-default"
                  value="Submit"
                >
                  SUBMIT
                </button>
              </form>
              <div className="coypright">
                <p>&copy; Website 2015</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <a href="#" className="scrollup">
        Top
      </a>
    </div>
  );
}


export default IndexPage