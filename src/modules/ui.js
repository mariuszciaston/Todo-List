import { format, parseISO, parse, isThisWeek, isToday, addDays } from 'date-fns';

import Storage from './storage';
import Sound from './sound';
import ContentExample from './content';

export default class UI {
	static lastWidth = window.innerWidth;

	static hamburgerAutoToggle() {
		const hamburger = document.querySelector('#hamburger');
		const main = document.querySelector('.main');
		if (window.matchMedia('(min-width: 800px)').matches) {
			hamburger.classList.add('open');
			main.classList.remove('sidebar-toggle');

			if (this.lastWidth < 800) {
				Sound.loadAudio().toggleSound.play();
			}
		} else {
			hamburger.classList.remove('open');
			main.classList.add('sidebar-toggle');

			if (this.lastWidth >= 800) {
				Sound.loadAudio().reverseToggleSound.play();
			}
		}
		this.lastWidth = window.innerWidth;
	}

	static hamburgerManualToggle(e) {
		const hamburger = document.querySelector('#hamburger');
		const main = document.querySelector('.main');
		hamburger.classList.toggle('open');
		main.classList.toggle('sidebar-toggle');

		if (e.target.closest('#hamburger.open')) {
			Sound.loadAudio().toggleSound.play();
		}

		if (e.target.closest('#hamburger:not(.open)')) {
			Sound.loadAudio().reverseToggleSound.play();
		}
	}

	static hamburgerManualClose(e) {
		const currentList = UI.getActiveList();
		if (e.target.textContent === currentList) {
			if (e.target.classList.contains('nav-btn')) {
				if (window.innerWidth < 800) {
					Sound.loadAudio().reverseToggleSound.play();
				}
			}
		}
	}

	static createList(list) {
		const button = document.createElement('button');
		button.className = 'button nav-btn';
		button.textContent = list.name;

		const remove = document.createElement('div');
		remove.className = 'remove';

		const btnWrap = document.createElement('div');
		btnWrap.className = 'btnWrap';

		btnWrap.append(button);
		btnWrap.append(remove);

		return { button, btnWrap };
	}

	static displayLists(activeList) {
		const listOne = Storage.masterList.getLists().slice(0, 3);
		const listTwo = Storage.masterList.getLists().slice(3);
		const firstList = document.querySelector('#first-list');
		const secondList = document.querySelector('#second-list');
		firstList.textContent = '';
		secondList.textContent = '';

		listOne.forEach((list) => {
			const { button } = this.createList(list);
			firstList.appendChild(button);
		});

		listTwo.forEach((list) => {
			const { btnWrap } = this.createList(list);
			secondList.appendChild(btnWrap);
		});

		this.setActiveList(activeList);
		this.addListHandlers(secondList);
	}

	static updateListName(inputField) {
		const tasksTitle = document.querySelector('.content .title');
		const tasksList = document.querySelector('.tasks-list');
		tasksTitle.textContent = inputField.value;
		if (!inputField.value) {
			tasksTitle.textContent = inputField;
		}
		this.displayLists(tasksTitle.textContent);
		this.addTaskHandlers(tasksList, tasksTitle);
	}

	static handleInputField(element, name, listName, isTask) {
		const inputField = this.createInputField(element, name);
		inputField.value = inputField.value.trim();
		let isEnterPressed = false;
		let isEscapePressed = false;

		const changeName = () => {
			if (isTask) {
				if (this.validateTaskName(inputField.value, 'one')) {
					Storage.masterList.changeTaskName(listName, name, inputField.value);
					this.displayTasks();
				} else {
					setTimeout(() => {
						this.displayTasks();
					}, 1000);
				}
			} else if (this.validateListName(inputField.value, 'one')) {
				Storage.masterList.changeListName(name, inputField.value);
				this.setActiveList(inputField.value);
				this.updateListName(inputField);
				this.selectList();
			} else {
				this.updateListName(this.getActiveList());
				this.selectList();
			}
		};

		const handleEnter = (k) => {
			if (inputField && k.key === 'Enter') {
				isEnterPressed = true;
				changeName();
			}
		};

		const handleEscape = (k) => {
			if (k.key === 'Escape') {
				isEscapePressed = true;
				this.displayTasks();
				window.removeEventListener('keydown', handleEscape);
			}
		};

		const handleBlur = () => {
			if (!isEnterPressed && !isEscapePressed) {
				changeName();
			}

			window.removeEventListener('keydown', handleEnter);
			window.removeEventListener('keydown', handleEscape);
			inputField.removeEventListener('blur', handleBlur);
		};
		window.addEventListener('keydown', handleEnter);
		window.addEventListener('keydown', handleEscape);
		inputField.addEventListener('blur', handleBlur);
	}

