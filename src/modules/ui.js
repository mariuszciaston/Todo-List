import { format, parseISO, parse, isToday, isThisWeek, isThisMonth, addDays } from 'date-fns';

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
		const remove = document.createElement('div');
		const btnWrap = document.createElement('div');

		button.className = 'button nav-btn';
		button.textContent = list.name;
		remove.className = 'remove';
		btnWrap.className = 'btnWrap';

		btnWrap.append(button);
		btnWrap.append(remove);

		return { button, btnWrap };
	}

	static getSecondList() {
		return document.querySelector('#second-list');
	}

	static initLists() {
		return Storage.masterList.getLists().slice(0, 4);
	}

	static initListsNameArray() {
		return this.initLists().map((list) => list.name);
	}

	static userLists() {
		return Storage.masterList.getLists().slice(4);
	}

	static displayLists(activeList) {
		const initLists = this.initLists();
		const userLists = this.userLists();
		const firstList = document.querySelector('#first-list');
		const secondList = this.getSecondList();
		firstList.textContent = '';
		secondList.textContent = '';

		initLists.forEach((list) => {
			const { button } = this.createList(list);
			firstList.appendChild(button);
		});

		userLists.forEach((list) => {
			const { btnWrap } = this.createList(list);
			secondList.appendChild(btnWrap);
		});

		this.setActiveList(activeList);
		this.addEventHandler('.remove', 'click', this.removeList, secondList);
	}

	static getListTitle() {
		return document.querySelector('.content .title');
	}

	static tasksList() {
		return document.querySelector('.tasks-list');
	}

	static updateListName(inputField) {
		const listTitle = this.getListTitle();
		const tasksList = this.tasksList();
		listTitle.textContent = inputField.value;
		if (!inputField.value) {
			listTitle.textContent = inputField;
		}
		this.displayLists(listTitle.textContent);
		this.addTaskHandlers(tasksList, listTitle);
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
					Storage.saveMasterList();
					this.displayTasks();
				} else {
					setTimeout(() => {
						this.displayTasks();
					}, 1000);
				}
			} else if (this.validateListName(inputField.value, 'one')) {
				Storage.masterList.changeListName(name, inputField.value);
				Storage.saveMasterList();
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
		if (!this.initListsNameArray().includes(e.target.textContent)) {
			this.editName(e, false);
		}
	}

	static editTaskName(e) {
		this.editName(e, true);
	}

	static getTaskName(e) {
		return e.target.parentElement.querySelector('.task-content').textContent;
	}

	static editDate(e) {
		const element = e.target.closest('.date');
		const temp = element.textContent;

		if (!element.querySelector('.input-field')) {
			const dateField = this.createDateField(element);

			if (element.querySelector('.input-field')) {
				const currentList = this.getActiveList();
				const taskName = this.getTaskName(e);

				const setTextContent = (value) => {
					element.textContent = value;
					window.removeEventListener('click', clickHandler);
					window.removeEventListener('keydown', keydownHandler);
				};

				const handleDateChange = (dateValue, defaultDate) => {
					if (dateValue) {
						const dateFormatted = format(parseISO(dateValue), 'dd/MM/yyyy');
						Storage.masterList.changeTaskDate(currentList, taskName, dateFormatted);
						setTextContent(dateFormatted);
					} else {
						Storage.masterList.changeTaskDate(currentList, taskName, defaultDate);
						setTextContent(defaultDate);
					}
					Storage.saveMasterList();
					this.displayTasks();
				};

				const keydownHandler = (k) => {
					if (k.key === 'Enter') {
						handleDateChange(dateField.value, temp);
						dateField.focus();
					}
					if (k.key === 'Escape') {
						setTextContent(temp);
					}
				};

				const clickHandler = (c) => {
					if (!element.contains(c.target)) {
						handleDateChange(dateField.value, 'set date');
					}
				};

				window.addEventListener('click', clickHandler);
				window.addEventListener('keydown', keydownHandler);
			}
		}
	}

	static getListName(e) {
		return e.target.parentElement.querySelector('.nav-btn').textContent;
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
		const currentList = this.getActiveList();
		const listName = this.getListName(e);
		const nextList = this.getNextList(e);
		Storage.masterList.deleteList(listName);
		Storage.clearAll();
		Storage.saveMasterList();
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

	static disableListNameHover(listTitle) {
		if (this.initListsNameArray().includes(listTitle.textContent)) {
			listTitle.classList.add('default');
		} else {
			listTitle.classList.remove('default');
		}
	}

	static listsToFilter = this.initListsNameArray().slice(1);

	static displayTasks() {
		const listTitle = this.getListTitle();
		const tasksList = this.tasksList();
		const currentList = this.getActiveList();

		tasksList.textContent = '';
		listTitle.textContent = currentList;
		this.disableListNameHover(listTitle);

		if (!this.listsToFilter.includes(listTitle.textContent)) {
			this.displayRegularTasks(tasksList, currentList);
		} else {
			this.displaySpecialTasks(tasksList, listTitle);
		}

		this.addTaskHandlers(tasksList, listTitle);
		this.disableNewTaskBtn();
	}

	static displayRegularTasks(tasksList, currentList) {
		Storage.masterList
			.findList(currentList)
			.getTasks()
			.forEach((task) => {
				tasksList.prepend(this.createTask(task));
			});
	}

	static displaySpecialTasks(tasksList, listTitle) {
		this.listsToFilter.forEach((list) => {
			Storage.masterList.findList(list).clearTasks();
		});

		Storage.masterList.getLists().forEach((list) => {
			if (!this.listsToFilter.includes(list.name)) this.addTasksToSpecialLists(list, listTitle);
		});

		this.displayTasksFromSpecialLists(tasksList);
	}

	static addTasksToSpecialLists(list, listTitle) {
		list.getTasks().forEach((task) => {
			if (task.date !== 'set date') {
				const taskDate = parseISO(format(parse(task.date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'));

				if (listTitle.textContent === this.listsToFilter[0] && isToday(taskDate)) {
					Storage.masterList.findList(this.listsToFilter[0]).addTask(task);
				}

				if (listTitle.textContent === this.listsToFilter[1] && isThisWeek(taskDate, { weekStartsOn: 1 })) {
					Storage.masterList.findList(this.listsToFilter[1]).addTask(task);
				}

				if (listTitle.textContent === this.listsToFilter[2] && isThisMonth(taskDate)) {
					Storage.masterList.findList(this.listsToFilter[2]).addTask(task);
				}
			}
		});
	}

	static displayTasksFromSpecialLists(tasksList) {
		Storage.masterList
			.findList(this.listsToFilter[0])
			.getTasks()
			.forEach((task) => {
				tasksList.append(this.createTask(task));
			});

		this.listsToFilter.slice(1, 3).forEach((listName) => {
			Storage.masterList
				.findList(listName)
				.getTasks()
				.sort((a, b) => {
					const dateA = parse(a.date, 'dd/MM/yyyy', new Date());
					const dateB = parse(b.date, 'dd/MM/yyyy', new Date());

					return dateA - dateB;
				})
				.forEach((task) => {
					tasksList.append(this.createTask(task));
				});
		});
	}

	static toggleIsDone(e) {
		const listName = this.getActiveList();
		const taskName = this.getTaskName(e);
		Storage.masterList.toggleIsDoneInTask(listName, taskName);
		Storage.saveMasterList();
		this.displayTasks();
		(!e.target.parentElement.classList.contains('done') ? Sound.loadAudio().doneSound : Sound.loadAudio().reverseDoneSound).play();
	}

	static createInputField(task, taskName) {
		const inputField = document.createElement('input');
		inputField.className = 'input-field';
		inputField.type = 'text';
		inputField.value = taskName;
		task.append(inputField);
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
		const taskName = this.getTaskName(e);
		Storage.masterList.toggleStarInTask(listName, taskName);
		Storage.saveMasterList();
		this.displayTasks();
		(!e.target.classList.contains('yellow') ? Sound.loadAudio().starSound : Sound.loadAudio().reverseStarSound).play();
	}

	static removeTask(e) {
		const listName = this.getActiveList();
		const taskName = this.getTaskName(e);
		Storage.masterList.deleteTaskFromList(listName, taskName);
		Storage.saveMasterList();
		if (this.listsToFilter.includes(listName)) {
			Storage.masterList.getLists().forEach((list) => {
				if (!this.listsToFilter.includes(list.name)) {
					Storage.masterList.deleteTaskFromList(list.name, taskName);
					Storage.saveMasterList();
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

	static getListsNodeList() {
		return document.querySelectorAll('nav .nav-btn');
	}

	static selectList() {
		const listsNodeList = this.getListsNodeList();
		const removeActiveClass = () => listsNodeList.forEach((list) => list.classList.remove('active'));
		const addActiveClass = (target) => target.classList.add('active');

		listsNodeList.forEach((list) => {
			list.addEventListener('click', (e) => {
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
		const inputField = document.createElement('input');
		const inputBtns = document.createElement('div');
		const addBtn = document.createElement('button');
		const cancelBtn = document.createElement('button');

		inputDiv.className = 'input-container';
		inputField.className = 'input-field';
		inputField.type = 'text';
		inputBtns.className = 'input-btns';
		addBtn.className = 'add-btn action';
		addBtn.textContent = 'Add';
		cancelBtn.className = 'cancel-btn action';
		cancelBtn.textContent = 'Cancel';

		inputDiv.append(inputField);
		inputDiv.append(inputBtns);
		inputBtns.append(addBtn);
		inputBtns.append(cancelBtn);

		return inputDiv;
	}

	static setActiveList(listName) {
		const activeList = listName || 'TASKS';
		const listsNodeList = this.getListsNodeList();

		listsNodeList.forEach((list) => {
			if (list.textContent === activeList) {
				list.classList.add('active');
			} else {
				list.classList.remove('active');
			}
		});
	}

	static getActiveList() {
		const activeList = document.querySelector('nav .nav-btn.active').textContent;
		Storage.saveActiveList(activeList);
		return activeList;
	}

	static getInputContainer(whereToAdd) {
		return whereToAdd ? whereToAdd.querySelector('.input-container') : document.querySelector('.input-container');
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
			const inputContainer = this.getInputContainer();
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
		if (name === '' || name.match(/^\s+$/)) {
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

	static getExists() {
		return document.querySelector('.exists');
	}

	static validateListName(listName, version, type = 'List') {
		const listNameTrim = listName.trim();
		if (!this.validateName(listNameTrim, version, type)) return false;
		if (Storage.masterList.findList(listNameTrim)) {
			this.handlePopup('exists', version, type);
			const exists = this.getExists();
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
			const exists = this.getExists();
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
				Storage.saveMasterList();
				this.closeInputContainer();
				this.displayLists();
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

	static getNewTaskBtn() {
		return document.querySelector('#add-task-btn');
	}

	static getTasksList() {
		return document.querySelector('.tasks');
	}

	static addNewElement(whichBtn, whereToAdd) {
		whichBtn.addEventListener('click', () => {
			const newTaskBtn = this.getNewTaskBtn();

			if (!this.listsToFilter.includes(this.getActiveList()) || whichBtn !== newTaskBtn) {
				let inputContainer = this.getInputContainer(whereToAdd);

				if (!inputContainer) {
					this.closeInputContainer();

					const secondList = this.getSecondList();
					const tasksList = this.getTasksList();

					if (whereToAdd === secondList) {
						whereToAdd.append(this.createInputContainer());
					} else if (whereToAdd === tasksList) {
						whereToAdd.prepend(this.createInputContainer());
					}

					const inputField = whereToAdd.querySelector('input');
					inputField.focus();
					inputContainer = this.getInputContainer(whereToAdd);
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
		const secondList = this.getSecondList();
		this.addNewElement(newListBtn, secondList);
	}

	static addNewTask() {
		const newTaskBtn = this.getNewTaskBtn();
		const tasksList = this.getTasksList();
		this.addNewElement(newTaskBtn, tasksList);
	}

	static disableNewTaskBtn() {
		const newTaskBtn = this.getNewTaskBtn();
		if (this.listsToFilter.includes(this.getActiveList())) {
			newTaskBtn.classList.add('disabled');
		} else {
			newTaskBtn.classList.remove('disabled');
		}
	}

	static closeInputContainer() {
		const inputContainer = this.getInputContainer();
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
		const inputContainer = this.getInputContainer();

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

	static muteElement() {
		return document.querySelector('#mute');
	}

	static updateMuteStatus(isMuted) {
		const muteElement = this.muteElement();
		const muteIcon = document.querySelector('#mute i');

		if (isMuted) {
			muteElement.classList.add('muted');
			muteIcon.classList.remove('fa-volume-high');
			muteIcon.classList.add('fa-volume-xmark');
		} else {
			muteElement.classList.remove('muted');
			muteIcon.classList.remove('fa-volume-xmark');
			muteIcon.classList.add('fa-volume-high');
		}

		Sound.mute = isMuted;
		Storage.saveIsMuted(Sound.mute);
	}

	static loadMuteStatus() {
		const isMuted = Storage.recoverIsMuted();
		this.updateMuteStatus(isMuted);
	}

	static muteToggle() {
		const isMuted = !Sound.mute;
		this.updateMuteStatus(isMuted);
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

		const beforeYesterdayDate = format(addDays(new Date(), -2), 'dd/MM/yyyy');
		const yesterdayDate = format(addDays(new Date(), -1), 'dd/MM/yyyy');
		const todayDate = format(new Date(), 'dd/MM/yyyy');
		const tommorowDate = format(addDays(new Date(), 1), 'dd/MM/yyyy');
		const afterTommorowDate = format(addDays(new Date(), 2), 'dd/MM/yyyy');

		const getRandomDate = () => {
			const dates = [beforeYesterdayDate, yesterdayDate, todayDate, tommorowDate, afterTommorowDate];
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
		Storage.saveMasterList();
		this.displayLists();
		this.displayTasks();
		this.selectList();
	}

	static clearAllContent() {
		Storage.resetMasterList();
		Storage.clearAll();
		this.displayLists();
		this.displayTasks();
		this.selectList();
		Sound.loadAudio().removeSound.play();
	}

	static attachEventListeners() {
		const hamburger = document.querySelector('#hamburger');
		const loadExampleBtn = document.querySelector('#load-example-btn');
		const clearAllBtn = document.querySelector('#clear-all-btn');
		const listTitle = this.getListTitle();
		const muteElement = this.muteElement();

		hamburger.addEventListener('click', this.hamburgerManualToggle);
		document.addEventListener('resize', this.hamburgerAutoToggle);
		document.addEventListener('click', this.hamburgerManualClose);

		loadExampleBtn.addEventListener('click', () => {
			this.loadExampleContent();
			Storage.saveMasterList();
			Sound.loadAudio().loadExampleSound.play();
		});

		clearAllBtn.addEventListener('click', this.clearAllContent.bind(this));
		window.addEventListener('keydown', this.handleKeyboardAddCancel.bind(this));
		window.addEventListener('click', this.closeInputContainerOnClick.bind(this));
		listTitle.addEventListener('click', this.editListName.bind(this));
		muteElement.addEventListener('click', this.muteToggle.bind(this));
	}

	static loadUserInterface() {
		UI.hamburgerAutoToggle();
		Storage.recoverMasterList();
		UI.displayLists(Storage.recoverActiveList());
		UI.displayTasks();
		UI.selectList();
		UI.addNewList();
		UI.addNewTask();
		UI.attachEventListeners();
		UI.loadMuteStatus();
		Sound.loadAudio();
	}
}
