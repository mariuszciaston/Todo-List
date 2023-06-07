/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const displayController = (() => {
	const addTaskBtn = document.querySelector('#add-task-btn');
	const loadExample = document.querySelector('#load-example-btn');
	let taskCount = 0;

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

	addTaskBtn.addEventListener('click', () => {
		const inputTask = prompt('Please enter task content', '');
		addTask(inputTask);
	});

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



const logicController = (() => {
	const circles = document.querySelectorAll('.tasks-list li .circle');
	circles.forEach((circle) => {
		circle.addEventListener('click', () => {
			circle.parentElement.classList.toggle('done');
		});
	});

	const stars = document.querySelectorAll('.tasks-list li .star');
	stars.forEach((star) => {
		star.addEventListener('click', () => {
			star.classList.toggle('yellow');
		});
	});

	const removes = document.querySelectorAll('.tasks-list li .remove');
	removes.forEach((remove) => {
		remove.addEventListener('click', () => {
			remove.parentElement.remove();
		});
	});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSwwQkFBMEIsVUFBVTtBQUNwQyxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21pbmltYWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGlzcGxheUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuXHRjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLWJ0bicpO1xuXHRjb25zdCBsb2FkRXhhbXBsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkLWV4YW1wbGUtYnRuJyk7XG5cdGxldCB0YXNrQ291bnQgPSAwO1xuXG5cdGNvbnN0IGFkZFRhc2sgPSAoaW5wdXRUYXNrKSA9PiB7XG5cdFx0aWYgKGlucHV0VGFzaykge1xuXHRcdFx0Y29uc3QgdGFza3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWxpc3QnKTtcblx0XHRcdGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRcdGNvbnN0IGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0Y29uc3QgY2hlY2tNYXJrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRjb25zdCBzdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRjb25zdCByZW1vdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0Y2lyY2xlLmNsYXNzTmFtZSA9ICdjaXJjbGUnO1xuXHRcdFx0Y2hlY2tNYXJrLmNsYXNzTmFtZSA9ICdjaGVja01hcmsnO1xuXHRcdFx0dGFza0NvbnRlbnQuY2xhc3NOYW1lID0gJ3Rhc2stY29udGVudCc7XG5cdFx0XHRkYXRlLmNsYXNzTmFtZSA9ICdkYXRlJztcblx0XHRcdHN0YXIuY2xhc3NOYW1lID0gJ3N0YXInO1xuXHRcdFx0cmVtb3ZlLmNsYXNzTmFtZSA9ICdyZW1vdmUnO1xuXG5cdFx0XHR0YXNrQ29udGVudC50ZXh0Q29udGVudCA9IGlucHV0VGFzaztcblx0XHRcdGRhdGUudGV4dENvbnRlbnQgPSAnbm8gZGF0ZSBzZXQnO1xuXG5cdFx0XHRsaS5hcHBlbmQoY2lyY2xlKTtcblx0XHRcdGNpcmNsZS5hcHBlbmQoY2hlY2tNYXJrKTtcblx0XHRcdGxpLmFwcGVuZCh0YXNrQ29udGVudCk7XG5cdFx0XHRsaS5hcHBlbmQoZGF0ZSk7XG5cdFx0XHRsaS5hcHBlbmQoc3Rhcik7XG5cdFx0XHRsaS5hcHBlbmQocmVtb3ZlKTtcblx0XHRcdHRhc2tzTGlzdC5wcmVwZW5kKGxpKTtcblx0XHR9XG5cdH07XG5cblx0YWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRjb25zdCBpbnB1dFRhc2sgPSBwcm9tcHQoJ1BsZWFzZSBlbnRlciB0YXNrIGNvbnRlbnQnLCAnJyk7XG5cdFx0YWRkVGFzayhpbnB1dFRhc2spO1xuXHR9KTtcblxuXHRsb2FkRXhhbXBsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHR0YXNrQ291bnQgKz0gMTtcblx0XHRhZGRUYXNrKGBFeGFtcGxlIHRhc2sgJHt0YXNrQ291bnR9YCk7XG5cdH0pO1xuXG5cdC8vIEhhbWJ1cmdlciBtZW51XG5cdGNvbnN0IGhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoYW1idXJnZXInKTtcblx0Y29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG5cblx0aGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdG1haW4uY2xhc3NMaXN0LnRvZ2dsZSgnc2lkZWJhci10b2dnbGUnKTtcblx0XHRoYW1idXJnZXIuY2xhc3NMaXN0LnRvZ2dsZSgnY2hhbmdlJyk7XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIHNob3dTaWRlYmFyKCkge1xuXHRcdGlmICh3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogODAwcHgpJykubWF0Y2hlcykge1xuXHRcdFx0bWFpbi5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyLXRvZ2dsZScpO1xuXHRcdFx0aGFtYnVyZ2VyLmNsYXNzTGlzdC5hZGQoJ2NoYW5nZScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYWluLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXItdG9nZ2xlJyk7XG5cdFx0XHRoYW1idXJnZXIuY2xhc3NMaXN0LnJlbW92ZSgnY2hhbmdlJyk7XG5cdFx0fVxuXHR9XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcblx0XHRzaG93U2lkZWJhcigpO1xuXHR9KTtcblxuXHRzaG93U2lkZWJhcigpO1xuXG5cdHJldHVybiB7IGFkZFRhc2sgfTtcbn0pKCk7XG5cbmRpc3BsYXlDb250cm9sbGVyLmFkZFRhc2soJ0ZpbmlzaCBUaGUgT2RpbiBQcm9qZWN0ICcpO1xuZGlzcGxheUNvbnRyb2xsZXIuYWRkVGFzaygnQ29ucXVlciB0aGUgQ3Jvd24gb2YgUG9saXNoIE1vdW50YWlucycpO1xuZGlzcGxheUNvbnRyb2xsZXIuYWRkVGFzaygnR2V0IGhpcmVkIGFzIGEgRnJvbnQgRW5kIERldmVsb3BlcicpO1xuZGlzcGxheUNvbnRyb2xsZXIuYWRkVGFzaygnR28gc3dpbW1pbmcgb24gVHVlc2RheScpO1xuZGlzcGxheUNvbnRyb2xsZXIuYWRkVGFzaygnQmFrZSBOZWFwb2xpdGFuIHBpenphJyk7XG5cblxuXG5jb25zdCBsb2dpY0NvbnRyb2xsZXIgPSAoKCkgPT4ge1xuXHRjb25zdCBjaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tzLWxpc3QgbGkgLmNpcmNsZScpO1xuXHRjaXJjbGVzLmZvckVhY2goKGNpcmNsZSkgPT4ge1xuXHRcdGNpcmNsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGNpcmNsZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2RvbmUnKTtcblx0XHR9KTtcblx0fSk7XG5cblx0Y29uc3Qgc3RhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza3MtbGlzdCBsaSAuc3RhcicpO1xuXHRzdGFycy5mb3JFYWNoKChzdGFyKSA9PiB7XG5cdFx0c3Rhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdHN0YXIuY2xhc3NMaXN0LnRvZ2dsZSgneWVsbG93Jyk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGNvbnN0IHJlbW92ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza3MtbGlzdCBsaSAucmVtb3ZlJyk7XG5cdHJlbW92ZXMuZm9yRWFjaCgocmVtb3ZlKSA9PiB7XG5cdFx0cmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0cmVtb3ZlLnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG5cdFx0fSk7XG5cdH0pO1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==