	static editName(e, isTask) {
		const listName = this.getActiveList();
		const element = e.target.closest(isTask ? '.task-content' : '.content .title');
		if (element && !element.contains(document.querySelector('.input-field'))) {
			const name = element.textContent;
			element.textContent = '';
			this.handleInputField(element, name, listName, isTask);
		}
	}

	static editListName(e) {
		if (e.target.textContent !== 'TASKS' && e.target.textContent !== 'TODAY' && e.target.textContent !== 'THIS WEEK') {
			this.editName(e, false);
		}
	}

	static editTaskName(e) {
		this.editName(e, true);
	}

	static editDate(e) {
		const element = e.target.closest('.date');
		const temp = element.textContent;

		if (!element.querySelector('.input-field')) {
			const dateField = this.createDateField(element);

			if (element.querySelector('.input-field')) {
				const currentList = this.getActiveList();
				const taskName = e.target.parentElement.querySelector('.task-content').textContent;

				const setTextContent = (value) => {
					element.textContent = value;
					window.removeEventListener('click', clickHandler);
					window.removeEventListener('keydown', keydownHandler);
				};

				const keydownHandler = (k) => {
					if (k.key === 'Enter') {
						if (dateField.value) {
							const dateFormatted = format(parseISO(dateField.value), 'dd/MM/yyyy');
							Storage.masterList.changeTaskDate(currentList, taskName, dateFormatted);
							setTextContent(dateFormatted);
							this.displayTasks();
						} else {
							dateField.focus();
						}
					}
					if (k.key === 'Escape') {
						setTextContent(temp);
					}
				};

				const clickHandler = (c) => {
					if (!element.contains(c.target)) {
						if (dateField.value) {
							const dateFormatted = format(parseISO(dateField.value), 'dd/MM/yyyy');
							Storage.masterList.changeTaskDate(currentList, taskName, dateFormatted);
							setTextContent(dateFormatted);
							this.displayTasks();
						} else {
							Storage.masterList.changeTaskDate(currentList, taskName, 'set date');
							setTextContent('set date');
						}
					}
				};
				window.addEventListener('click', clickHandler);
				window.addEventListener('keydown', keydownHandler);
			}
		}
	}

	static getNextList(e) {
		let nextList;
		const parentElementSibling = e.target.parentElement.nextElementSibling;
		if (parentElementSibling) {
			const navBtn = parentElementSibling.querySelector('.nav-btn');
			if (navBtn) {
				nextList = navBtn.textContent;
			}
		}
		return nextList;
	}

	static updateActiveList(currentList, listName, nextList) {
		const lastList = Storage.masterList.getLists().slice(-1)[0].name;

		if (currentList !== listName) {
			this.setActiveList(currentList);
		} else if (nextList) {
			this.setActiveList(nextList);
		} else {
			this.setActiveList(lastList);
		}
	}

	static removeList(e) {
		const listName = e.target.parentElement.querySelector('.nav-btn').textContent;
		const currentList = this.getActiveList();
		const nextList = this.getNextList(e);

		Storage.masterList.deleteList(listName);
		this.displayLists();
		this.updateActiveList(currentList, listName, nextList);
		this.displayTasks();
		this.selectList();
		Sound.loadAudio().removeSound.play();
	}

	static addEventHandler(selector, event, handler, location) {
		const elements = location.querySelectorAll(selector);

		elements.forEach((element) => {
			element.addEventListener(event, handler.bind(this));
		});
	}

	static addListHandlers(secondList) {
		this.addEventHandler('.remove', 'click', this.removeList, secondList);
	}

	static createTask(task) {
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

		return li;
	}

	static disableListNameHover(tasksTitle) {
		if (tasksTitle.textContent === 'TASKS' || tasksTitle.textContent === 'TODAY' || tasksTitle.textContent === 'THIS WEEK') {
			tasksTitle.classList.add('default');
		} else {
			tasksTitle.classList.remove('default');
		}
	}

