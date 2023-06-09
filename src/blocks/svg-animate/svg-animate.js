// function on
jQuery(document).ready(function() {
	TotalSvgLength();
});

// function init
function TotalSvgLength() {

	function svgAn() {
		var path = document.querySelector('.squiggle-animated path');
		var length = Math.round(path.getTotalLength());
		// Clear any previous transition
		path.style.transition = path.style.WebkitTransition = 'none';
		// Set up the starting positions
		path.style.strokeDasharray = length + ' ' + length;
		path.style.strokeDashoffset = length;
		// Trigger a layout so styles are calculated & the browser
		// picks up the starting position before animating
		path.getBoundingClientRect();
		// Define our transition
		path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out';
		// Go!
		path.style.strokeDashoffset = '0';
	}
	svgAn();

	$('.btn-svg').on('click', function() {
		event.preventDefault();
		svgAn();
	});

};