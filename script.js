const hamburger = document.querySelector('#hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
	nav.classList.toggle('sidebar-toggle');
	hamburger.classList.toggle('change');
});

function showSidebar() {
	if (window.matchMedia('(min-width: 768px)').matches) {
		hamburger.classList.add('change');
		nav.classList.remove('sidebar-toggle');
	} else {
		hamburger.classList.remove('change');
		nav.classList.add('sidebar-toggle');
	}
}

window.addEventListener('resize', () => {
	showSidebar();
});

showSidebar();
