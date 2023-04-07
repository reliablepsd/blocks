// function on
jQuery(document).ready(function() {
	initTabsToAccordion();
});
// function init
function initTabsToAccordion() {
	var animSpeed = 500;
	var win = $(window);
	var isAccordionMode = true;
	var tabWrap = $(".tab-to-accordion");
	var tabContainer = tabWrap.find(".tab-container");
	var tabItem = tabContainer.children("div[id]");
	var tabsetList = tabWrap.find(".tabset-list");
	var tabsetLi = tabsetList.find("li");
	var tabsetItem = tabsetList.find("a");
	var activeId = tabsetList
		.find(".active")
		.children()
		.attr("href");
	cloneTabsToAccordion();
	accordionMode();
	tabsToggle();
	hashToggle();
	win.on("resize orientationchange", accordionMode);
	function cloneTabsToAccordion() {
		$(tabsetItem).each(function() {
			var $this = $(this);
			var activeClass = $this.parent().hasClass("active");
			var listItem = $this.attr("href");
			var listTab = $(listItem);
			if (activeClass) {
				var activeClassId = listItem;
				listTab.show();
			}
			var itemContent = $this.clone();
			var itemTab = $this.attr("href");
			if (activeClassId) {
				itemContent
					.insertBefore(itemTab)
					.wrap('<div class="accordion-item active"></div>');
			} else {
				itemContent
					.insertBefore(itemTab)
					.wrap('<div class="accordion-item"></div>');
			}
		});
	}
	function accordionMode() {
		var liWidth = Math.round(tabsetLi.outerWidth());
		var liCount = tabsetLi.length;
		var allLiWidth = liWidth * liCount;
		var tabsetListWidth = tabsetList.outerWidth();
		if (tabsetListWidth <= allLiWidth) {
			isAccordionMode = true;
			tabWrap.addClass("accordion-mod");
		} else {
			isAccordionMode = false;
			tabWrap.removeClass("accordion-mod");
		}
	}
	function tabsToggle() {
		tabItem.hide();
		$(activeId).show();
		$(tabWrap).on("click", 'a[href^="#tab"]', function(e) {
			e.preventDefault();
			var $this = $(this);
			var activeId = $this.attr("href");
			var activeTabSlide = $(activeId);
			var activeOpener = tabWrap.find('a[href="' + activeId + '"]');
			$('a[href^="#tab"]')
				.parent()
				.removeClass("active");
			activeOpener.parent().addClass("active");
			if (isAccordionMode) {
				tabItem.stop().slideUp(animSpeed);
				activeTabSlide.stop().slideDown(animSpeed);
			} else {
				tabItem.hide();
				activeTabSlide.show();
			}
		});
	}
	function hashToggle() {
		var hash = location.hash;
		var activeId = hash;
		var activeTabSlide = $(activeId);
		var activeOpener = tabWrap.find('a[href="' + activeId + '"]');
		if ($(hash).length > 0) {
			$('a[href^="#tab"]')
				.parent()
				.removeClass("active");
			activeOpener.parent().addClass("active");
			tabItem.hide();
			activeTabSlide.show();
			win
				.scrollTop(activeTabSlide.offset().top)
				.scrollLeft(activeTabSlide.offset().left);
		}
	}
}