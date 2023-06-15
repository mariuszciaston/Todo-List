/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */

// LOGIC --------------------------------------------------------------

const tasksArray = [];

function createTask(todo) {
	if (todo) {
		tasksArray.push({ isDone: false, todo, date: 'no date', star: false });
		displayTask();
	}
}

// UI -----------------------------------------------------------------

(function hamburgerMenuControl() {
	const hamburger = document.querySelector('#hamburger');
	const main = document.querySelector('.main');

	const manualToggle = () => {
		main.classList.toggle('sidebar-toggle');
		hamburger.classList.toggle('change');
	};

	const autoToggle = () => {
		if (window.matchMedia('(min-width: 800px)').matches) {
			main.classList.remove('sidebar-toggle');
			hamburger.classList.add('change');
		} else {
			main.classList.add('sidebar-toggle');
			hamburger.classList.remove('change');
		}
	};
	autoToggle();

	hamburger.addEventListener('click', manualToggle);
	window.addEventListener('resize', autoToggle);
})();

function displayTask() {
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

	taskContent.textContent = tasksArray[tasksArray.length - 1].todo;
	date.textContent = tasksArray[tasksArray.length - 1].date;

	li.append(circle);
	circle.append(checkMark);
	li.append(taskContent);
	li.append(date);
	li.append(star);
	li.append(remove);
	tasksList.prepend(li);
}

const addTaskBtn = document.querySelector('#add-task-btn');
const loadExampleBtn = document.querySelector('#load-example-btn');
let taskCount = 0;

addTaskBtn.addEventListener('click', () => {
	createTask(prompt('Please enter task content', ''));
});

loadExampleBtn.addEventListener('click', () => {
	taskCount += 1;
	createTask(`Example task ${taskCount}`);
});

createTask('Finish The Odin Project ');
createTask('Conquer the Crown of Polish Mountains');
createTask('Get hired as a Front End Developer');
createTask('Go swimming on Tuesday');
createTask('Bake Neapolitan pizza');
