$(document).ready(function() {

		$("#results").hide();
		
		$("#main-searchbar").on("keyup", function() {

	    	var value = $(this).val().toLowerCase();
	    	console.log(value);

	    	if ( $("#main-searchbar").val().length > 0 && $("#main-searchbar").val().length != "Search to navigate Health and Wellness" ) {
	    		$("#results h2").filter(function() {
	      		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	      		$("#results").show();
	      		$("section.default-contents").hide();

	    	});
	    	} else {
	    		$("#results").hide();
	    		$("section.default-contents").show();

	    	}

	  	});

});

