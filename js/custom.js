// JavaScript Document

'use strict';

$(document).ready(function(e) {
	var front_slider = null;
	
	
	//pace - page loader
	Pace.options = {
		ajax: false,
		elements: false
	};
	//Pace.once('done', function() {});		pace not working in ie9, so we cannot rely on 'done' event if ie9 should be supported
	$(window).load(function(e) {
		//start front slider
		if(front_slider != null)
			front_slider.api.resume();
		
		//remove page loader screen
		$('#page-loader').addClass('loaded');
		Pace.stop();
	});
	
	
	//front slider
	if(typeof MasterSlider == 'function') {
		front_slider = new MasterSlider();
	
		front_slider.control('arrows', { autohide:false });			//add arrows
		front_slider.control('bullets', { dir:'v', autohide:false });		//add vertical bullets
		front_slider.control('timebar', { autohide:false, align:'top', color:'#01bab0' });		//add top timebar
		front_slider.control('thumblist' , { autohide:false, align:"bottom", inset:true, width:150, height:104 });	//add thumbnails
	
		front_slider.setup('masterslider', {
			width:1400,
			height:800,
			space:0,
			view:'basic',
			layout:'fullscreen',
			speed:20,
			autoplay:true,
			overPause:false
		});
		front_slider.api.pause();		//pause slider, wait for page loader
	}
	
		
	//services slider
	var slider_services = $('#slider-services');
	if(slider_services.length == 1) {
		slider_services.owlCarousel({
			items: 3,
			navigation: true,
			navigationText: false,
			pagination: false,
			slideSpeed: 500,
			itemsDesktop: [1199,2],
			itemsDesktopSmall: [979,2],
			itemsTablet: [768,1]
		});
	}
	
	
	//partners slider
	var slider_partners = $('#slider-partners');
	if(slider_partners.length == 1) {
		slider_partners.owlCarousel({
			items: 3,
			navigation: true,
			navigationText: false,
			pagination: false,
			slideSpeed: 500,
			itemsDesktop: [1199,3],
			itemsDesktopSmall: [979,3],
			itemsTablet: [768,2]
		});
	}
	
	
	//blog slider
	var blog_slider = $('#blog-slider');
	if(blog_slider.length == 1) {
		blog_slider.owlCarousel({
			items: 3,
			navigation: true,
			navigationText: false,
			pagination: false,
			slideSpeed: 600,
			itemsDesktop: [1599,2],
			itemsDesktopSmall: [900,1],
			itemsTablet: [768,1]
		});
	}
	
	
	//post sliders
	var post_sliders = $('.post-preview-slider');
	for(var i=0, len=post_sliders.length; i<len; i++) {
		post_sliders.eq(i).owlCarousel({
			singleItem: true,
			navigation: true,
			navigationText: false,
			slideSpeed: 400
		});
	}

	
	//other sliders
	var single_sliders = $('.single-slider');
	for(var i=0, len=single_sliders.length; i<len; i++) {
		single_sliders.eq(i).owlCarousel({
			singleItem: true,
			navigation: true,
			navigationText: false,
			autoHeight: true,
			slideSpeed: 400
		});
	}
	
	var single_sliders_v2 = $('.single-slider-v2');
	for(var i=0, len=single_sliders_v2.length; i<len; i++) {
		single_sliders_v2.eq(i).owlCarousel({
			singleItem: true,
			navigation: true,
			navigationText: false,
			pagination: false,
			autoHeight: true,
			slideSpeed: 400
		});
	}
	
	
	//input focus/blur functionality
	var input_containers = $('.input-container');
	for(var i=0, len=input_containers.length; i<len; i++) {
		inputContainerCheck(input_containers.eq(i).find('input, textarea'), input_containers.eq(i));
	}
	
	function inputContainerCheck(input, container) {
		input.on('focus blur', function(e) {
			container.toggleClass('focus');
		});
	}
	
	
	//bar graphs
	var graph_anim_duration = 300;
	var graph_bar = $('.graph-bar');
	var current_graph_bar;
	for(var i=0, len=graph_bar.length; i<len; i++) {
		var current_graph_bar = graph_bar.eq(i);
		if(current_graph_bar.hasClass('onscroll-animate'))
			continue;
		setGraphBar(current_graph_bar);
	}
	
	function setGraphBar(graph_el) {
		graph_el.find('.graph-line-value').css('width', graph_el.data('percentage') + '%');
	}
	
	
	//donut graphs
	var graph_donut = $('.graph-donut');
	for(var i=0, len=graph_donut.length; i<len; i++) {
		var current_graph_donut = graph_donut.eq(i);
		if(current_graph_donut.hasClass('onscroll-animate'))
			continue;
		setGraphDonut(current_graph_donut);
	}
	
	function setGraphDonut(graph_el) {
		var percentage = graph_el.data('percentage') / 100;
		if(percentage < 0.5) {
			graph_el.find('.graph-left .graph-inner').hide();
			graph_el.find('.graph-right .graph-inner').css('transform', 'rotate(' + (180 + 360 * percentage) + 'deg)');
		}
		else {
			graph_el.find('.graph-right .graph-inner').css('transform', 'rotate(360deg)');
			graph_el.find('.graph-left .graph-inner').css('transform', 'rotate(' + (360 * percentage) + 'deg)');
		}
	}	
	
	
	// on-scroll animations
	var on_scroll_anims = $('.onscroll-animate');
	for (var i=0, len=on_scroll_anims.length; i<len; i++) {
		var element = on_scroll_anims.eq(i);
		element.one('inview', function (event, visible) {
			var el = $(this);
			var anim = (el.data("animation") !== undefined) ? el.data("animation") : "fadeIn";
			var delay = (el.data("delay") !== undefined ) ? el.data("delay") : 200;

			var timer = setTimeout(function() {
				el.addClass(anim);
				clearTimeout(timer);
			}, delay);
			
			//for graphs
			if(el.hasClass('graph-bar')) {
				var graph_timer = setTimeout(function() {
					setGraphBar(el);
					clearTimeout(graph_timer);
				}, delay + 700);
			}
			else if(el.hasClass('graph-donut')) {
				var graph_timer = setTimeout(function() {
					setGraphDonut(el);
					clearTimeout(graph_timer);
				}, delay);
			}
		});
	}
	
	
	//one page menu and highlight current menu item
	var one_page_nav = $('#one-page-nav');
	if(one_page_nav.length == 1) {
		one_page_nav.onePageNav({
			currentClass: 'active'
		});
	}
	
	
	//main menu scrollbar
	var main_menu_scroll_el = $("#menu");
	main_menu_scroll_el.niceScroll({
		cursoropacitymin: 0.6,
		cursorborder: "1px solid rgba(255,255,255,0.5)"
	});
	
	
	//main menu submenus
	var main_navigation_submenus = $('.main-navigation .has-submenu, .main-navigation .menu-item-has-children');
	for(var i=0, len=main_navigation_submenus.length; i<len; i++) {
		addSubmenuTriggers(main_navigation_submenus.eq(i));
	}
	
	function addSubmenuTriggers(menu_el) {
		var submenu = menu_el.children('ul');
		menu_el.on('mouseenter', function(e) {
			submenu.stop().slideDown(function() {
				main_menu_scroll_el.getNiceScroll().resize();
			});
		})
		.on('mouseleave', function(e) {
			submenu.stop().slideUp(function() {
				main_menu_scroll_el.getNiceScroll().resize();
			});
		});
	}
	
	
	//menu show/hide button functionality
	var menu = $('#menu');
	var menu_trigger = $('#menu-trigger');
	menu_trigger.on('click', function(e) {
		var menu_opened = false;
		if(menu.hasClass('active'))
			menu_opened = true;
		menu.toggleClass('active');
		menu_trigger.toggleClass('active');
		main_menu_scroll_el.getNiceScroll().resize();
		if(Modernizr.csstransitions) {
			if(menu_opened)
				main_menu_scroll_el.getNiceScroll().hide();
			menu.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
				main_menu_scroll_el.getNiceScroll().resize();
				if(menu_opened)
					main_menu_scroll_el.getNiceScroll().show();
			});
		}
	});
	
	
	//in page scrolling
	$('.scroll-to').on('click', function(e) {
		e.preventDefault();
		$.scrollTo($(this).attr('href'), 800, {axis:'y'});
	});
	
	var to_top_btn = $('#to-top');
	if(to_top_btn.length == 1) {
		to_top_btn.on('click', function(e) {
			e.preventDefault();
			$.scrollTo(0, 800, {axis:'y'});
		});
		
		var to_top_break = 350;
		$(window).on('scroll', function(e) {
			if($(window).scrollTop() > to_top_break)
				to_top_btn.addClass('active');
			else
				to_top_btn.removeClass('active');
		});
	}
	
	
	//popup windows
	var page_screen_cover = $('#page-screen-cover');
	var popup_windows = $('.popup-window-container');
	
	$('.popup-window-trigger').on('click', function(e) {
		e.preventDefault();
		var popup = $($(this).data('popup'));
		// console.log('popup: ', popup);
		openPopup(popup);
	});
	
	$('.popup-window-next, .popup-window-prev').on('click', function(e) {
		e.preventDefault();
		var parent_popup = $(this).parents('.popup-window-container');
		var new_popup;
		if($(this).hasClass('popup-window-next'))
			new_popup = parent_popup.next('.popup-window-container');
		else
			new_popup = parent_popup.prev('.popup-window-container');
		if(new_popup.length == 1) {
			closePopups(false);
			if(!Modernizr.csstransitions) {
				openPopup(new_popup);
			}
			else {
				parent_popup.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
					openPopup(new_popup);
				});
			}
		}
	});
	
	$('.popup-window-closing-area, .popup-window-close, .popup-window-close-trigger, #page-screen-cover').on('click', function(e) {
		e.preventDefault();
		closePopups();
	});
	
	function openPopup(popup_window) {
		// console.log('popup_window.height(): ', popup_window.height());
		// console.log('$(window).scrollTop(): ', $(window).scrollTop());
		// console.log('$(document).height(): ', $(document).height());
		// console.log('is: ', popup_window.height() + $(window).scrollTop() > $(document).height());
		// #dontjumptotop
		popup_window.css('top', $(window).scrollTop());
		popup_window.addClass('active');
		page_screen_cover.addClass('active');

		// TODO если большая высота, то окно слайдера отбрасывается наверх.
		// при необходимости такого поведения закомментировать блок #dontjumptotop и раскомментировать этот
		// if(popup_window.height() + $(window).scrollTop() > $(document).height()) {
		// 	$.scrollTo(0, 300, {axis:'y'});
		// 	popup_window.css('top', 0);
		// }
		// else
		// 	popup_window.css('top', $(window).scrollTop());
		// popup_window.addClass('active');
		// page_screen_cover.addClass('active');
	}
	
	function closePopups(clear_screen) {
		popup_windows.removeClass('active');
		if(clear_screen == false)
			return;
		page_screen_cover.removeClass('active');
	}
	
	
	//portfolio layout6, layout7, layout8 hover
	function portfolioLayoutImg(img_el) {
        var hidden_part = img_el.find('.portfolio-img-detail-hidden');
		img_el.on('mouseenter', function() {
			hidden_part.stop().slideDown();
		})
		.on('mouseleave', function() {
			hidden_part.stop().slideUp();
		});
	}

	var portfolio_layouts_imgs = $('.portfolio-layout6 .portfolio-img, .portfolio-layout7 .portfolio-img, .portfolio-layout8 .portfolio-img');
	for(var i=0, len=portfolio_layouts_imgs.length; i<len; i++) {
		portfolioLayoutImg(portfolio_layouts_imgs.eq(i));
    }
	
	
	//tooltips
	$('[data-toggle="tooltip"]').tooltip();
	
	
	googleMap();
		
	/* Google Map */
	function googleMap() {
		var map_canvas = $('#map-canvas');
		if(map_canvas.length == 0)
			return;
		var map;
		var myLatlng = new google.maps.LatLng(40.714728,-73.998672);
		var center = new google.maps.LatLng(40.714728,-74.050672);
		function mapInitialize() {
			var mapOptions = {
				scrollwheel: false,
				zoom: 12,
				center: center
			};
			map = new google.maps.Map(map_canvas.get(0), mapOptions);
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map
			});
		}
		google.maps.event.addDomListener(window, 'load', mapInitialize);
	}
	
	
	//contact forms
	$('#form-contactX').on('submit', 
		function(e) {
			var val = Object.fromEntries(new FormData(e.target));

			$.ajax(
			   {
					url: "http://94.103.83.231:3322/contacts/send/",
					type: "POST",
					data: val,
					dataType: 'json',
					async: false,
					success: function(msg) {
						alert(msg);
					}
				}
			);
			return false;
		}
	);
	
	$('#form-contact2').on('submit', 
		function(e) {
			var val = Object.fromEntries(new FormData(e.target));

			$.ajax(
			   {
					url: "http://94.103.83.231:3322/contacts/send/",
					type: "POST",
					data: val,
					dataType: 'json',
					async: false,
					success: function(msg) {
						alert(msg);
					}
				}
			);	
			return false;
		}
	);
});

