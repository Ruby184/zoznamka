$(window).on('load', function() {
	// Profiles
	var $profiles = $('#profiles');

	window.profilesWall = new freewall("#profiles");
	profilesWall.reset({
		selector: '.profile',
		animate: true,
		cellW: 314,
		cellH: 'auto',
		onResize: function() {
			profilesWall.fitWidth();
		}
	});

	// Resize wall items
	profilesWall.fitWidth();

	// Filter
	var $filter = $('#filter');
	var $filterToggle = $('[data-filter-toggle]');

	var filterOptions = {
		minimalScolled: $('#main-nav').outerHeight(),
		maximalScolled: $('#header').outerHeight(),
		easing: 'swing',
		effectDuration: 350,
		filterPercentWidth: 21
	};

	$filterToggle.on('click', function(e) {
		filterScroll();

		var profilesZoom = 100;

		if ( ! $filter.is(':visible'))
			profilesZoom -= filterOptions.filterPercentWidth;

		// Animate filters
		$filter.animate(
			{width: 'toggle'},
			{
				duration: filterOptions.effectDuration,
				easing: filterOptions.easing,
				queue: false
			}
		);

		// Animate profiles
		$profiles.animate(
			{
				width: profilesZoom + '%',
				zoom: profilesZoom  + '%',
			},
			{
				duration: filterOptions.effectDuration,
				easing: filterOptions.easing,
				queue: false,
			}
		);

		// Prevent scrolling to the top of page on opening filter
		e.preventDefault();
		return false;
	});

	var filterScroll = function() {
		var scrolled = $(this).scrollTop();
		var newScrolled = filterOptions.maximalScolled - scrolled;

		if (newScrolled < filterOptions.minimalScolled)
			newScrolled = filterOptions.minimalScolled

		if (newScrolled > filterOptions.maximalScolled)
			newScrolled = filterOptions.maximalScolled

		$filter.css('top', newScrolled);
	}

	$(window).on('scroll', filterScroll);

	/* Profile Knob */
	window.setMatchValue = function(value)
    {
    	$("#profile .match .content strong").text(value);
    	$("#profile .match .knob").val(value).trigger('change');
    }

    window.animateMatchValue = function(value)
    {
    	$({someValue: 0}).animate({someValue: value}, {
		    duration: 2000,
		    easing: 'easeInOutCubic',
		    step: function() { 
		    	window.setMatchValue(Math.ceil(this.someValue));
		    }
		});
    }

	$("#profile .match .knob").knob({
		'min': 0,
    	'max': 100,
    	'step': 1,
    	'readOnly': true,
    	'width': 90,
    	'height': 90,
    	'bgColor': '#eeeeee',
    	'fgColor': '#2C3E50',
    	'thickness': 0.10,
    	'angleOffset': 180,
    	'displayInput': false,
    });

    //window.animateMatchValue($("#profile .match").data('value'));
    window.animateMatchValue(Math.random() * 100);

    // Profile - photos
	var $photos = $('#photos');

	window.photosWall = new freewall("#photos");
	photosWall.reset({
		selector: '.photo',
		animate: true,
		cellW: 150,
		cellH: 'auto',
		onResize: function() {
			photosWall.fitWidth();
		}
	});

	// Resize wall items
	photosWall.fitWidth();

	// Resize wall items when tab is shown
	$('a[data-fitWall][data-toggle="tab"]').on('shown.bs.tab', function (e) {
		photosWall.fitWidth();
	})

});