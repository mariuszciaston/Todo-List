/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const displayController = (() => {
	const addTask = (inputTask) => {
		if (inputTask) {
			const tasksList = document.querySelector('.tasks-list');
			const li = document.createElement('li');
			const circle = document.createElement('div');
			const checkMark = document.createElement('div');
			const taskContent = document.createElement('p');
			const date = document.createElement('p');
			const star = document.createElement('div');
			const remove = document.createElement('div');

			circle.className = 'circle';
			checkMark.className = 'checkMark';
			taskContent.className = 'task-content';
			date.className = 'date';
			star.className = 'star';
			remove.className = 'remove';

			taskContent.textContent = inputTask;
			date.textContent = 'no date set';

			li.append(circle);
			circle.append(checkMark);
			li.append(taskContent);
			li.append(date);
			li.append(star);
			li.append(remove);
			tasksList.prepend(li);
		}
	};
	const addTaskBtn = document.querySelector('#add-task-btn');
	addTaskBtn.addEventListener('click', () => {
		const inputTask = prompt('Please enter task content', '');
		addTask(inputTask);
	});

	const loadExample = document.querySelector('#load-example-btn');
	let taskCount = 0;
	loadExample.addEventListener('click', () => {
		taskCount += 1;
		addTask(`Example task ${taskCount}`);
	});

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

	return { addTask };
})();

displayController.addTask('Finish The Odin Project ');
displayController.addTask('Conquer the Crown of Polish Mountains');
displayController.addTask('Get hired as a Front End Developer');
displayController.addTask('Go swimming on Tuesday');
displayController.addTask('Bake Neapolitan pizza');

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVU7QUFDcEMsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWluaW1hbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkaXNwbGF5Q29udHJvbGxlciA9ICgoKSA9PiB7XG5cdGNvbnN0IGFkZFRhc2sgPSAoaW5wdXRUYXNrKSA9PiB7XG5cdFx0aWYgKGlucHV0VGFzaykge1xuXHRcdFx0Y29uc3QgdGFza3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWxpc3QnKTtcblx0XHRcdGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRcdGNvbnN0IGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0Y29uc3QgY2hlY2tNYXJrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRjb25zdCBzdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRjb25zdCByZW1vdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0Y2lyY2xlLmNsYXNzTmFtZSA9ICdjaXJjbGUnO1xuXHRcdFx0Y2hlY2tNYXJrLmNsYXNzTmFtZSA9ICdjaGVja01hcmsnO1xuXHRcdFx0dGFza0NvbnRlbnQuY2xhc3NOYW1lID0gJ3Rhc2stY29udGVudCc7XG5cdFx0XHRkYXRlLmNsYXNzTmFtZSA9ICdkYXRlJztcblx0XHRcdHN0YXIuY2xhc3NOYW1lID0gJ3N0YXInO1xuXHRcdFx0cmVtb3ZlLmNsYXNzTmFtZSA9ICdyZW1vdmUnO1xuXG5cdFx0XHR0YXNrQ29udGVudC50ZXh0Q29udGVudCA9IGlucHV0VGFzaztcblx0XHRcdGRhdGUudGV4dENvbnRlbnQgPSAnbm8gZGF0ZSBzZXQnO1xuXG5cdFx0XHRsaS5hcHBlbmQoY2lyY2xlKTtcblx0XHRcdGNpcmNsZS5hcHBlbmQoY2hlY2tNYXJrKTtcblx0XHRcdGxpLmFwcGVuZCh0YXNrQ29udGVudCk7XG5cdFx0XHRsaS5hcHBlbmQoZGF0ZSk7XG5cdFx0XHRsaS5hcHBlbmQoc3Rhcik7XG5cdFx0XHRsaS5hcHBlbmQocmVtb3ZlKTtcblx0XHRcdHRhc2tzTGlzdC5wcmVwZW5kKGxpKTtcblx0XHR9XG5cdH07XG5cdGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2stYnRuJyk7XG5cdGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0Y29uc3QgaW5wdXRUYXNrID0gcHJvbXB0KCdQbGVhc2UgZW50ZXIgdGFzayBjb250ZW50JywgJycpO1xuXHRcdGFkZFRhc2soaW5wdXRUYXNrKTtcblx0fSk7XG5cblx0Y29uc3QgbG9hZEV4YW1wbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1leGFtcGxlLWJ0bicpO1xuXHRsZXQgdGFza0NvdW50ID0gMDtcblx0bG9hZEV4YW1wbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0dGFza0NvdW50ICs9IDE7XG5cdFx0YWRkVGFzayhgRXhhbXBsZSB0YXNrICR7dGFza0NvdW50fWApO1xuXHR9KTtcblxuXHQvLyBIYW1idXJnZXIgbWVudVxuXHRjb25zdCBoYW1idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGFtYnVyZ2VyJyk7XG5cdGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuXG5cdGhhbWJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRtYWluLmNsYXNzTGlzdC50b2dnbGUoJ3NpZGViYXItdG9nZ2xlJyk7XG5cdFx0aGFtYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoJ2NoYW5nZScpO1xuXHR9KTtcblxuXHRmdW5jdGlvbiBzaG93U2lkZWJhcigpIHtcblx0XHRpZiAod2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDgwMHB4KScpLm1hdGNoZXMpIHtcblx0XHRcdG1haW4uY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhci10b2dnbGUnKTtcblx0XHRcdGhhbWJ1cmdlci5jbGFzc0xpc3QuYWRkKCdjaGFuZ2UnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWFpbi5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyLXRvZ2dsZScpO1xuXHRcdFx0aGFtYnVyZ2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2NoYW5nZScpO1xuXHRcdH1cblx0fVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG5cdFx0c2hvd1NpZGViYXIoKTtcblx0fSk7XG5cblx0c2hvd1NpZGViYXIoKTtcblxuXHRyZXR1cm4geyBhZGRUYXNrIH07XG59KSgpO1xuXG5kaXNwbGF5Q29udHJvbGxlci5hZGRUYXNrKCdGaW5pc2ggVGhlIE9kaW4gUHJvamVjdCAnKTtcbmRpc3BsYXlDb250cm9sbGVyLmFkZFRhc2soJ0NvbnF1ZXIgdGhlIENyb3duIG9mIFBvbGlzaCBNb3VudGFpbnMnKTtcbmRpc3BsYXlDb250cm9sbGVyLmFkZFRhc2soJ0dldCBoaXJlZCBhcyBhIEZyb250IEVuZCBEZXZlbG9wZXInKTtcbmRpc3BsYXlDb250cm9sbGVyLmFkZFRhc2soJ0dvIHN3aW1taW5nIG9uIFR1ZXNkYXknKTtcbmRpc3BsYXlDb250cm9sbGVyLmFkZFRhc2soJ0Jha2UgTmVhcG9saXRhbiBwaXp6YScpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9