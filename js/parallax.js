// Модуль параллакса мышью
/*
Предмету, который будет двигаться за мышью указать атрибут data-prlx-mouse

Если нужны доп настройки, указать:

Атрибут                         Значение по умолч.
data-prlx-cx="коэфф_x"             100               чем больше - меньше процент
data-prlx-cy="коэфф_y"             100               чем больше - меньше процент
data-prlx-dxr........................................против оси X
data-prlx-dyr........................................против оси Y
data-prlx-a="скорость_анимации"     50               чем больше - больше скорость

Если нужно считывать движение мыши в блоке-родителе - тому родителю указать атрибут data-prlx-mouse-wrapper

Если в параллаксе картинка - растянуть её на >100%
Например:
width: 130%;
height: 130%;
top: -15%;
left: -15%;
*/

window.onload = function (){
	const parallaxMouse = document.querySelectorAll('[data-prlx-mouse]');
	if (parallaxMouse) {
		parallaxMouse.forEach(el => {

			const parallaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]');
			// Коэф. Х
			const paramCoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
			// Коэф. Y
			const paramCoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
			// Напр. Х
			const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1;
			// Напр. Y
			const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1;
			//Скорость анимации
			const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;

			//Объявление переменных
			let positionX = 0, positionY = 0;
			let coordXprocent = 0, coordYprocent = 0;
			setMouseParallaxStyle();
			//Проверяю на наличие родителя, в котором будет считываться положение мыши
			if (parallaxMouseWrapper) {
				mouseMoveParallax(parallaxMouseWrapper);
			} else {
				mouseMoveParallax();
			}

			function setMouseParallaxStyle() {
				const distX = coordXprocent - positionX;
				const distY = coordYprocent - positionY;
				positionX = positionX + (distX * paramAnimation / 1000);
				positionY = positionY + (distY * paramAnimation / 1000);
				el.style.cssText = `transform: translate3D(${directionX * positionX / (paramCoefficientX / 10)}%,${directionY * positionY / (paramCoefficientY / 10)}%,0);`;
				requestAnimationFrame(setMouseParallaxStyle);
			}
			function mouseMoveParallax(wrapper = window) {
				wrapper.addEventListener("mousemove", function (e) {
					const offsetTop = el.getBoundingClientRect().top + window.scrollY;
					if (offsetTop >= window.scrollY || (offsetTop + el.offsetHeight) >= window.scrollY) {
						//Получение ширины и высоты блока
						const parallaxWidth = window.innerWidth;
						const parallaxHeight = window.innerHeight;
						//Ноль по середине
						const coordX = e.clientX - parallaxWidth / 2;
						const coordY = e.clientY - parallaxHeight / 2;
						//Получаем проценты
						coordXprocent = coordX / parallaxWidth * 100;
						coordYprocent = coordY / parallaxHeight * 100;
					}
				});
			}
		});
	}
}