var $ = jQuery.noConflict();
jQuery(function() {
	isElementExist("body", testJS)
});

// Helper if element exist then call function
function isElementExist(_el, _cb) {
	var elem = document.querySelector(_el);

	if (document.body.contains(elem)) {
		try {
			_cb();
		} catch(e) {
			console.log(e);
		}
	}
}


function testJS() {
	console.log('JS load - testJS function');
}


//= ../blocks/accordion/accordion.js
