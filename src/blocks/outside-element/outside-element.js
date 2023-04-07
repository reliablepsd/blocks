// function on
jQuery(document).ready(function() {
	outsideElementInit(".oe-inner");
});

// просто функция для генерации рандомного цвета - можно удалить
function getRndColor() {
	return 'hsl(' + (360 * Math.random()) + ',50%,50%)'; // H,S,L
}

// function init
function outsideElementInit(classOutsideElement) {
	jQuery(document).mouseup(function(e) { // событие клика по веб-документу
		var div = jQuery(classOutsideElement);
		if (!div.is(e.target) // если клик был не по нашему блоку
			&& div.has(e.target).length === 0) { // и не по его дочерним элементам
			// что делать с елементом
			// div.hide(); // скрываем его
			var getRndColorVar = getRndColor();
			var getRndColorFull = "color:" + getRndColorVar;
			div.attr("style", getRndColorFull) // меняем цвет текста на рандомный
		}
	});
}