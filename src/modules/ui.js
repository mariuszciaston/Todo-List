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
		UI.addNewList();
		// UI.addNewTask();
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
		firstList.textContent = '';
		secondList.textContent = '';

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
		const navButtons = document.querySelectorAll('nav .nav-btn');
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
					navButtons.forEach((btn) => {
						btn.classList.remove('active');
					});

					e.target.classList.add('active');
					UI.displayTasks();
				}
			});
		});
	}

	static addNewList() {
		const newListBtn = document.querySelector('#new-list-btn');

		const secondList = document.querySelector('#second-list');
		newListBtn.addEventListener('click', () => {
			let inputField = secondList.querySelector('input');
			if (!inputField) {
				inputField = document.createElement('input');
				inputField.type = 'text';
				inputField.className = 'input-field';
				secondList.append(inputField);
				inputField.focus();

				const inputBtns = document.createElement('div');
				inputBtns.className = 'input-btns';
				secondList.append(inputBtns);

				const addBtn = document.createElement('button');
				const cancelBtn = document.createElement('button');

				addBtn.className = 'add-btn action';
				cancelBtn.className = 'cancel-btn action';
				addBtn.textContent = 'Add';
				cancelBtn.textContent = 'Cancel';

				inputBtns.append(addBtn);
				inputBtns.append(cancelBtn);

				const addBtnPress = () => {
					if (!masterList.findList(inputField.value) && inputField.value !== '') {
						masterList.addList(inputField.value);
						inputField.remove();
						inputBtns.remove();
						UI.displayLists();

						const navButtons = document.querySelectorAll('nav .nav-btn');

						navButtons.forEach((button) => {
							if (button.textContent === inputField.value) {
								button.classList.add('active');
							} else {
								button.classList.remove('active');
							}
						});

						UI.displayTasks();
						UI.selectList();
						UI.addNewList();
						// UI.addNewTask();
						console.log(masterList.getLists());
					} else {
						alert('List with this name already exists or input field is empty');
					}
				};

				addBtn.addEventListener('click', addBtnPress);

				document.addEventListener('keydown', (e) => {
					if (e.key === 'Enter') {
						addBtnPress();
					}
				});

				const cancelBtnPress = () => {
					inputField.remove();
					inputBtns.remove();
					UI.addNewList();
					// UI.addNewTask();
				};

				cancelBtn.addEventListener('click', cancelBtnPress);

				document.addEventListener('keydown', (e) => {
					if (e.key === 'Escape') {
						cancelBtnPress();
					}
				});
			}
		});
	}

	// static addNewTask() {
	// 	const navButtons = document.querySelectorAll('nav .nav-btn');
	// 	let currentList = '';

	// 	navButtons.forEach((button) => {
	// 		if (button.classList.contains('active')) {
	// 			currentList = button.textContent;
	// 			// console.log(currentList);
	// 		}
	// 		return currentList;
	// 	});

	// 	const newTask = document.querySelector('#add-task-btn');
	// 	newTask.addEventListener('click', () => {
	// 		const newTaskName = prompt('Please enter task name', 'random task');

	// 		if (masterList.findTaskInList(currentList, newTaskName)) {
	// 			alert('Task with this name already exists');
	// 		} else if (newTaskName === '' || newTaskName === null) {
	// 			alert('Task name cannot be empty');
	// 		} else {
	// 			masterList.addTaskToList(currentList, newTaskName);
	// 			UI.displayTasks();
	// 		}
	// 	});
	// }
}
