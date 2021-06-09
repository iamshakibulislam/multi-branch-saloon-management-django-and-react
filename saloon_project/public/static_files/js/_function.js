// JavaScript Document
/* all function in this Js file
	Pagescroll
	Main slider
	Parallax
	Carousel Mini Slider
	Responsive Mobile Menu
	Gellery Portolio
	Date Picker
	Form Validation
	
 */

$(document).ready(function () {
	'use strict';
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
    	
		$('body').on('click', '.page-scroll a', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		
		});
	});
	
	//Main slider fuction
	$('.carousel').carousel({
  		interval: 3000
		
	})
	
	// Parallaxe  function
	$('#parallax-2').parallax("50%",0.5);
	
	// Carousel mini slider function
	$('.responsive').slick({
	  dots: false,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 3,
	  slidesToScroll: 3,
	  responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			dots: true
		  }
		},
		{
		  breakpoint: 768,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			dots: true
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 2
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		}
	  ]
	});	
			
	// mobile menu function		
 		$("#mobile-menu").mobileMenu({
                MenuWidth: 250,
                SlideSpeed : 300,
                WindowsMaxWidth : 767,
                PagePush : true,
                FromLeft : false,
                Overlay : true,
                CollapseMenu : true,
                ClassName : "mobile-menu"
            });	
			
		// Gellery Portfolio function		
		$('.fancybox').fancybox();
		// Gellery function end	
		
		//date picker function
			$('#datePicker').datepicker({
            			format: 'dd/mm/yyyy',
						autoclose: true,
						clearBtn: true,
						todayHighlight: true
        	})
      	.on('changeDate', function(e) {
   
            // Revalidate the date field
            $('#defaultForm').bootstrapValidator('revalidateField', 'date');
        });


	//form Validation function
	/*var form = $(this); 
	var post_url = form.attr('action'); */
	$('#defaultForm').bootstrapValidator({
	    //live: 'disabled',
        message: 'This value is not valid',
        fields: {
            name: {
                row: '.appname',
                validators: {
                    notEmpty: {
                        message: 'This field is required'
                    }
                }
            },
            email: {
				validators: {
					notEmpty: {
                        message: 'This field is required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
			phone: {
				validators: {
					notEmpty: {
                        message: 'This field is required'
                    },
                    digits: {
                        message: 'The value can contain only digits'
                    }
                }
            },
			date: {
                validators: {
                    notEmpty: {
                        message: 'The date is required'
                    },
                    dateinput: {
                        format: 'DD/MM/YYYY',
                        message: 'The date DD/MM/YYYY'
                    }
                }
            },
			inputdate: {
                validators: {
                    notEmpty: {
                        message: 'The date is required'
                    },
                    dateformat: {
                        format: 'MM/DD/YYYY',
                        message: 'The date MM/DD/YYYY'
                    }
                }
            }
		},
		
		
		//////////////
		submitHandler: function(){
			var dataString = $("form#defaultForm").serialize();
			$.ajax({
			type: "POST",
			url: "http://lithemes.com/projects/wordpress/blackair/wp-content/themes/mytheme/send.php",
			cache: false,
			data: dataString,
			success:function(data)
			{	alert (data);
				if(data==1)
				{	 
					$("#ContactSuccessMessage").slideDown(2500);
					$("#ContactSuccessMessage").html("<strong>Success!</strong> Your message has been sent to us.");
					document.getElementById("ContactSuccessMessage").style.color='#FF0000';
					return false;
				}
				else
				{
					
				$("#ContactErrorMessage").slideDown(2500);
				$("#ContactErrorMessage").html("<strong>Error!</strong> There was an error sending your message.");
				document.getElementById("ContactErrorMessage").style.color='#FF0000';
					return false;
				}
			},
			
		}); 
		return false;
		}
		//////////////
  });
   
  
	//Contact Form 
	//$("#defaultForm").validate({
	/*$("#defaultForm").bootstrapValidator({
		errorElement: "p",
		submitHandler: function(){
			var dataString = $("form#defaultForm").serialize();
			$.ajax({
			type: "POST",
			url: "http://lithemes.com/projects/wordpress/blackair/wp-content/themes/mytheme/send.php",
			cache: false,
			data: dataString,
			success:function(data)
			{	alert (data);
				if(data==1)
				{	 
					$("#ContactSuccessMessage").slideDown(2500);
					$("#ContactSuccessMessage").html("<strong>Success!</strong> Your message has been sent to us.");
					document.getElementById("ContactSuccessMessage").style.color='#FF0000';
					return false;
				}
				else
				{
					
				$("#ContactErrorMessage").slideDown(2500);
				$("#ContactErrorMessage").html("<strong>Error!</strong> There was an error sending your message.");
				document.getElementById("ContactErrorMessage").style.color='#FF0000';
					return false;
				}
			},
			
		}); 
		return false;
		}
	});*/
	//Contact Form 
	   	//contact form function
		$('#contactfrm').bootstrapValidator({

        message: 'This value is not valid',
        fields: {
            inputName: {
                validators: {
                    notEmpty: {
                        message: 'This field is required'
                    }
                }
            },
            inputEamil: {
				
                validators: {
					notEmpty: {
                        message: 'This field is required'
                    },
                    emailAddress: {
                        message: 'email address Not valid'
                    }
                }
            },
			inputcontact: {
			    validators: {
					notEmpty: {
                        message: 'This field is required'
                    },
                    digits: {
                        message: 'The value digits only'
                    }
                }
            },
			cname: {
                validators: {
					notEmpty: {
                        message: 'This field is required'
                    }
                    
                }
            }
			
		},
		
		
		//////////////
		submitHandler: function(){
			var dataString = $("form#contactfrm").serialize();
			$.ajax({
			type: "POST",
			url: "http://lithemes.com/projects/wordpress/blackair/wp-content/themes/mytheme/send.php",
			cache: false,
			data: dataString,
			success:function(data)
			{	alert (data);
				if(data==1)
				{	 
					$("#ContactSuccessMessage").slideDown(2500);
					$("#ContactSuccessMessage").html("<strong>Success!</strong> Your message has been sent to us.");
					document.getElementById("ContactSuccessMessage").style.color='#FF0000';
					return false;
				}
				else
				{
					
				$("#ContactErrorMessage").slideDown(2500);
				$("#ContactErrorMessage").html("<strong>Error!</strong> There was an error sending your message.");
				document.getElementById("ContactErrorMessage").style.color='#FF0000';
					return false;
				}
			},
			
		}); 
		return false;
		}
		//////////////

		
    }); 
	
});