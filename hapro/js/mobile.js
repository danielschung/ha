$(document).ready (function() {

	$('i.icon-align-right').on('click', function() {

		$('div.slide-out').show().animate({width:"300px"},200);
		$('div.slide-out div.container').fadeIn(700);
		$('div.faded-layer').fadeIn(100);
		$('i.icon-align-right').hide();
		$('i.icon-align-center').fadeIn(100);

	});

	$('i.icon-align-center').click(function() {

		$('div.slide-out').animate({width:"0px"},200);
		$('div.slide-out div.container').fadeOut(100);
		$('div.faded-layer').fadeOut(100);
		$('i.icon-align-center').fadeOut(100);
		$('i.icon-align-right').fadeIn(100);
		$(this).fadeOut(200);

	});

	$('div.faded-layer').click(function() {

			$('div.slide-out').animate({width:"0px"},200);
			$('div.slide-out div.container').fadeOut(100);
			$('div.faded-layer').fadeOut(100);
			$('i.icon-align-center').fadeOut(100);
			$('i.icon-align-right').fadeIn(100);
			$(this).fadeOut(200);

	});

});
