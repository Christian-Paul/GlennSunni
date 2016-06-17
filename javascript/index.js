// get window size bool
var smallScreen = window.matchMedia('(max-width: 1023px').matches;
if(!smallScreen) {
    $('#nav').addClass('transparent-bg');
}

function doHamburger() {
    if($('#places').is(':hidden')) {
        $('#places').slideDown('fast');
        $('#hamburger').addClass('clicked');
    }
    else {
        $('#places').hide('fast');
        $('#hamburger').removeClass('clicked');
    }
}

// toggles hamburger with click
$('#bun').click(doHamburger);

// keeps copyright year updated
var today = new Date();
var year = today.getFullYear();

$('#current-year').text(year)

// toggle submenu with click
// turned off due to mobile height issues
/*
$('.menu').click(function() {
    if( $('.sub-menu').is(':hidden') ) {
        $('.sub-menu').slideDown('fast');
        // once you make the submenu visible, also make the menu visible
        $('#nav').removeClass('transparent-bg');
    } else {
        $('.sub-menu').hide('fast');
        $('#nav').addClass('transparent-bg');
    }
});
*/

// animated scrolling

// to top
$('.top').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});

// to about
// .offset() returns the distance between the origin of the page and the element
// comes with .left and .top
$('#scroll-down').click(function() {
    var navHeight = $('#nav').height();
    $('html, body').animate({
        scrollTop: $('#about').offset().top - navHeight
    }, 1000);
});

// to contact
$('#nav-contact').click(function() {
    var navHeight = $('#logo-holder').height();
    $('html, body').animate({
        scrollTop: $('#map-form-contact').offset().top - navHeight
    }, 1000);

    if(smallScreen) {
        doHamburger();
    }
});

// slow down video
/* no video right now
document.getElementById('bgvid').playbackRate = .75;
*/

// if the device has a large screen, make nav transparent by default, opaque if the page scrolls down far enough
if(!smallScreen) {
    $(window).scroll(function() {
        var position = $(window).scrollTop();

        // don't hide the menu if the submenu is visible
        if(position < 25 && $('.sub-menu').is(':hidden')) {
            $('#nav').addClass('transparent-bg');
        }
        else {
            $('#nav').removeClass('transparent-bg');
        }
    });
} 

// form validation
$('#form').validate({
    rules: {
        name: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        subject: {
            required: true
        },
        message: {
            required: true
        }
    },
    submitHandler: function(form) {
        $.ajax({
            url: "//formspree.io/christiansamuelpaul@gmail.com", 
            method: "POST",
            data: {
                name: $(form).find("input[name='name']").val(),
                email: $(form).find("input[name='email']").val(),
                subject: $(form).find("input[name='subject']").val(),
                message: $(form).find("textarea[name='message']").val()
            },
            dataType: "json",
            success: function() {
                $('.response-success').fadeIn();
            },
            error: function() {
                $('.response-failure').fadeIn();
            }
        });
    }
 });

// initialize map
var map;
var styles = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#ad9b8d"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#333333"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3f518c"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#abbaa4"
            }
        ]
    }
];

function initMap() {
	var coords = {lat: 10.519521, lng: -61.414839};
	map = new google.maps.Map(document.getElementById('map'), {
		center: coords,
		scrollwheel: false,
		styles: styles, 
		zoom: 15
	});

	var marker = new google.maps.Marker({
		map: map,
		position: coords,
		title: 'GlennSunni Office'
	});
}