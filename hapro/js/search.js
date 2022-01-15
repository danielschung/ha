$(document).ready(function() {

	const results = $('#results');
	const resultsText = $('#results h5');
	const primary = $('div.primary');
	const searchbar = $('#searchbar');

	results.hide();
	
	searchbar.on('keyup', function() {

    	const value = $(this).val().toLowerCase();
    	console.log(value);

    	if ( searchbar.val().length > 0 && searchbar.val().length != 'Search Resources' ) {
    		resultsText.filter(function() {
      			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      			results.show();
      			primary.hide();

    		});
    	} else {
    		results.hide();
    		primary.show();

    	}

  	});

});