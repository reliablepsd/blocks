// function on
jQuery(document).ready(function() {
	toltipsInit();
});
// В скрипте есть следующие опции:
// jQuery('a[title]').hoverTooltip({
// 	positionTypeX: 'right',    // Горизонтальное положение Tooltip относительно курсора мыши 'left' или 'right'
// 	positionTypeY: 'top',      // Вертикальное положение Tooltip относительно курсора мыши 'top' или 'bottom'
// 	attribute:'title',         // Аттрибут элемента из которого брать текст тултипа
// 	extraOffsetX: 10,          // Дополнительное горизонтальное смещение от курсора мыши
// 	extraOffsetY: 10           // Дополнительное вертикальное смещение от курсора мыши
// });
// Если необходимо создать вложенную структуру для реализации дизайна можно воспользоваться следующими опциями:
// jQuery('a[title]').hoverTooltip({
// tooltipStructure: '<div class="custom-tooltip"><strong>Custom Tooltip:</strong><div class="tooltip-text"></div></div>',
// tooltipSelector: '.tooltip-text',
// });
// function init
function toltipsInit() {
	jQuery(function() {
		jQuery('p a[title]').hoverTooltip({
			positionTypeX: 'right',
			positionTypeY: 'top',
			attribute: 'title',
			extraOffsetX: 10,
			extraOffsetY: 10
		});
		jQuery('ul.tooltip-demo-list a').each(function() {
			var link = jQuery(this);
			var positionData = link.attr('rel').split('-');
			var posY = positionData[0];
			var posX = positionData[1];
			link.hoverTooltip({
				positionTypeX: posX,
				positionTypeY: posY,
				attribute: 'title'
			});
		});
		jQuery('button[title]').hoverTooltip({
			tooltipStructure: '<div class="custom-tooltip"><strong>Custom Tooltip:</strong><div class="tooltip-text"></div></div>',
			tooltipSelector: '.tooltip-text',
			attribute: 'title'
		});
	});
}
/*
 * jQuery Tooltip plugin
 */
;
(function($) {
	$.fn.hoverTooltip = function(o) {
		var options = $.extend({
			tooltipStructure: '<div class="hover-tooltip"><div class="tooltip-text"></div></div>',
			tooltipSelector: '.tooltip-text',
			positionTypeX: 'right',
			positionTypeY: 'top',
			attribute: 'title',
			extraOffsetX: 10,
			extraOffsetY: 10,
			showOnTouchDevice: true
		}, o);
		// create tooltip
		var tooltip = $('<div>').html(options.tooltipStructure).children().css({ position: 'absolute' });
		var tooltipTextBox = tooltip.find(options.tooltipSelector);
		var tooltipWidth, tooltipHeight;
		// tooltip logic
		function initTooltip(item) {
			var tooltipText = item.attr(options.attribute);
			item.removeAttr(options.attribute);
			if (!tooltipText) return;
			if (isTouchDevice) {
				if (options.showOnTouchDevice) {
					item.bind('touchstart', function(e) {
						showTooltip(item, tooltipText, getEvent(e));
						jQuery(document).one('touchend', hideTooltip);
					});
				}
			} else {
				item.bind('mouseenter', function(e) {
					showTooltip(item, tooltipText, e);
				}).bind('mouseleave', hideTooltip).bind('mousemove', moveTooltip);
			}
		}

		function showTooltip(item, text, e) {
			tooltipTextBox.html(text);
			tooltip.appendTo(document.body).show();
			tooltipWidth = tooltip.outerWidth(true);
			tooltipHeight = tooltip.outerHeight(true);
			moveTooltip(e, item);
		}

		function hideTooltip() {
			tooltip.remove();
		}

		function moveTooltip(e) {
			var top, left, x = e.pageX,
				y = e.pageY;
			switch (options.positionTypeY) {
				case 'top':
					top = y - tooltipHeight - options.extraOffsetY;
					break;
				case 'center':
					top = y - tooltipHeight / 2;
					break;
				case 'bottom':
					top = y + options.extraOffsetY;
					break;
			}
			switch (options.positionTypeX) {
				case 'left':
					left = x - tooltipWidth - options.extraOffsetX;
					break;
				case 'center':
					left = x - tooltipWidth / 2;
					break;
				case 'right':
					left = x + options.extraOffsetX;
					break;
			}
			tooltip.css({
				top: top,
				left: left
			});
		}
		// add handlers
		return this.each(function() {
			initTooltip($(this));
		});
	};
	// parse event
	function getEvent(e) {
		return e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
	}
	// detect device type
	var isTouchDevice = (function() {
		try {
			return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		} catch (e) {
			return false;
		}
	}());
}(jQuery));