$(document).ready (function() {

	// $('img.mobile-nav').click(function() {
	// 	$('div.nav-reveal').show().animate({right:"0px"},200);
	// 	$('div.faded-layer').not(this).css('background-color','rgba(40, 40, 40,0.9)');
	// });

	// if ( $('div.faded-layer').css('background-color') === 'rgba(40, 40, 40,0.9)' ) {
	// 	$('div.faded-layer').on('click') {
	// 		$('div.nav-reveal')().animate({left:"-100px"},200).hide();
	// 	}
	// }

	$('img.mobile-nav').click(function() {
		$('div.nav-reveal').show().animate({width:"220px"},200);
		$('div.open-link-container').delay(200).fadeIn(700);
		$('div.faded-layer').toggleClass('active');
		$('img.mobile-nav').hide();
	});

	$('img.x-logo').click(function() {
		$('div.nav-reveal').animate({width:"0px"},200);
		$('div.open-link-container').hide();
		$('div.faded-layer').toggleClass('active');
		$('img.mobile-nav').fadeIn(700);
	});

	$('div.faded-layer').click(function() {
			$('div.nav-reveal').animate({width:"0px"},200);
			$('div.open-link-container').hide();
			$('div.faded-layer').toggleClass('active');
			$('img.mobile-nav').fadeIn(700);
	});

});