	static displayTasks() {
		const tasksTitle = document.querySelector('.content .title');
		const tasksList = document.querySelector('.tasks-list');
		const currentList = this.getActiveList();

		tasksList.textContent = '';
		tasksTitle.textContent = currentList;
		this.disableListNameHover(tasksTitle);

		if (tasksTitle.textContent !== 'TODAY' && tasksTitle.textContent !== 'THIS WEEK') {
			this.displayRegularTasks(tasksList, currentList);
		} else {
			this.displaySpecialTasks(tasksList, tasksTitle);
		}

		this.addTaskHandlers(tasksList, tasksTitle);
		this.disableAddTaskBtn();
	}

	static displayRegularTasks(tasksList, currentList) {
		Storage.masterList
			.findList(currentList)
			.getTasks()
			.forEach((task) => {
				tasksList.prepend(this.createTask(task));
			});
	}

	static displaySpecialTasks(tasksList, tasksTitle) {
		Storage.masterList.findList('TODAY').clearTasks();
		Storage.masterList.findList('THIS WEEK').clearTasks();

		Storage.masterList.getLists().forEach((list) => {
			if (list.name !== 'TODAY' && list.name !== 'THIS WEEK') this.addTasksToSpecialLists(list, tasksTitle);
		});

		this.displayTasksFromSpecialLists(tasksList);
	}

