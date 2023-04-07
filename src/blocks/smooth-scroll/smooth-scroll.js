// function on
jQuery(document).ready(function() {
	myScrollLink();
});
// function init
function myScrollLink() {
	var navLink = jQuery(".scroll-link");
	navLink.on('click', function(e) {
		var elementClick = jQuery(this).attr("href");
		var destination = jQuery(elementClick).offset().top;
		var scrollTime = (jQuery(this).attr("data-scrollTime") != undefined) ? +(jQuery(this).attr("data-scrollTime")) : 1000;
		var scrollTopVar = (jQuery(this).attr("data-scrollTop") != undefined) ? +(jQuery(this).attr("data-scrollTop")) : 0;
		var scrollBottomVar = (jQuery(this).attr("data-scrollBottom") != undefined) ? +(jQuery(this).attr("data-scrollBottom")) : 0;
		var destinationFull = destination - scrollTopVar + scrollBottomVar;

		jQuery("html,body").stop().animate({
			scrollTop: destinationFull
		}, scrollTime);
		return false;
	});
}