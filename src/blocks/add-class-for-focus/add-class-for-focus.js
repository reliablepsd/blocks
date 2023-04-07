// function on
jQuery(document).ready(function() {
	initFocusClass();
});
// function init
// add class when element is in focus
function initFocusClass() {
	jQuery('.focus-block-ex').addFocusClass({
		element: 'input:text'
	});
}
/*
 * Add Class on focus
 */
;
(function($) {
	function AddFocusClass(options) {
		this.options = $.extend({
			container: null,
			element: ':input',
			focusClass: 'focus'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	AddFocusClass.prototype = {
		initStructure: function() {
			this.container = $(this.options.container);
			this.element = this.container.find(this.options.element);
		},
		attachEvents: function() {
			var self = this;
			this.focusHandler = function() {
				self.container.addClass(self.options.focusClass);
			};
			this.blurHandler = function() {
				self.container.removeClass(self.options.focusClass);
			};
			this.element.on({
				focus: this.focusHandler,
				blur: this.blurHandler
			});
		},
		destroy: function() {
			this.container.removeClass(this.options.focusClass);
			this.element.off({
				focus: this.focusHandler,
				blur: this.blurHandler
			});
		}
	};
	$.fn.addFocusClass = function(options) {
		return this.each(function() {
			var params = $.extend({}, options, {
					container: this
				}),
				instance = new AddFocusClass(params);
			$.data(this, 'AddFocusClass', instance);
		});
	};
}(jQuery));