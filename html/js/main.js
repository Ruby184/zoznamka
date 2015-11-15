$(function() {

	// Profiles
	var $profiles = $('#profiles');

	var profilesWall = new freewall("#profiles");
	profilesWall.reset({
		selector: '.profile',
		animate: true,
		cellW: 314,
		cellH: 'auto',
		onResize: function() {
			profilesWall.fitWidth();
		}
	});

	profilesWall.fitWidth();
		
	/*profilesWall.container.find('.profile img').load(function() {
		profilesWall.fitWidth();
	});*/

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

});