$(window).load(function(e) {
	//blog 1 - isotope activation
	var blog1 = $('#blog1');
	if(blog1.length == 1) {
		blog1.isotope({
			itemSelector: '.blog-item',
			masonry: {
				columnWidth: '.blog-item'
			},
			percentPosition: true
		});
	}
	 
	 	
	//portfolio layout 1 - isotope activation
	var portfolio1 = $('#portfolio1');
	if(portfolio1.length == 1) {
		var isotopeEl1 = portfolio1.isotope({
			itemSelector: '.portfolio-item',
			layoutMode: 'fitRows'
		});
		
		//isotope filter
		var isotope_filter1_items = $('#isotope-filter-list1 .isotope-filter');
		isotope_filter1_items.on('click', function(e) {
			e.preventDefault();
			isotope_filter1_items.removeClass('active');
			$(this).addClass('active');
			isotopeEl1.isotope({ filter: $(this).data('filter') });
		});
	}
	
	
	//portfolio layout 2 - isotope activation
	var portfolio2 = $('#portfolio2');
	if(portfolio2.length == 1) {
		var isotopeEl2 = portfolio2.isotope({
			itemSelector: '.portfolio-item',
			masonry: {
				columnWidth: '.portfolio-item'
			},
			percentPosition: true
		});
		
		//isotope filter
		var isotope_filter2_list = $('#isotope-filter-list2');
		var isotope_filter2_items = isotope_filter2_list.find('.isotope-filter');
		var isotope_filter2_all = isotope_filter2_list.find('[data-filter="*"]');
		var automatic_filtering = portfolio2.hasClass('filtering-on-button') ? false : true;
		isotope_filter2_items.on('click', function(e) {
			e.preventDefault();
			if($(this).get(0) == isotope_filter2_all.get(0)) {
				isotope_filter2_items.removeClass('active');
				isotope_filter2_all.addClass('active');
			}
			else {
				isotope_filter2_all.removeClass('active');
				$(this).toggleClass('active');
			}
			if(automatic_filtering)
				portfolio2_filter_perform();
		});
		isotope_filter2_list.find('.isotope-filter-button > a').on('click', function(e) {
			portfolio2_filter_perform();
		});
	}
	
	function portfolio2_filter_perform() {
		var filter_string = '';
		for(var i=0; i<isotope_filter2_items.length; i++) {
			var current_it = isotope_filter2_items.eq(i);
			if(!current_it.hasClass('active'))
				continue;
			filter_string = filter_string + current_it.data('filter') + ', ';
		}
		//remove last comma and space in the filter string
		filter_string = filter_string.substring(0, filter_string.length - 2);
		if(filter_string.length == 0)
			filter_string = '*';
		isotopeEl2.isotope({ filter: filter_string });
	}
	
	
	//portfolio layout 3 - isotope activation
	var portfolio3 = $('#portfolio3');
	if(portfolio3.length == 1) {
		var isotopeEl3 = portfolio3.isotope({
			itemSelector: '.portfolio-item'
		});
		
		//isotope filter
		var isotope_filter3_list = $('#isotope-filter-list3');
		var isotope_filter3_items = isotope_filter3_list.find('.isotope-filter');
		var isotope_filter3_all = isotope_filter3_list.find('[data-filter="*"]');
		var automatic_filtering = portfolio3.hasClass('filtering-on-button') ? false : true;
		isotope_filter3_items.on('click', function(e) {
			e.preventDefault();
			if($(this).get(0) == isotope_filter3_all.get(0)) {
				isotope_filter3_items.removeClass('active');
				isotope_filter3_all.addClass('active');
			}
			else {
				isotope_filter3_all.removeClass('active');
				$(this).toggleClass('active');
			}
			if(automatic_filtering)
				portfolio3_filter_perform();
		});
		isotope_filter3_list.find('.isotope-filter-button > a').on('click', function(e) {
			portfolio3_filter_perform();
		});
	}
	
	function portfolio3_filter_perform() {
		var filter_string = '';
		for(var i=0; i<isotope_filter3_items.length; i++) {
			var current_it = isotope_filter3_items.eq(i);
			if(!current_it.hasClass('active'))
				continue;
			filter_string = filter_string + current_it.data('filter') + ', ';
		}
		//remove last comma and space in the filter string
		filter_string = filter_string.substring(0, filter_string.length - 2);
		if(filter_string.length == 0)
			filter_string = '*';
		isotopeEl3.isotope({ filter: filter_string });
	}
});



