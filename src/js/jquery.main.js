var $ = jQuery.noConflict();
jQuery(function() {
	clipboardInit();
});

//-------- -------- -------- --------
//-------- js custom start
//-------- -------- -------- --------

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

function clipboardInit() {
	$('.c-block > h2').append('<i>');

	new ClipboardJS('.c-block > h2 > i', {
		target: function(trigger) {
				return trigger.previousElementSibling;
		}
});
}

//-------- -------- -------- --------
//-------- js custom end
//-------- -------- -------- --------

//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------

// https://github.com/zenorocha/clipboard.js
//= vendors/clipboard.js


//-------- -------- -------- --------
//-------- included js libs end
//-------- -------- -------- --------
