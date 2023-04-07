// function on
jQuery(document).ready(function() {
	countUpinit();
});
// function init
function countUpinit() {
		jQuery(".count-up-list").jsCountUp({
		offset: "95%",
		repeat: false
	});
}

(function($) {
	var methods = {
		init: function(options) {
			var settings = $.extend({
				offset: "100%",
				repeat: false
			}, options);
			return this.each(function() {
				var $this = $(this),
					data = $this.data("jsCountUp");
				if (!data) {
					// init waypoint
					$this.waypoint(function(up) {
						$this.children(".item").each(function(i) {
							var val = $(this).find(".count-up-digit").attr("id");
							var valFrom = $(this).attr("data-count-from");
							var valTo = $(this).attr("data-count-to");
							var valType = $(this).attr("data-count-type");
							var valDur = $(this).attr("data-count-duration");
							var valOpt = $(this).attr("data-count-option");
							var valOptObj = JSON.parse(valOpt);
							new CountUp(val, valFrom, valTo, valType, valDur, valOptObj).start();
						});
						settings.repeat ? true : this.destroy();
					}, {
						offset: settings.offset
					});
				}
			});
		}
	};
	$.fn.jsCountUp = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === "object" || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error("Not found " + method);
		}
	};
})(jQuery);

// this https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.js
/*!
Waypoints - 4.0.0
Copyright В© 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
	'use strict'
	var keyCounter = 0
	var allWaypoints = {}
	/* http://imakewebthings.com/waypoints/api/waypoint */
	function Waypoint(options) {
		if (!options) {
			throw new Error('No options passed to Waypoint constructor')
		}
		if (!options.element) {
			throw new Error('No element option passed to Waypoint constructor')
		}
		if (!options.handler) {
			throw new Error('No handler option passed to Waypoint constructor')
		}
		this.key = 'waypoint-' + keyCounter
		this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
		this.element = this.options.element
		this.adapter = new Waypoint.Adapter(this.element)
		this.callback = options.handler
		this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
		this.enabled = this.options.enabled
		this.triggerPoint = null
		this.group = Waypoint.Group.findOrCreate({
			name: this.options.group,
			axis: this.axis
		})
		this.context = Waypoint.Context.findOrCreateByElement(this.options.context)
		if (Waypoint.offsetAliases[this.options.offset]) {
			this.options.offset = Waypoint.offsetAliases[this.options.offset]
		}
		this.group.add(this)
		this.context.add(this)
		allWaypoints[this.key] = this
		keyCounter += 1
	}
	/* Private */
	Waypoint.prototype.queueTrigger = function(direction) {
		this.group.queueTrigger(this, direction)
	}
	/* Private */
	Waypoint.prototype.trigger = function(args) {
		if (!this.enabled) {
			return
		}
		if (this.callback) {
			this.callback.apply(this, args)
		}
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/destroy */
	Waypoint.prototype.destroy = function() {
		this.context.remove(this)
		this.group.remove(this)
		delete allWaypoints[this.key]
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/disable */
	Waypoint.prototype.disable = function() {
		this.enabled = false
		return this
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/enable */
	Waypoint.prototype.enable = function() {
		this.context.refresh()
		this.enabled = true
		return this
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/next */
	Waypoint.prototype.next = function() {
		return this.group.next(this)
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/previous */
	Waypoint.prototype.previous = function() {
		return this.group.previous(this)
	}
	/* Private */
	Waypoint.invokeAll = function(method) {
		var allWaypointsArray = []
		for (var waypointKey in allWaypoints) {
			allWaypointsArray.push(allWaypoints[waypointKey])
		}
		for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
			allWaypointsArray[i][method]()
		}
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/destroy-all */
	Waypoint.destroyAll = function() {
		Waypoint.invokeAll('destroy')
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/disable-all */
	Waypoint.disableAll = function() {
		Waypoint.invokeAll('disable')
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/enable-all */
	Waypoint.enableAll = function() {
		Waypoint.invokeAll('enable')
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/refresh-all */
	Waypoint.refreshAll = function() {
		Waypoint.Context.refreshAll()
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/viewport-height */
	Waypoint.viewportHeight = function() {
		return window.innerHeight || document.documentElement.clientHeight
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/viewport-width */
	Waypoint.viewportWidth = function() {
		return document.documentElement.clientWidth
	}
	Waypoint.adapters = []
	Waypoint.defaults = {
		context: window,
		continuous: true,
		enabled: true,
		group: 'default',
		horizontal: false,
		offset: 0
	}
	Waypoint.offsetAliases = {
		'bottom-in-view': function() {
			return this.context.innerHeight() - this.adapter.outerHeight()
		},
		'right-in-view': function() {
			return this.context.innerWidth() - this.adapter.outerWidth()
		}
	}
	window.Waypoint = Waypoint
}());
(function() {
	'use strict'

	function requestAnimationFrameShim(callback) {
		window.setTimeout(callback, 1000 / 60)
	}
	var keyCounter = 0
	var contexts = {}
	var Waypoint = window.Waypoint
	var oldWindowLoad = window.onload
	/* http://imakewebthings.com/waypoints/api/context */
	function Context(element) {
		this.element = element
		this.Adapter = Waypoint.Adapter
		this.adapter = new this.Adapter(element)
		this.key = 'waypoint-context-' + keyCounter
		this.didScroll = false
		this.didResize = false
		this.oldScroll = {
			x: this.adapter.scrollLeft(),
			y: this.adapter.scrollTop()
		}
		this.waypoints = {
			vertical: {},
			horizontal: {}
		}
		element.waypointContextKey = this.key
		contexts[element.waypointContextKey] = this
		keyCounter += 1
		this.createThrottledScrollHandler()
		this.createThrottledResizeHandler()
	}
	/* Private */
	Context.prototype.add = function(waypoint) {
		var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
		this.waypoints[axis][waypoint.key] = waypoint
		this.refresh()
	}
	/* Private */
	Context.prototype.checkEmpty = function() {
		var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
		var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
		if (horizontalEmpty && verticalEmpty) {
			this.adapter.off('.waypoints')
			delete contexts[this.key]
		}
	}
	/* Private */
	Context.prototype.createThrottledResizeHandler = function() {
		var self = this

		function resizeHandler() {
			self.handleResize()
			self.didResize = false
		}
		this.adapter.on('resize.waypoints', function() {
			if (!self.didResize) {
				self.didResize = true
				Waypoint.requestAnimationFrame(resizeHandler)
			}
		})
	}
	/* Private */
	Context.prototype.createThrottledScrollHandler = function() {
		var self = this

		function scrollHandler() {
			self.handleScroll()
			self.didScroll = false
		}
		this.adapter.on('scroll.waypoints', function() {
			if (!self.didScroll || Waypoint.isTouch) {
				self.didScroll = true
				Waypoint.requestAnimationFrame(scrollHandler)
			}
		})
	}
	/* Private */
	Context.prototype.handleResize = function() {
		Waypoint.Context.refreshAll()
	}
	/* Private */
	Context.prototype.handleScroll = function() {
		var triggeredGroups = {}
		var axes = {
			horizontal: {
				newScroll: this.adapter.scrollLeft(),
				oldScroll: this.oldScroll.x,
				forward: 'right',
				backward: 'left'
			},
			vertical: {
				newScroll: this.adapter.scrollTop(),
				oldScroll: this.oldScroll.y,
				forward: 'down',
				backward: 'up'
			}
		}
		for (var axisKey in axes) {
			var axis = axes[axisKey]
			var isForward = axis.newScroll > axis.oldScroll
			var direction = isForward ? axis.forward : axis.backward
			for (var waypointKey in this.waypoints[axisKey]) {
				var waypoint = this.waypoints[axisKey][waypointKey]
				var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
				var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
				var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
				var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
				if (crossedForward || crossedBackward) {
					waypoint.queueTrigger(direction)
					triggeredGroups[waypoint.group.id] = waypoint.group
				}
			}
		}
		for (var groupKey in triggeredGroups) {
			triggeredGroups[groupKey].flushTriggers()
		}
		this.oldScroll = {
			x: axes.horizontal.newScroll,
			y: axes.vertical.newScroll
		}
	}
	/* Private */
	Context.prototype.innerHeight = function() {
		/*eslint-disable eqeqeq */
		if (this.element == this.element.window) {
			return Waypoint.viewportHeight()
		}
		/*eslint-enable eqeqeq */
		return this.adapter.innerHeight()
	}
	/* Private */
	Context.prototype.remove = function(waypoint) {
		delete this.waypoints[waypoint.axis][waypoint.key]
		this.checkEmpty()
	}
	/* Private */
	Context.prototype.innerWidth = function() {
		/*eslint-disable eqeqeq */
		if (this.element == this.element.window) {
			return Waypoint.viewportWidth()
		}
		/*eslint-enable eqeqeq */
		return this.adapter.innerWidth()
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/context-destroy */
	Context.prototype.destroy = function() {
		var allWaypoints = []
		for (var axis in this.waypoints) {
			for (var waypointKey in this.waypoints[axis]) {
				allWaypoints.push(this.waypoints[axis][waypointKey])
			}
		}
		for (var i = 0, end = allWaypoints.length; i < end; i++) {
			allWaypoints[i].destroy()
		}
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/context-refresh */
	Context.prototype.refresh = function() {
		/*eslint-disable eqeqeq */
		var isWindow = this.element == this.element.window
		/*eslint-enable eqeqeq */
		var contextOffset = isWindow ? undefined : this.adapter.offset()
		var triggeredGroups = {}
		var axes
		this.handleScroll()
		axes = {
			horizontal: {
				contextOffset: isWindow ? 0 : contextOffset.left,
				contextScroll: isWindow ? 0 : this.oldScroll.x,
				contextDimension: this.innerWidth(),
				oldScroll: this.oldScroll.x,
				forward: 'right',
				backward: 'left',
				offsetProp: 'left'
			},
			vertical: {
				contextOffset: isWindow ? 0 : contextOffset.top,
				contextScroll: isWindow ? 0 : this.oldScroll.y,
				contextDimension: this.innerHeight(),
				oldScroll: this.oldScroll.y,
				forward: 'down',
				backward: 'up',
				offsetProp: 'top'
			}
		}
		for (var axisKey in axes) {
			var axis = axes[axisKey]
			for (var waypointKey in this.waypoints[axisKey]) {
				var waypoint = this.waypoints[axisKey][waypointKey]
				var adjustment = waypoint.options.offset
				var oldTriggerPoint = waypoint.triggerPoint
				var elementOffset = 0
				var freshWaypoint = oldTriggerPoint == null
				var contextModifier, wasBeforeScroll, nowAfterScroll
				var triggeredBackward, triggeredForward
				if (waypoint.element !== waypoint.element.window) {
					elementOffset = waypoint.adapter.offset()[axis.offsetProp]
				}
				if (typeof adjustment === 'function') {
					adjustment = adjustment.apply(waypoint)
				} else if (typeof adjustment === 'string') {
					adjustment = parseFloat(adjustment)
					if (waypoint.options.offset.indexOf('%') > -1) {
						adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
					}
				}
				contextModifier = axis.contextScroll - axis.contextOffset
				waypoint.triggerPoint = elementOffset + contextModifier - adjustment
				wasBeforeScroll = oldTriggerPoint < axis.oldScroll
				nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
				triggeredBackward = wasBeforeScroll && nowAfterScroll
				triggeredForward = !wasBeforeScroll && !nowAfterScroll
				if (!freshWaypoint && triggeredBackward) {
					waypoint.queueTrigger(axis.backward)
					triggeredGroups[waypoint.group.id] = waypoint.group
				} else if (!freshWaypoint && triggeredForward) {
					waypoint.queueTrigger(axis.forward)
					triggeredGroups[waypoint.group.id] = waypoint.group
				} else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
					waypoint.queueTrigger(axis.forward)
					triggeredGroups[waypoint.group.id] = waypoint.group
				}
			}
		}
		Waypoint.requestAnimationFrame(function() {
			for (var groupKey in triggeredGroups) {
				triggeredGroups[groupKey].flushTriggers()
			}
		})
		return this
	}
	/* Private */
	Context.findOrCreateByElement = function(element) {
		return Context.findByElement(element) || new Context(element)
	}
	/* Private */
	Context.refreshAll = function() {
		for (var contextId in contexts) {
			contexts[contextId].refresh()
		}
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/context-find-by-element */
	Context.findByElement = function(element) {
		return contexts[element.waypointContextKey]
	}
	window.onload = function() {
		if (oldWindowLoad) {
			oldWindowLoad()
		}
		Context.refreshAll()
	}
	Waypoint.requestAnimationFrame = function(callback) {
		var requestFn = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || requestAnimationFrameShim
		requestFn.call(window, callback)
	}
	Waypoint.Context = Context
}());
(function() {
	'use strict'

	function byTriggerPoint(a, b) {
		return a.triggerPoint - b.triggerPoint
	}

	function byReverseTriggerPoint(a, b) {
		return b.triggerPoint - a.triggerPoint
	}
	var groups = {
		vertical: {},
		horizontal: {}
	}
	var Waypoint = window.Waypoint
	/* http://imakewebthings.com/waypoints/api/group */
	function Group(options) {
		this.name = options.name
		this.axis = options.axis
		this.id = this.name + '-' + this.axis
		this.waypoints = []
		this.clearTriggerQueues()
		groups[this.axis][this.name] = this
	}
	/* Private */
	Group.prototype.add = function(waypoint) {
		this.waypoints.push(waypoint)
	}
	/* Private */
	Group.prototype.clearTriggerQueues = function() {
		this.triggerQueues = {
			up: [],
			down: [],
			left: [],
			right: []
		}
	}
	/* Private */
	Group.prototype.flushTriggers = function() {
		for (var direction in this.triggerQueues) {
			var waypoints = this.triggerQueues[direction]
			var reverse = direction === 'up' || direction === 'left'
			waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
			for (var i = 0, end = waypoints.length; i < end; i += 1) {
				var waypoint = waypoints[i]
				if (waypoint.options.continuous || i === waypoints.length - 1) {
					waypoint.trigger([direction])
				}
			}
		}
		this.clearTriggerQueues()
	}
	/* Private */
	Group.prototype.next = function(waypoint) {
		this.waypoints.sort(byTriggerPoint)
		var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
		var isLast = index === this.waypoints.length - 1
		return isLast ? null : this.waypoints[index + 1]
	}
	/* Private */
	Group.prototype.previous = function(waypoint) {
		this.waypoints.sort(byTriggerPoint)
		var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
		return index ? this.waypoints[index - 1] : null
	}
	/* Private */
	Group.prototype.queueTrigger = function(waypoint, direction) {
		this.triggerQueues[direction].push(waypoint)
	}
	/* Private */
	Group.prototype.remove = function(waypoint) {
		var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
		if (index > -1) {
			this.waypoints.splice(index, 1)
		}
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/first */
	Group.prototype.first = function() {
		return this.waypoints[0]
	}
	/* Public */
	/* http://imakewebthings.com/waypoints/api/last */
	Group.prototype.last = function() {
		return this.waypoints[this.waypoints.length - 1]
	}
	/* Private */
	Group.findOrCreate = function(options) {
		return groups[options.axis][options.name] || new Group(options)
	}
	Waypoint.Group = Group
}());
(function() {
	'use strict'
	var $ = window.jQuery
	var Waypoint = window.Waypoint

	function JQueryAdapter(element) {
		this.$element = $(element)
	}
	$.each(['innerHeight', 'innerWidth', 'off', 'offset', 'on', 'outerHeight', 'outerWidth', 'scrollLeft', 'scrollTop'], function(i, method) {
		JQueryAdapter.prototype[method] = function() {
			var args = Array.prototype.slice.call(arguments)
			return this.$element[method].apply(this.$element, args)
		}
	})
	$.each(['extend', 'inArray', 'isEmptyObject'], function(i, method) {
		JQueryAdapter[method] = $[method]
	})
	Waypoint.adapters.push({
		name: 'jquery',
		Adapter: JQueryAdapter
	})
	Waypoint.Adapter = JQueryAdapter
}());
(function() {
	'use strict'
	var Waypoint = window.Waypoint

	function createExtension(framework) {
		return function() {
			var waypoints = []
			var overrides = arguments[0]
			if (framework.isFunction(arguments[0])) {
				overrides = framework.extend({}, arguments[1])
				overrides.handler = arguments[0]
			}
			this.each(function() {
				var options = framework.extend({}, overrides, {
					element: this
				})
				if (typeof options.context === 'string') {
					options.context = framework(this).closest(options.context)[0]
				}
				waypoints.push(new Waypoint(options))
			})
			return waypoints
		}
	}
	if (window.jQuery) {
		window.jQuery.fn.waypoint = createExtension(window.jQuery)
	}
	if (window.Zepto) {
		window.Zepto.fn.waypoint = createExtension(window.Zepto)
	}
}());
// this https://cdnjs.cloudflare.com/ajax/libs/countup.js/1.8.2/countUp.min.js
! function(a, t) { "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : a.CountUp = t() }(this, function(a, t, n) { var e = function(a, t, n, e, r, i) { for (var o = 0, s = ["webkit", "moz", "ms", "o"], m = 0; m < s.length && !window.requestAnimationFrame; ++m) window.requestAnimationFrame = window[s[m] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[s[m] + "CancelAnimationFrame"] || window[s[m] + "CancelRequestAnimationFrame"];
		window.requestAnimationFrame || (window.requestAnimationFrame = function(a, t) { var n = (new Date).getTime(),
				e = Math.max(0, 16 - (n - o)),
				r = window.setTimeout(function() { a(n + e) }, e); return o = n + e, r }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) { clearTimeout(a) }); var u = this; if (u.options = { useEasing: !0, useGrouping: !0, separator: ",", decimal: ".", easingFn: null, formattingFn: null, prefix: "", suffix: "" }, i && "object" == typeof i)
			for (var l in u.options) i.hasOwnProperty(l) && (u.options[l] = i[l]); "" === u.options.separator && (u.options.useGrouping = !1), u.version = function() { return "1.8.2" }, u.d = "string" == typeof a ? document.getElementById(a) : a, u.startVal = Number(t), u.endVal = Number(n), u.countDown = u.startVal > u.endVal, u.frameVal = u.startVal, u.decimals = Math.max(0, e || 0), u.dec = Math.pow(10, u.decimals), u.duration = 1e3 * Number(r) || 2e3, u.formatNumber = function(a) { a = a.toFixed(u.decimals), a += ""; var t, n, e, r; if (t = a.split("."), n = t[0], e = t.length > 1 ? u.options.decimal + t[1] : "", r = /(\d+)(\d{3})/, u.options.useGrouping)
				for (; r.test(n);) n = n.replace(r, "$1" + u.options.separator + "$2"); return u.options.prefix + n + e + u.options.suffix }, u.easeOutExpo = function(a, t, n, e) { return n * (-Math.pow(2, -10 * a / e) + 1) * 1024 / 1023 + t }, u.easingFn = u.options.easingFn ? u.options.easingFn : u.easeOutExpo, u.formattingFn = u.options.formattingFn ? u.options.formattingFn : u.formatNumber, u.printValue = function(a) { var t = u.formattingFn(a); "INPUT" === u.d.tagName ? this.d.value = t : "text" === u.d.tagName || "tspan" === u.d.tagName ? this.d.textContent = t : this.d.innerHTML = t }, u.count = function(a) { u.startTime || (u.startTime = a), u.timestamp = a; var t = a - u.startTime;
			u.remaining = u.duration - t, u.options.useEasing ? u.countDown ? u.frameVal = u.startVal - u.easingFn(t, 0, u.startVal - u.endVal, u.duration) : u.frameVal = u.easingFn(t, u.startVal, u.endVal - u.startVal, u.duration) : u.countDown ? u.frameVal = u.startVal - (u.startVal - u.endVal) * (t / u.duration) : u.frameVal = u.startVal + (u.endVal - u.startVal) * (t / u.duration), u.countDown ? u.frameVal = u.frameVal < u.endVal ? u.endVal : u.frameVal : u.frameVal = u.frameVal > u.endVal ? u.endVal : u.frameVal, u.frameVal = Math.round(u.frameVal * u.dec) / u.dec, u.printValue(u.frameVal), t < u.duration ? u.rAF = requestAnimationFrame(u.count) : u.callback && u.callback() }, u.start = function(a) { return u.callback = a, u.rAF = requestAnimationFrame(u.count), !1 }, u.pauseResume = function() { u.paused ? (u.paused = !1, delete u.startTime, u.duration = u.remaining, u.startVal = u.frameVal, requestAnimationFrame(u.count)) : (u.paused = !0, cancelAnimationFrame(u.rAF)) }, u.reset = function() { u.paused = !1, delete u.startTime, u.startVal = t, cancelAnimationFrame(u.rAF), u.printValue(u.startVal) }, u.update = function(a) { cancelAnimationFrame(u.rAF), u.paused = !1, delete u.startTime, u.startVal = u.frameVal, u.endVal = Number(a), u.countDown = u.startVal > u.endVal, u.rAF = requestAnimationFrame(u.count) }, u.printValue(u.startVal) }; return e });