//placeholder fallback for old browsers
if ( !("placeholder" in document.createElement("input")) ) {
    $("input[placeholder], textarea[placeholder]").each(function() {
	    var val = $(this).attr("placeholder");
        if ( this.value == "" ) {
    	    this.value = val;
        }
        $(this).focus(function() {
        	if ( this.value == val ) {
            	this.value = "";
            }
       	}).blur(function() {
        	if ( $.trim(this.value) == "" ) {
            	this.value = val;
            }
        })
  	});
 
    // Clear default placeholder values on form submit
    $('form').submit(function() {
    	$(this).find("input[placeholder], textarea[placeholder]").each(function() {
        	if ( this.value == $(this).attr("placeholder") ) {
            	this.value = "";
            }
        });
    });
}





/*	
  create ajax request from form element and his fields
  messages: set as form "data" attribut - "[field name]-not-set-msg", "all-fields-required-msg", "ajax-fail-msg", "success-msg"
  form must have attributes "method" and "action" set
  "return message" and "ajax loader" are also managed - see functions below
  
  @param form_el - form element
  @param all_fields - array of names of all fields in the form element that will be send
  @param required_fields - array of names of all fields in the form element that must be set - cannot be empty
*/
function form_to_ajax_request(form_el, all_fields, required_fields) {
	var fields_values = [];
	var error = false;
	
	//get values from fields
	$.each(all_fields, function(index, value) {
		fields_values[value] = form_el.find('*[name=' + value + ']').val();
	});
	
	//check if required fields are set
	$.each(required_fields, function(index, value) {
		if(!isSet(fields_values[value])) {
			var message = form_el.data(value + '-not-set-msg');
			if(!isSet(message))
				message = form_el.data('all-fields-required-msg');
			setReturnMessage(form_el, message);
			showReturnMessage(form_el);
			error = true;
			return;
		}
	});
	if(error)
		return false;
	
	//form data query object for ajax request
	var data_query = {};
	$.each(all_fields, function(index, value) {
		data_query[value] = fields_values[value];
	});
	data_query['ajax'] = true;

	//show ajax loader
	showLoader(form_el);
	
	//send the request
	$.ajax({
		type: form_el.attr('method'),
		url: form_el.attr('action'),
		data: data_query,
		cache: false,
		dataType: "text"
	})
	.fail(function() {		//request failed
		setReturnMessage(form_el, form_el.data('ajax-fail-msg'));
		showReturnMessage(form_el);
	})
	.done(function(message) {		//request succeeded
		if(!isSet(message)) {
			clearForm(form_el);
			setReturnMessage(form_el, form_el.data('success-msg'));
			showReturnMessage(form_el);
		}
		else {
			setReturnMessage(form_el, message);
			showReturnMessage(form_el);
		}
	});
	
	//hide ajax loader
	hideLoader(form_el);
	
	return false;
}

