

// Smooth menu
document.addEventListener("click", documentActions);
function documentActions(e) {
	const targetElement = e.target;
	/*if (targetElement.closest('.icon-menu')) {
		document.documentElement.classList.toggle('_active');
	}*/
	if (targetElement.closest('[data-goto]')) {
		//document.documentElement.classList.contains('_active') ?
		//document.documentElement.classList.remove('_active') : null;
		menu_close();
		body_lock_remove();
		const goTo = targetElement.closest('[data-goto]').dataset.goto;
		const goToElement = document.querySelector(goTo);
		const headerHeight = document.querySelector('.header').offsetHeight;
		if (goToElement) {
			window.scrollTo({
				top: goToElement.offsetTop - (headerHeight + 50),
				behavior: "smooth"
			});
		}
		e.preventDefault();
	}
}

// Header
const headerElement = document.querySelector('.header');

const callback = function (entries, observer) {
	if (entries[0].isIntersecting) {
		headerElement.classList.remove('_scroll');
	} else {
		headerElement.classList.add('_scroll');
	}
};

const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);


// Анимация при скролле
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	setTimeout(() => {
		animOnScroll();
	}, 300);
}