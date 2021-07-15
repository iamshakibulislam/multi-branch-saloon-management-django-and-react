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
		//.on('changeDate', function(e) {
		// Revalidate the date field
		//$('#AppointmentForm').bootstrapValidator('revalidateField', 'date');
		.on('change', function() {
        $('#datePicker').valid();  // triggers the validation test on change

	});
	
	////AppointmentForm//////////
	$("#AppointmentFrm").validate({
		errorElement: "p",
		submitHandler: function(){
			var dataString = $("form#AppointmentFrm").serialize();
			$.ajax({
			type: "POST",
			url: "appointmentsend.php",
			cache: false,
			data: dataString,
			success:function(data)
			{	
				if(data==1)
				{	
					$("#SuccessMessage").slideDown(500);
					$("#SuccessMessage").html("<div class='alert alert-success'><strong>Success!</strong> Your message has been sent to us.</div>");
					//document.getElementById("SuccessMessage").style.color='#FF0000';
					//document.getElementById('AppointmentFrm').reset();
					$("#AppointmentFrm")[0].reset();
					return false;
					
				}
				else
				{
					$("#ErrorMessage").slideDown(500);
					$("#ErrorMessage").html("<div class='alert alert-danger'><strong>Error!</strong> There was an error sending your message.</div>");
					//document.getElementById("ErrorMessage").style.color='#FF0000';
					//document.getElementById('AppointmentFrm').reset();
					$("#AppointmentFrm")[0].reset();
					return false;
					
				}
			},
			
		}); 
		return false;
		}
	});
	///AppointmentForm///////////

	//////ContactForm////////
	$("#ContactForm").validate({
		errorElement: "p",
		submitHandler: function(){
			var dataString = $("form#ContactForm").serialize();
			$.ajax({
			type: "POST",
			url: "contactsend.php",
			cache: false,
			data: dataString,
			success:function(data)
			{	
				if(data==1)
				{	 
					$("#ContactSuccessMessage").slideDown(500);
					$("#ContactSuccessMessage").html("<div class='alert alert-success'><strong>Success!</strong> Your message has been sent to us.</div>");
					//document.getElementById("ContactSuccessMessage").style.color='#FF0000';
					$("#ContactForm")[0].reset();
					return false;
				}
				else
				{
					$("#ContactErrorMessage").slideDown(500);
					$("#ContactErrorMessage").html("<div class='alert alert-danger'><strong>Error!</strong> There was an error sending your message.</div>");
					//document.getElementById("ContactErrorMessage").style.color='#FF0000';
					$("#ContactForm")[0].reset();
					return false;
				}
			},
			
		}); 
		return false;
		}
	});
	
	// portfolio 4 page function
	$(window).load(function(){
	var $container = $('.blogmasonary');
    $container.isotope({
        layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: true
        }
    });
	
	
	var $container = $('.portfoliodiv');
    $container.isotope({
        filter: '*',
		layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: true
        }
    });
	 
    $('.filter ul li a').click(function(){
        $('.filter .active').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
		if(selector=="*") $(selector).children("a.fancybox").attr("data-fancybox-group","gallery" );
		else	$(selector).children("a.fancybox").attr("data-fancybox-group",selector.substring(1) );
				
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                queue: false
            }
         });
		 
		 
		  
       
         return false;
    }); 
	
	});
	// animation
	 
	 
	
	 
	//scroll top function
	$(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
	
});
 $(window).load(function() {
	 
	 new WOW().init();
	 });   
 //hide all the div containers inside div with id=accordion  
       
