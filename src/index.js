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
