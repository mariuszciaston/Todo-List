import List from './list';
// import Task from './task'
import ListsManager from './manage';

// TEST
const masterList = new ListsManager();
masterList.addList('Shopping');
masterList.addList('Movies to watch');
masterList.addTaskToList('TASKS', 'Bake Neapolitan pizza');
masterList.addTaskToList('TASKS', 'Go swimming on Tuesday');
masterList.addTaskToList('TASKS', 'Get hired as a Front End Developer');
masterList.addTaskToList('TASKS', 'Conquer the Crown of Polish Mountains');
masterList.addTaskToList('TASKS', 'Finish The Odin Project');

masterList.addTaskToList('TODAY', '1234');

masterList.toggleIsDoneInTask('TASKS', 'Finish The Odin Project');
masterList.toggleStarInTask('TASKS', 'Finish The Odin Project');

console.table(masterList.getLists());

export default class UI {
	static load() {
		UI.hamburgerMenuControl();
		UI.displayLists();
		UI.displayTasks();

		UI.selectList();
	}

	static hamburgerMenuControl() {
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
	}

	static displayLists() {
		const firstList = document.querySelector('#first-list');
		const secondList = document.querySelector('#second-list');
		const listOne = masterList.getLists().slice(0, 3);
		const listTwo = masterList.getLists().slice(3);

		listOne.forEach((list) => {
			const button = document.createElement('button');
			button.className = 'button nav-btn';
			if (list.name === 'TASKS') {
				button.classList.add('active');
			}
			button.textContent = list.name;
			firstList.appendChild(button);
		});

		listTwo.forEach((list) => {
			const button = document.createElement('button');
			button.className = 'button nav-btn';
			button.textContent = list.name;
			secondList.appendChild(button);
		});
	}

	static displayTasks() {
		const navButtons = document.querySelectorAll('.nav-btn');
		const tasksList = document.querySelector('.tasks-list');
		tasksList.textContent = '';

		navButtons.forEach((button) => {
			if (button.classList.contains('active')) {
				masterList
					.findList(button.textContent)
					.getTasks()
					.forEach((task) => {
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

						if (task.isDone) {
							li.classList.add('done');
						} else {
							li.classList.remove('done');
						}

						taskContent.textContent = task.name;
						date.textContent = task.date;

						if (task.star) {
							star.classList.add('yellow');
						} else {
							star.classList.remove('yellow');
						}

						li.append(circle);
						circle.append(checkMark);
						li.append(taskContent);
						li.append(date);
						li.append(star);
						li.append(remove);
						tasksList.prepend(li);
					});
			}
		});
	}

	static selectList() {
		const navButtons = document.querySelectorAll('nav .nav-btn');

		navButtons.forEach((button) => {
			button.addEventListener('click', (e) => {
				if (!e.target.classList.contains('active')) {
					navButtons.forEach((button) => {
						button.classList.remove('active');
					});

					e.target.classList.add('active');

					UI.displayTasks();
				}
			});
		});
	}
}
