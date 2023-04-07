// function on
jQuery(document).ready(function() {
	svgAnimateCustomInit();
});
// function init
function svgAnimateCustomInit() {
	const calcPaths = (totalDur) => {
		// задаем класс 'animated' для body, что приведет к перезагрузке анимации
		document.body.classList.add('animated')
		// выбираем все SVG элементы - линии и точки
		const paths = document.querySelectorAll('.autograph__path')
		// объявляем переменную для длины path
		let len = 0
		// задаем переменную для времени задержки анимации
		let delay = 0
		// выходим если ни одного элемента не найдено
		if (!paths.length) {
			return false
		}
		// устанавливаем длительность анимации в секундах (если она не задана)
		const totalDuration = totalDur || 7
		// высчитываем общую длину path
		paths.forEach((path) => {
			const totalLen = path.getTotalLength()
			len += totalLen
		})
		paths.forEach((path) => {
			const pathElem = path
			// получаем текущую длину path
			const totalLen = path.getTotalLength()
			// получаем текущую продолжительность анимации
			const duration = totalLen / len * totalDuration
			// задаем задержку и продолжительность анимации
			pathElem.style.animationDuration = `${duration < 0.2 ? 0.2 : duration}s`
			pathElem.style.animationDelay = `${delay}s`
			// устанавливаем значения dasharray и dashoffset равными длине path
			// таким образом мы прячем линию
			pathElem.setAttribute('stroke-dasharray', totalLen)
			pathElem.setAttribute('stroke-dashoffset', totalLen)
			// устанавливаем задержку для следующего path
			// сейчас добавлено 0,2 секунды для большей реалистичности
			delay += duration + 0.2
		})
		// задаем для body класс 'animated' который запустит анимацию
		document.body.classList.add('animated')
		return true
	}
	calcPaths(10)
}