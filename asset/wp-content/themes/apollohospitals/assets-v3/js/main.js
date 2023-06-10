// JavaScript Document
jQuery(document).ready(function($){ 
	"use strict"
	$('.btn-quick-callcta').attr('id', 'cta_Call_Us_Now');

	$(".auto-complete-search-desk").keydown(function() {
	    search_merge_filter();
	});
	$(".auto-complete-search-desk").keyup(function() {
	    search_merge_filter();
	});

	$(".auto-complete-search-mob").keydown(function() {
	    search_merge_filter();
	});
	$(".auto-complete-search-mob").keyup(function() {
	    search_merge_filter();
	});

	$( ".ap-nav ul.prmry-nav > li > a" ).click(function() {
    	//$( ".pure-css .sub-menu" ).toggle();
    	$(".pure-css .sub-menu").hide();
    	$(this).parent().children("ul").toggle();
	});


	$('body').on('click','.coe-tab-nav', function(e) {
		e.preventDefault();
		$('.coe-tab-nav').removeClass('active');
		$(this).addClass('active');

		var id = $(this).data('tab-id');
		$(".coe-tab").hide();
		$(id).show();
	});


	 
	  $('body').on('click','#menu-main-menu li a .arrow', function(e) {
		
	      if ($(window).width() < 1025) {
	      		
	      	   // console.log("Has children");
		        if($(this).closest("li").children("ul").length) {
		        	$(this).parent().toggleClass('expanded');
		        	$(this).parent().parent().toggleClass('active-menu');
			         e.preventDefault();
			    }
		  }
	});

	if ($(window).width() < 1025) {

	  	$('#menu-main-menu > li.menu-item-has-children > a').append('<i class="fa fa-caret-right arrow" aria-hidden="true"></i>');
	  	$('#menu-main-menu > li li.menu-item-has-children > a').append('<i class="fa fa-caret-right arrow" aria-hidden="true"></i>');
	}
	/*
	* End Menu Function
	*/

	if($('.counter-holder').length){
		$('.counter-holder').counterUp({

			delay: 5,

			time: 500

		});
	}

	function search_merge_filter() {

	    var key = $(".auto-complete-search-desk").val();
	    var key2 = $(".auto-complete-search-mob").val();

	    if(key==""){
	    	key = key2;
	    }

	    if (key == "") {
	        $(".ajax-search-result").html("");
	    } else {

	        //alert(key);
	        //return false;

	        $.ajax({
	            type: "POST",
	            dataType: "json",
	            url: ajax_vars.ajaxurl,
	            data: {
	                action: "apollo_ajax_search",
	                key: key
	            },
	            success: function(response) {

	                console.log(response);
	                $("#ajax-search-result").show().html(response.list);
	                $("#ajax-search-result-mob").show().html(response.list);

	                // if(response.response){

	                //   $(".lead_city").html(response.cities);

	                // }else{

	                // }

	            }
	        });
	    }

	    return false;

	}

	$('body').on('click', '.timeline li span', function(e) {
	    e.preventDefault();

	    var id = $(this).data('target');

	    //alert(id);

	    $(id).toggleClass('show');

	});

	/*
	* Ask A Question
	*/
	$('body').on('click','#btn-ask-qsn',function(e){
	   var qsn = $('#field-ask-qsn').val();
	   //alert(qsn);
	   $("#topic_name").val(qsn);
	    

	  // $('#ask_que_popup').modal('toggle');
		$('#ask_que_popup').modal('show');
		//$('#ask_que_popup').modal('hide');

	});

	$('body').click(function() {
	    $('.ajax-search-result').empty().hide('');

	});
	if($("#main-banner-slider").length){
		 $('#main-banner-slider').owlCarousel({
		      loop:false,
		    margin:10,
		    nav:true,
		    autoHeight: true,
		    pagination:true,
		    responsive:{
		        0:{
		            items:1
		        },
		        600:{
		            items:1
		        },
		        1000:{
		            items:1
		        }
		    }
		});
	}
	if($(".testimonail-slider").length){
		 $('.testimonail-slider').owlCarousel({
		    loop:false,
		    margin:10,
		    nav:true,
		    autoHeight: true,
		    pagination:true,
		    responsive:{
		        0:{
		            items:1
		        },
		        600:{
		            items:2
		        },
		        1000:{
		            items:3
		        }
		    }
		});
	}


	if($(".featured-news-slider").length){
		
		 $('.featured-news-slider').owlCarousel({
		    loop:false,
		    margin:10,
		    nav:false,
		    pagination:true,
		    responsive:{
		        0:{
		            items:1
		        },
		        600:{
		            items:1
		        },
		        1000:{
		            items:1
		        }
		    }
		});
	}




	$('body').on('click', '.hsptl-locations .col a', function(e) {
	    e.preventDefault();
	    $(".hsptl-locations .col a").removeClass('active');
	    $(this).addClass('active');
	    var hospitals_id = jQuery(this).data('hospital-id');
	     $.ajax({
	          type : "POST",
	          dataType : "json",
	          url : ajax_vars.ajaxurl,
	          data : {
	              action: "module_get_hospital_info",
	              id:hospitals_id,
	              
	             
	               },
	          success: function(response) {
					
	              //console.log(response);
	            //alert(response);
	              	$("#hospital-loc-holder").html(response);
	          }
	      }); 
	});

	$('body').on('click','.btn-quick-book-popup-form', function(e) {
		$('.btn-quick-book-popup').trigger('click');
	});
	jQuery('body').on('click', '.btn-quick-book-popup', function(e) {
        e.preventDefault();
         smartech('dispatch', 'AH_Organic_Book Appointment', {});

        jQuery('.quickbook-widget').show();
     })

     jQuery('body').on('click', '.btn-close-quick-book', function(e) {
        e.preventDefault();
        jQuery('.quickbook-widget').hide();
     })
	 /*
	 * Send OTP
     */
     $(document).on('click','.form-quickbook .btn-send-otp-q', function(){
    
       // var lead_phone = $('#quickBook2 #lead_phone').val();

       	//alert(lead_phone);

       	$(this).attr('disabled', true);
        var lead_city_name = $('#quickBook2 .lead_city_name').val();
            var lead_name = $('#quickBook2 .lead_name').val();
            var lead_email = $('#quickBook2 .lead_email').val();
            var lead_phone = $('#quickBook2 #lead_phone').val();
            var category = $( "#quickBook2 .form-check-input :checked" ).val();

            smartech('contact', '772', {
            'pk^mobile': lead_phone,
            'email': lead_email,
            'NAME': lead_name,
            'CATEGORY': category,
            'CITY': lead_city_name
            });
            smartech('identify', lead_phone);
            smartech('dispatch', 'AH_Send OTP', {
            'mobile': lead_phone,
            'email': lead_email,
            'name': lead_name,
            'Category': category,
            'city':lead_city_name
            });
        
         $.ajax({
              type : "POST",
              dataType : "json",
              url : ajax_vars.ajaxurl,
              data : {
              		 action: "ajax_send_otp_verification_2",
                     lead_phone:lead_phone
              },
              success: function(response) {
                
                  console.log(response);
                  	$(".form-quickbook .btn-send-otp-q").attr('disabled', false);
	             if(response.response==true){
                    $(".form-quickbook .btn-send-otp-q").html("Resend OTP");
                    //alert(response.message);
                    $('.form-quickbook .otp-message').html(response.message);
                    $('.form-quickbook .otp-container').show();
                    
                    $(".form-quickbook #btn-submit-quick-request").attr('disabled', false);

                    $(".form-quickbook #btn-submit-quick-request").removeClass('disable');

                }else{
                    $(".form-quickbook #btn-submit-quick-request").attr('disabled', true);
                    //$('.lead_res').html(response.message);
                    alert(response.message);
                    $('.form-quickbook .otp-container').hide();
                    $('.form-quickbook '+response.focus).focus();

                }    
	                   
              },
              error: function(errorThrown) {
                    
              }
          }); 
        
    });

     jQuery("body").on('click','#btn-submit-quick-request',function(e){
            e.preventDefault();
             jQuery("#btn-submit-quick-request").addClass('disable');
            jQuery(this).html('Processing...');
            $(this).attr('disabled', true);
            jQuery(".form-quickbook .form-check-input").removeClass('err-border');
            jQuery(".form-quickbook .lead_city").removeClass('err-border');
            jQuery(".form-quickbook .form-control").removeClass('err-border');

            var lead_city_name = $('#quickBook2 .lead_city_name').val();
            var lead_name = $('#quickBook2 .lead_name').val();
            var lead_email = $('#quickBook2 .lead_email').val();
            var lead_phone = $('#quickBook2 #lead_phone').val();
            var category = $( "#quickBook2 .form-check-input :checked" ).val();

            smartech('contact', '773', {
            'pk^mobile': lead_phone,
            'email': lead_email,
            'NAME': lead_name,
            'CATEGORY': category,
            'CITY': lead_city_name
            });
            smartech('identify', lead_phone);
            smartech('dispatch', 'AH_Submit Request', {
            'mobile': lead_phone,
            'email': lead_email,
            'name': lead_name,
            'Category': category,
            'city':lead_city_name
            });
     
            $.ajax({
                type : "POST",
              	dataType : "json",
              	url : ajax_vars.ajaxurl,
                
                data: jQuery("#quickBook2").serialize(),
                success: function(data) {
                    console.log(data);
                     jQuery(".form-quickbook #btn-submit-quick-request").removeClass('disable');
                     $(".form-quickbook #btn-submit-quick-request").attr('disabled', true);
                    if(data.response==true){
                        alert(data.message);
                        jQuery(".form-quickbook")[0].reset();
                        jQuery('.form-quickbook .otp-container').hide();
                         jQuery('.quickbook-widget').hide();
                         $(".form-quickbook .btn-send-otp-q").html("Send OTP");
                        //window.location.href = "https://dev.apollohospitals.com/thank-you";
                    }else{
                        if(data.class=="otp_invalid_field"){
                            alert(data.message);
                        }else{
                            jQuery(data.class).addClass('err-border');
                        }
                    }
                    
                    jQuery("#btn-submit-quick-request").html('Submit Request');
                    
                    //console.log("Finished");
                },
                error: function(errorThrown) {
                    
                }
            });


        });


});

jQuery(document).on('click','#btn-subscribe-newsletter',function(e){
		e.preventDefault();

        var form_id = jQuery(this).parent().data('form');
         $.ajax({
              type : "POST",
              dataType : "json",
              url : ajax_vars.ajaxurl,
              data : {
                  action: "newsLetterSubscription",
                  email:$("#form-subscribe-news-letter #userEmail").val(),
                  page_url:$("#form-subscribe-news-letter #pageURL").val(),
                 
                 
                   },
              success: function(response) {
					$('.response-n').attr('class','response-n');
					$('.response-n').addClass(response.msg_class)
                  console.log(response);
                  $(".response-n").html(response.message);
                  if(response.response){
                    
                    $("#form-subscribe-news-letter")[0].reset();
                   
                  }
                  
                  
              }
          }); 



    });
