/* eslint-disable no-alert */
// import List from './list';
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

// console.table(masterList.getLists());

export default class UI {
	static getElements = () => {
		const hamburger = document.querySelector('#hamburger');
		const main = document.querySelector('.main');
		return { hamburger, main };
	};

	static hamburgerAutoToggle() {
		const { hamburger, main } = UI.getElements();
		if (window.matchMedia('(min-width: 800px)').matches) {
			hamburger.classList.add('open');
			main.classList.remove('sidebar-toggle');
		} else {
			hamburger.classList.remove('open');
			main.classList.add('sidebar-toggle');
		}
	}

	static hamburgerManualToggle() {
		const { hamburger, main } = UI.getElements();
		hamburger.classList.toggle('open');
		main.classList.toggle('sidebar-toggle');
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
			if (list.name === 'THIS WEEK') {
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

		const tasksTitle = document.querySelector('.content .title');

		(function updateTitle() {
			navButtons.forEach((button) => {
				if (button.classList.contains('active')) {
					tasksTitle.textContent = button.textContent;
				}
			});
		})();

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
			let listInputField = secondList.querySelector('input');
			if (!listInputField) {
				const inputContainer = document.createElement('div');
				inputContainer.className = 'input-container';
				secondList.append(inputContainer);

				listInputField = document.createElement('input');
				listInputField.type = 'text';
				listInputField.className = 'input-field';
				inputContainer.append(listInputField);
				listInputField.focus();

				const inputBtns = document.createElement('div');
				inputBtns.className = 'input-btns';
				inputContainer.append(inputBtns);

				const addBtn = document.createElement('button');
				const cancelBtn = document.createElement('button');

				addBtn.className = 'add-btn action';
				cancelBtn.className = 'cancel-btn action';
				addBtn.textContent = 'Add';
				cancelBtn.textContent = 'Cancel';

				inputBtns.append(addBtn);
				inputBtns.append(cancelBtn);

				const addBtnPress = () => {
					listInputField = secondList.querySelector('input');
					if (listInputField) {
						if (masterList.findList(listInputField.value)) {
							alert('List with this name already exists');
						} else if (listInputField.value === '' || listInputField.value === null) {
							alert('List name cannot be empty');
						} else if (!masterList.findList(listInputField.value) && listInputField.value !== '') {
							masterList.addList(listInputField.value);
							inputContainer.remove();
							UI.displayLists();

							const navButtons = document.querySelectorAll('nav .nav-btn');
							navButtons.forEach((button) => {
								if (button.textContent === listInputField.value) {
									button.classList.add('active');
								} else {
									button.classList.remove('active');
								}
							});
							UI.displayTasks();
							UI.selectList();
							UI.addNewList();
							UI.addNewTask();
						}
					}
				};

				const cancelBtnPress = () => {
					inputContainer.remove();
					UI.addNewList();
					UI.addNewTask();
				};

				addBtn.addEventListener('click', addBtnPress);
				cancelBtn.addEventListener('click', cancelBtnPress);

				document.addEventListener('keydown', (e) => {
					if (e.key === 'Enter') {
						addBtnPress();
					} else if (e.key === 'Escape') {
						cancelBtnPress();
					}
				});
			}
		});
	}

	static addNewTask() {
		const newTaskBtn = document.querySelector('#add-task-btn');
		const tasksList = document.querySelector('.tasks');

		newTaskBtn.addEventListener('click', () => {
			let taskInputField = tasksList.querySelector('input');
			if (!taskInputField) {
				const inputContainer = document.createElement('div');
				inputContainer.className = 'input-container';
				tasksList.append(inputContainer);

				taskInputField = document.createElement('input');
				taskInputField.type = 'text';
				taskInputField.className = 'input-field';
				inputContainer.append(taskInputField);
				taskInputField.focus();

				const inputBtns = document.createElement('div');
				inputBtns.className = 'input-btns';
				inputContainer.append(inputBtns);

				const addBtn = document.createElement('button');
				const cancelBtn = document.createElement('button');

				addBtn.className = 'add-btn action';
				cancelBtn.className = 'cancel-btn action';
				addBtn.textContent = 'Add';
				cancelBtn.textContent = 'Cancel';

				inputBtns.append(addBtn);
				inputBtns.append(cancelBtn);

				const addBtnPress = () => {
					const activeButton = document.querySelector('nav .nav-btn.active');
					const currentList = activeButton.textContent;

					taskInputField = tasksList.querySelector('input');
					if (taskInputField) {
						if (masterList.findTaskInList(currentList, taskInputField.value)) {
							alert('Task with this name already exists');
						} else if (taskInputField.value === '') {
							alert('Task name cannot be empty');
						} else if (taskInputField.value !== null) {
							masterList.addTaskToList(currentList, taskInputField.value);
							inputContainer.remove();
							UI.displayTasks();
						}
					}
				};
				const cancelBtnPress = () => {
					inputContainer.remove();
					UI.addNewList();
					UI.addNewTask();
				};

				addBtn.addEventListener('click', addBtnPress);
				cancelBtn.addEventListener('click', cancelBtnPress);
			}
		});
	}

	static attachEventListeners() {
		const { hamburger } = UI.getElements();
		hamburger.addEventListener('click', UI.hamburgerManualToggle);
		window.addEventListener('resize', UI.hamburgerAutoToggle);
	}

	static loadUserInterface() {
		UI.getElements();

		UI.hamburgerAutoToggle();
		UI.displayLists();
		UI.displayTasks();
		UI.selectList();
		UI.addNewList();
		UI.addNewTask();

		UI.attachEventListeners();
	}
}

document.addEventListener('keydown', (e) => {
	const inputContainer = document.querySelector('.input-container');
	if (inputContainer) {
		if (e.key === 'Enter') {
			const addBtn = inputContainer.querySelector('.add-btn');
			addBtn.click();
		} else if (e.key === 'Escape') {
			const cancelBtn = inputContainer.querySelector('.cancel-btn');
			cancelBtn.click();
		}
	}
});
