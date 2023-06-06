const addTaskBtn = document.querySelector('#add-task-btn');
const loadExample = document.querySelector('#load-example-btn');

const addTask = (inputTask) => {
	const tasksList = document.querySelector('.tasks-list');
	const task = document.createElement('li');
	tasksList.prepend(task);

	const circle = document.createElement('div');
	circle.className = 'circle';
	task.appendChild(circle);

	const checkMark = document.createElement('div');
	checkMark.className = 'checkMark';
	circle.appendChild(checkMark);

	const taskContent = document.createElement('p');
	taskContent.className = 'task-content';
	taskContent.textContent = inputTask;
	task.appendChild(taskContent);

	const date = document.createElement('p');
	date.className = 'date';
	date.textContent = 'no date set';
	task.appendChild(date);

	const star = document.createElement('div');
	star.className = 'star';
	task.appendChild(star);

	const remove = document.createElement('div');
	remove.className = 'remove';
	task.appendChild(remove);
};

addTaskBtn.addEventListener('click', () => {
	const inputTask = prompt('Please enter task content', '');
	addTask(inputTask);
});

loadExample.addEventListener('click', () => {
	const inputTask = 'Example task';
	addTask(inputTask);
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
