$(document).ready (function() {

	$('div.primary div.accordian h5').on('click', function() {

		const c = $(this).next();
		const plus = $(this).find('i:nth-child(1)');
		const minus = $(this).find('i:nth-child(2)');

		c.slideToggle(300);

		if (plus.is(':visible')) {
			plus.hide();
			minus.fadeIn(200);
		} else {
			minus.hide();
			plus.fadeIn(200);
		};

	});

});
