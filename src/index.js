
// Hamburger menu 
const hamburger = document.querySelector('#hamburger');
const main = document.querySelector('.main');

hamburger.addEventListener('click', () => {
	main.classList.toggle('sidebar-toggle');
	hamburger.classList.toggle('change');
});

function showSidebar() {
	if (window.matchMedia('(min-width: 800px)').matches) {
		main.classList.remove('sidebar-toggle');
		hamburger.classList.add('change');
	} else {
		main.classList.add('sidebar-toggle');
		hamburger.classList.remove('change');
	}
}

window.addEventListener('resize', () => {
	showSidebar();
});

showSidebar();
