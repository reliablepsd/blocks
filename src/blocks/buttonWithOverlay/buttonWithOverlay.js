// function on
jQuery(function() {
	isElementExist(".sbutton", buttonWithOverlayInit);
});
// function init
function buttonWithOverlayInit() {
	$(".sbutton").on("mousemove", function(t) {
		var e = $(this),
			i = e.offset(),
			s = t.pageY - i.top,
			n = t.pageX - i.left;
		t.target.style.setProperty("--x", "".concat(n, "px")), t.target.style.setProperty("--y", "".concat(s, "px"));
	});
}