function isSet(variable) {
	if(variable == "" || typeof(variable) == 'undefined')
		return false;
	return true;
}

function clearForm(form_el) {
	form_el.find('input[type=text]').val('');
	form_el.find('input[type=checkbox]').prop('checked', false);
	form_el.find('textarea').val('');
}

function showLoader(form_el) {
	form_el.find('.ajax-loader').fadeIn('fast');
}

function hideLoader(form_el) {
	form_el.find('.ajax-loader').fadeOut('fast');
}
	
function setReturnMessage(form_el, content) {
	if(!isSet(content))
		content = "Unspecified message.";
	form_el.find('.return-msg').html(content);
}

function showReturnMessage(form_el) {
	form_el.find('.return-msg').addClass('show-return-msg');
}

$('.return-msg').on('click', function(e) {
	$(this).removeClass('show-return-msg');
});

/*popup for orders
	Привязывается попап для создания заказа
 */
$('.show_order_popup').click(function() {
	let popup_id = $('#order_' + $(this).attr("rel"));
	$(popup_id).css('display', 'flex');
	$('.order_overlay_popup').show();
})

function closeOrderPopup() {
	$('.order_overlay_popup, .order_popup').hide();
}

$('.order_overlay_popup').click(function() {
	$('.order_overlay_popup, .order_popup').hide();
})

function sendForm(form)
{
  var val = Object.fromEntries(new FormData(form));

  $.ajax(
     {
      url: "http://94.103.83.231:3322/contacts/send/",
      type: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(val),
      async: false,
      success: function(msg) {
        // alert(msg);
		closeOrderPopup();
      }
    }
  );
}