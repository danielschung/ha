$(document).ready (function() {

	var category_plan = [];
	var category_metal = [];

	$('div.filter').on('click', function() {
		$(this).toggleClass('clicked');
		var category = $(this).attr('value');
		if ( $(this).hasClass('clicked') ) {
			if ( category === 'HMO' || category === 'POS' || category === 'HSA' ) {
				category_plan.push(category);
			} else {
				category_metal.push(category);
			}
		} else {
			if ( category === 'HMO' || category === 'POS' || category === 'HSA' ) {
				var index = category_plan.indexOf(category);
				category_plan.splice(index, 1);
			} else {
				var index = category_metal.indexOf(category);
				category_metal.splice(index, 1);
			}
		}

		if ( category_plan.length == 0 && category_metal.length == 0 ) {
			$('div.card').show();
		} else {
			$('div.card').each( function()  {
				var item1 = $(this).attr('data-1');
				var item2 = $(this).attr('data-2');
				var item3 = $(this).attr('data-3');

				var planData = [item1, item3];
				var metalData = [item2];

				var planValid = category_plan.length == 0 || category_plan.some(elem => planData.indexOf(elem) > -1);
				var metalValid = category_metal.length == 0 || category_metal.some(elem => metalData.indexOf(elem) > -1);

				if ( planValid && metalValid ) {
					$(this).show();
				} else {
					$(this).hide();
				}

			});
		}

	});



});	
