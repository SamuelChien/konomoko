;(function($){

	"use strict";

	$(document).ready(function(){

		/* ------------------------------------------------
				Flaxslider
		------------------------------------------------ */

			if($('.main_slider').length){
				$('.main_slider').flexslider({
					animation: "fade",
					controlNav: true,
					pauseInvisible: false
				});
			}

        /* ------------------------------------------------
				End of Flaxslider
		------------------------------------------------ */

		/* ------------------------------------------------
				flipster-master
		------------------------------------------------ */

			if($('.flipster').length){

				$('.flipster').flipster({
					style: 'carousel',
					spacing: -0.6,
					loop: true
				});
			
			}

        /* ------------------------------------------------
				End of flipster-master
		------------------------------------------------ */

		/* ------------------------------------------------
				owlCarousel
		------------------------------------------------ */

			if($('.reviews_slider').length){

				$('.reviews_slider').owlCarousel({
				    nav:true,
				    loop:true,
				    margin: 30,
				    autoHeight: true,
				    navText: [ '', '' ],
				    responsive:{
				        0:{
				            items:1
				        },
				        768:{
				            items:2
				        }
				    }
				    
				})
			
			}

        /* ------------------------------------------------
				End of owlCarousel
		------------------------------------------------ */

		/* ------------------------------------------------
				Counter-Up-master
		------------------------------------------------ */

			if($('.counter').length){

				$('.counter').counterUp({
	                delay: 10,
	                time: 2000
	            });
	            
			}

        /* ------------------------------------------------
				End Counter-Up-master
		------------------------------------------------ */

	});

	$(window).load(function(){

		/* ------------------------------------------------
	    Parallax
		------------------------------------------------ */

			if($(".blackout[class*='bg'],.blackout2[class*='bg']").length){

				$(".blackout[class*='bg'],.blackout2[class*='bg']").each(function(){

					$(this).parallax("50%", 0.2);

				});

			}
		/* ------------------------------------------------
		    End Parallax
		------------------------------------------------ */

		/* ------------------------------------------------
				Magnific Popup core
		------------------------------------------------ */

		$(document).ready(function() {
			$('.project_container').magnificPopup({
				delegate: 'a.project_img',
				type: 'image',
				gallery: {
					enabled: true
				},
				zoom: {
					enabled: true,
					duration: 300 // don't foget to change the duration also in CSS
				}
				
			});
		});

        /* ------------------------------------------------
				Magnific Popup core
		------------------------------------------------ */

	});

})(jQuery);