	static addTasksToSpecialLists(list, tasksTitle) {
		list.getTasks().forEach((task) => {
			if (task.date !== 'set date') {
				const taskDate = parseISO(format(parse(task.date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'));
				if (tasksTitle.textContent === 'TODAY' && isToday(taskDate)) {
					Storage.masterList.findList('TODAY').addTask(task);
				}

				if (tasksTitle.textContent === 'THIS WEEK' && isThisWeek(taskDate, { weekStartsOn: 1 })) {
					Storage.masterList.findList('THIS WEEK').addTask(task);
				}
			}
		});
	}

	static displayTasksFromSpecialLists(tasksList) {
		Storage.masterList
			.findList('TODAY')
			.getTasks()
			.forEach((task) => {
				tasksList.append(this.createTask(task));
			});

		Storage.masterList
			.findList('THIS WEEK')
			.getTasks()
			.sort((a, b) => {
				const dateA = parse(a.date, 'dd/MM/yyyy', new Date());
				const dateB = parse(b.date, 'dd/MM/yyyy', new Date());

				return dateA - dateB;
			})
			.forEach((task) => {
				tasksList.append(this.createTask(task));
			});
	}

	static toggleIsDone(e) {
		const listName = this.getActiveList();
		const taskName = e.target.parentElement.querySelector('.task-content').textContent;
		Storage.masterList.toggleIsDoneInTask(listName, taskName);
		this.displayTasks();
		(!e.target.parentElement.classList.contains('done') ? Sound.loadAudio().doneSound : Sound.loadAudio().reverseDoneSound).play();
	}

	static createInputField(task, taskName) {
		const inputField = document.createElement('input');
		inputField.className = 'input-field';
		inputField.type = 'text';
		task.append(inputField);
		inputField.value = taskName;
		inputField.focus();
		return inputField;
	}

	static createDateField(dateElement) {
		const dateField = document.createElement('input');
		dateField.type = 'date';
		dateField.className = 'input-field';
		dateField.min = '1900-01-01';
		dateField.max = '2100-12-31';

		if (dateElement.textContent !== 'set date') {
			dateField.value = format(parse(dateElement.textContent, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');
		}

		const clear = dateElement;
		clear.textContent = '';
		dateElement.append(dateField);
		dateField.focus();
		return dateField;
	}

	static toggleStar(e) {
		const listName = this.getActiveList();
		const taskName = e.target.parentElement.querySelector('.task-content').textContent;
		Storage.masterList.toggleStarInTask(listName, taskName);
		this.displayTasks();
		(!e.target.classList.contains('yellow') ? Sound.loadAudio().starSound : Sound.loadAudio().reverseStarSound).play();
	}

	static removeTask(e) {
		const listName = this.getActiveList();
		const taskName = e.target.parentElement.querySelector('.task-content').textContent;
		Storage.masterList.deleteTaskFromList(listName, taskName);

		if (listName === 'TODAY' || listName === 'THIS WEEK') {
			Storage.masterList.getLists().forEach((list) => {
				if (list.name !== 'TODAY' && list.name !== 'THIS WEEK') {
					Storage.masterList.deleteTaskFromList(list.name, taskName);
				}
			});
		}

		this.displayTasks();
		Sound.loadAudio().removeSound.play();
	}

	static addTaskHandlers(tasksList) {
		this.addEventHandler('.circle', 'click', this.toggleIsDone, tasksList);
		this.addEventHandler('.task-content', 'click', this.editTaskName, tasksList);
		this.addEventHandler('.date', 'click', this.editDate, tasksList);
		this.addEventHandler('.star', 'click', this.toggleStar, tasksList);
		this.addEventHandler('.remove', 'click', this.removeTask, tasksList);
	}

	static selectList() {
		const navButtons = document.querySelectorAll('nav .nav-btn');
		const removeActiveClass = () => navButtons.forEach((btn) => btn.classList.remove('active'));
		const addActiveClass = (target) => target.classList.add('active');

		navButtons.forEach((button) => {
			button.addEventListener('click', (e) => {
				if (!e.target.classList.contains('active')) {
					removeActiveClass();
					addActiveClass(e.target);
					this.displayTasks();
				}
				this.hamburgerAutoToggle();
			});
		});
		this.hamburgerAutoToggle();
	}

	static createInputContainer() {
		const inputDiv = document.createElement('div');
		inputDiv.className = 'input-container';

		const inputField = document.createElement('input');
		inputField.className = 'input-field';
		inputField.type = 'text';
		inputDiv.append(inputField);

		const inputBtns = document.createElement('div');
		inputBtns.className = 'input-btns';
		inputDiv.append(inputBtns);

		const addBtn = document.createElement('button');
		addBtn.className = 'add-btn action';
		addBtn.textContent = 'Add';
		inputBtns.append(addBtn);

		const cancelBtn = document.createElement('button');
		cancelBtn.className = 'cancel-btn action';
		cancelBtn.textContent = 'Cancel';
		inputBtns.append(cancelBtn);

		return inputDiv;
	}

	static setActiveList(listName) {
		const navButtons = document.querySelectorAll('nav .nav-btn');

		navButtons.forEach((button) => {
			if (button.textContent === listName) {
				button.classList.add('active');
			} else {
				button.classList.remove('active');
			}
		});
	}

	static getActiveList() {
		const currentList = document.querySelector('nav .nav-btn.active').textContent;
		return currentList;
	}

	static handlePopup(state, version, type) {
		if (version === 'one') {
			const content = document.querySelector('.content');
			if (type === 'List') {
				content.classList.add(state);
			}
			content.classList.add('lock');
			const tasksList = document.querySelectorAll('.tasks-list li');
			tasksList.forEach((task) => {
				if (state === 'empty' || state === 'exists') {
					if (task.querySelector('.task-content').textContent === '') {
						task.classList.add(state);
						task.querySelector('.input-field').remove();
					} else {
						task.classList.add('lock');
					}
				} else {
					task.classList.add('lock');
				}
			});
			const handleAnimationEnd = () => {
				content.classList.remove(state);
				tasksList.forEach((task) => {
					task.classList.remove(state);
					task.classList.remove('lock');
					task.removeEventListener('animationend', handleAnimationEnd);
				});
				content.removeEventListener('animationend', handleAnimationEnd);
				this.displayTasks();
			};
			setTimeout(() => {
				content.classList.remove('lock');
			}, 1000);

			content.addEventListener('animationend', handleAnimationEnd);
		}

		if (version === 'two') {
			const inputContainer = document.querySelector('.input-container');
			inputContainer.classList.add(state);

			const handleAnimationEnd = () => {
				inputContainer.classList.remove(state);
				inputContainer.removeEventListener('animationend', handleAnimationEnd);
				this.displayTasks();
			};

			if (state === 'empty') {
				const inputField = document.querySelector('.input-container .input-field');
				inputField.value = '';
			}

			inputContainer.addEventListener('animationend', handleAnimationEnd);
		}
	}

	static validateName(name, version, type) {
		if ((version === 'one' || version === 'two') && (name === '' || name.match(/^\s+$/))) {
			this.handlePopup('empty', version, type);
			const empty = document.querySelector('.empty');
			if (empty) {
				empty.setAttribute('data-before', `${type} name cannot be empty`);
			}
			Sound.loadAudio().alertSound.play();
			return false;
		}
		return true;
	}

	static validateListName(listName, version, type = 'List') {
		const listNameTrim = listName.trim();
		if (!this.validateName(listNameTrim, version, type)) return false;
		if (Storage.masterList.findList(listNameTrim)) {
			this.handlePopup('exists', version, type);
			const exists = document.querySelector('.exists');
			if (exists) {
				exists.setAttribute('data-before', `List with this name already exists`);
			}
			Sound.loadAudio().alertSound.play();
			return false;
		}
		return true;
	}

	static validateTaskName(taskName, version) {
		const taskNameTrim = taskName.trim();
		if (!this.validateName(taskNameTrim, version, 'Task')) return false;
		if (Storage.masterList.findTaskInList(this.getActiveList(), taskNameTrim)) {
			this.handlePopup('exists', version);
			const exists = document.querySelector('.exists');
			if (exists) {
				exists.setAttribute('data-before', `Task with this name already exists`);
			}
			Sound.loadAudio().alertSound.play();
			return false;
		}
		return true;
	}

	static addBtnPress(inputField, whereToAdd) {
		const name = inputField.value;

		if (whereToAdd.id === 'second-list') {
			if (!this.validateListName(name, 'two')) {
				inputField.focus();
			} else {
				Storage.masterList.addList(name);
				Storage.saveAll();
				this.closeInputContainer();
				this.displayLists('TASKS');
				this.setActiveList(name);
				this.displayTasks();
				this.selectList();
				Sound.loadAudio().confirmSound.play();
			}
		}

		if (whereToAdd.className === 'tasks') {
			if (!this.validateTaskName(name, 'two')) {
				inputField.focus();
			} else {
				Storage.masterList.addTaskToList(this.getActiveList(), name);
				this.closeInputContainer();
				this.displayTasks();
				Sound.loadAudio().confirmSound.play();
			}
		}
	}

	static cancelBtnPress(inputContainer) {
		inputContainer.remove();
		Sound.loadAudio().abortSound.play();
	}

	static addNewElement(whichBtn, whereToAdd) {
		whichBtn.addEventListener('click', () => {
			if (this.getActiveList() !== 'TODAY' && this.getActiveList() !== 'THIS WEEK') {
				let inputContainer = whereToAdd.querySelector('.input-container');
				if (!inputContainer) {
					this.closeInputContainer();

					const secondList = document.querySelector('#second-list');
					const tasksList = document.querySelector('.tasks');

					if (whereToAdd === secondList) {
						whereToAdd.append(this.createInputContainer());
					} else if (whereToAdd === tasksList) {
						whereToAdd.prepend(this.createInputContainer());
					}

					const inputField = whereToAdd.querySelector('input');
					inputField.focus();
					inputContainer = whereToAdd.querySelector('.input-container');

					const addBtn = whereToAdd.querySelector('.add-btn');
					const cancelBtn = whereToAdd.querySelector('.cancel-btn');

					addBtn.addEventListener('click', () => this.addBtnPress(inputField, whereToAdd));
					cancelBtn.addEventListener('click', () => this.cancelBtnPress(inputContainer));
				} else {
					const inputField = whereToAdd.querySelector('input');
					inputField.focus();
				}
				Sound.loadAudio().addNewSound.play();
			}
		});
	}

	static addNewList() {
		const newListBtn = document.querySelector('#new-list-btn');
		const secondList = document.querySelector('#second-list');
		this.addNewElement(newListBtn, secondList);
	}

	static addNewTask() {
		const newTaskBtn = document.querySelector('#add-task-btn');
		const tasksList = document.querySelector('.tasks');
		this.addNewElement(newTaskBtn, tasksList);
	}

	static disableAddTaskBtn() {
		const newTaskBtn = document.querySelector('#add-task-btn');
		if (this.getActiveList() === 'TODAY' || this.getActiveList() === 'THIS WEEK') {
			newTaskBtn.classList.add('disabled');
		} else {
			newTaskBtn.classList.remove('disabled');
		}
	}

	static closeInputContainer() {
		const inputContainer = document.querySelector('.input-container');
		if (inputContainer) {
			inputContainer.remove();
		}
	}

	static closeInputContainerOnClick(e) {
		const inputContainer = e.target.closest('.input-container');
		const hamburger = e.target.closest('#hamburger');

		if (!inputContainer && e.target.id !== 'new-list-btn' && e.target.id !== 'add-task-btn' && !hamburger) {
			this.closeInputContainer();
		}
	}

	static handleKeyboardAddCancel(e) {
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
	}

	static loadExampleContent() {
		const loadLists = (listsArray) => {
			listsArray.forEach((list) => {
				if (!Storage.masterList.findList(list)) {
					Storage.masterList.addList(list);
				}
			});
		};

		const loadTasks = (listName, tasksArray) => {
			tasksArray.forEach((task) => {
				if (!Storage.masterList.findTaskInList(listName, task)) {
					Storage.masterList.addTaskToList(listName, task);
				}
			});
		};

		const loadStars = (starsArray) => {
			starsArray.forEach((item) => Storage.masterList.addStarInTask(item.list, item.task));
		};

		const loadIsDone = (isDoneArray) => {
			isDoneArray.forEach((item) => Storage.masterList.addIsDoneInTask(item.list, item.task));
		};

		const todaysDate = format(new Date(), 'dd/MM/yyyy');
		const tommorowsDate = format(addDays(new Date(), 1), 'dd/MM/yyyy');
		const theDayAfterTommorowsDate = format(addDays(new Date(), 2), 'dd/MM/yyyy');

		const getRandomDate = () => {
			const dates = [todaysDate, tommorowsDate, theDayAfterTommorowsDate];
			return dates[Math.floor(Math.random() * dates.length)];
		};

		const loadDates = (datesArray) => {
			datesArray.forEach((item) => Storage.masterList.changeTaskDate(item.list, item.task, getRandomDate()));
		};

		loadLists(ContentExample.lists);

		loadTasks('TASKS', ContentExample.tasks);
		loadTasks('Shopping', ContentExample.shopping);
		loadTasks('Places to visit', ContentExample.placesToVisit);
		loadTasks('Movies to watch', ContentExample.moviesToWatch);
		loadTasks('Great ideas!', ContentExample.greatIdeas);

		loadStars(ContentExample.addStars);
		loadIsDone(ContentExample.addIsDone);
		loadDates(ContentExample.addDates);

		Storage.clearAll();
		Storage.saveAll();
		this.displayLists('TASKS');
		this.displayTasks();
		this.selectList();
	}

	static clearAllContent() {
		Storage.resetMasterList();
		Storage.clearAll();
		this.displayLists('TASKS');
		this.displayTasks();
		this.selectList();
		Sound.loadAudio().removeSound.play();
	}

	static attachEventListeners() {
		const hamburger = document.querySelector('#hamburger');
		const nav = document.querySelector('nav.nav');
		const loadExampleBtn = document.querySelector('#load-example-btn');
		const clearAllBtn = document.querySelector('#clear-all-btn');
		const tasksTitle = document.querySelector('.content .title');

		hamburger.addEventListener('click', this.hamburgerManualToggle);
		nav.addEventListener('click', this.hamburgerManualClose);
		window.addEventListener('resize', this.hamburgerAutoToggle);

		loadExampleBtn.addEventListener('click', () => {
			this.loadExampleContent();
			Storage.saveAll();
			Sound.loadAudio().loadExampleSound.play();
		});

		clearAllBtn.addEventListener('click', this.clearAllContent);
		window.addEventListener('keydown', this.handleKeyboardAddCancel);
		window.addEventListener('click', this.closeInputContainerOnClick.bind(this));
		tasksTitle.addEventListener('click', this.editListName.bind(this));
	}

	static loadUserInterface() {
		Sound.loadAudio();
		UI.hamburgerAutoToggle();
		UI.displayLists('TASKS');
		UI.displayTasks();
		UI.selectList();
		UI.addNewList();
		UI.addNewTask();
		UI.attachEventListeners();
		// UI.loadExampleContent();
	}
}
