// function on
jQuery(document).ready(function() {
	midDotIt();
	windowResize(midDotIt)
});
//function to trigger another function when resizing the browser window
//use windowResize(functName);
function windowResize(functName) {
	//--------function
	$(window).on('resize orientationchange' , functName);
}
// function init
function midDotIt() {
	var lastElement = false;
	$(".fix-last-child-list li").each(function() {
		if (lastElement && lastElement.offset().left > $(this).offset().left) {
			$(lastElement).addClass("last-el");
			$(this).addClass("first-el");
		} else if (lastElement) {
			$(lastElement).removeClass("last-el");
			$(this).removeClass("first-el");
		}
		lastElement = $(this);
	});
}