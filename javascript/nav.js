// toggles hamburger with click
$('#bun').click(function() {
	if($('#places').is(':hidden')) {
		$('#places').slideDown('fast');
		$('#hamburger').addClass('clicked');
	}
	else {
		$('#places').hide('fast');
		$('#hamburger').removeClass('clicked');
	}
});

// toggle submenu with click
// removed due to device height issues
/*
$('.menu').click(function() {
    if( $('.sub-menu').is(':hidden') ) {
        $('.sub-menu').slideDown('fast');
    } else {
        $('.sub-menu').hide('fast');
    }
});
*/

// keeps copyright year updated
var today = new Date();
var year = today.getFullYear();

$('#current-year').text(year)