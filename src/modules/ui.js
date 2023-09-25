import { format, parseISO } from 'date-fns';

import ListsManager from './manage';

export default class UI {
	static masterList = new ListsManager();

	static loadAudio() {
		const toggleSound = new Audio('sound/mixkit-air-woosh-1489-pitch.wav');
		const reverseToggleSound = new Audio('sound/mixkit-air-woosh-1489-pitch-reverse.wav');
		const doneSound = new Audio('sound/mixkit-game-ball-tap-2073.wav');
		const reverseDoneSound = new Audio('sound/mixkit-game-ball-tap-2073-reverse-slow.wav');
		const starSound = new Audio('sound/mixkit-retro-arcade-casino-notification-211.wav');
		const reverseStarSound = new Audio('sound/mixkit-retro-arcade-casino-notification-211-reverse.wav');
		const removeSound = new Audio('sound/Empty-trash-sound-effect-reverse.mp3');
		const loadExampleSound = new Audio('sound/mixkit-player-boost-recharging-2040.wav');
		const addNewSound = new Audio('sound/mixkit-repeating-arcade-beep-1084.wav');
		const alertSound = new Audio('sound/mixkit-quick-jump-arcade-game-239.wav');
		const confirmSound = new Audio('sound/mixkit-video-game-lock-2851.wav');
		const abortSound = new Audio('sound/mixkit-video-game-lock-2851-reverse.wav');

		return {
			toggleSound,
			reverseToggleSound,
			doneSound,
			reverseDoneSound,
			starSound,
			reverseStarSound,
			removeSound,
			loadExampleSound,
			addNewSound,
			alertSound,
			confirmSound,
			abortSound,
		};
	}

	static lastWidth = window.innerWidth;

	static hamburgerAutoToggle() {
		const hamburger = document.querySelector('#hamburger');
		const main = document.querySelector('.main');
		if (window.matchMedia('(min-width: 800px)').matches) {
			hamburger.classList.add('open');
			main.classList.remove('sidebar-toggle');

			if (this.lastWidth < 800) {
				UI.loadAudio().toggleSound.play();
			}
		} else {
			hamburger.classList.remove('open');
			main.classList.add('sidebar-toggle');

			if (this.lastWidth >= 800) {
				UI.loadAudio().reverseToggleSound.play();
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
			UI.loadAudio().toggleSound.play();
		}

		if (e.target.closest('#hamburger:not(.open)')) {
			UI.loadAudio().reverseToggleSound.play();
		}
	}

	static hamburgerManualClose(e) {
		const currentList = UI.getActiveList();
		if (e.target.textContent === currentList) {
			if (e.target.classList.contains('nav-btn')) {
				if (window.innerWidth < 800) {
					UI.loadAudio().reverseToggleSound.play();
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
		const listOne = this.masterList.getLists().slice(0, 3);
		const listTwo = this.masterList.getLists().slice(3);
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
					this.masterList.changeTaskName(listName, name, inputField.value);
					this.displayTasks();
				} else {
					setTimeout(() => {
						this.displayTasks();
					}, 1000);
				}
			} else if (this.validateListName(inputField.value, 'one')) {
				this.masterList.changeListName(name, inputField.value);
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
							this.masterList.changeTaskDate(currentList, taskName, dateFormatted);
							setTextContent(dateFormatted);
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
						const dateFormatted = format(parseISO(dateField.value), 'dd/MM/yyyy');

						this.masterList.changeTaskDate(currentList, taskName, dateFormatted || 'set date');
						setTextContent(dateFormatted || 'set date');
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
		const lastList = this.masterList.getLists().slice(-1)[0].name;

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

		this.masterList.deleteList(listName);
		this.displayLists();
		this.updateActiveList(currentList, listName, nextList);
		this.displayTasks();
		this.selectList();
		UI.loadAudio().removeSound.play();
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

	static displayTasks() {
		const tasksTitle = document.querySelector('.content .title');
		const tasksList = document.querySelector('.tasks-list');
		const currentList = this.getActiveList();
		if (currentList) {
			tasksList.textContent = '';
			tasksTitle.textContent = currentList;

			if (tasksTitle.textContent === 'TASKS' || tasksTitle.textContent === 'TODAY' || tasksTitle.textContent === 'THIS WEEK') {
				tasksTitle.classList.add('default');
			} else {
				tasksTitle.classList.remove('default');
			}

			this.masterList
				.findList(currentList)
				.getTasks()
				.forEach((task) => {
					tasksList.prepend(this.createTask(task));
				});
		}
		this.addTaskHandlers(tasksList, tasksTitle);
		this.disableAddTaskBtn();
	}

	static toggleIsDone(e) {
		const listName = this.getActiveList();
		const taskName = e.target.parentElement.querySelector('.task-content').textContent;
		this.masterList.toggleIsDoneInTask(listName, taskName);
		this.displayTasks();
		(!e.target.parentElement.classList.contains('done') ? UI.loadAudio().doneSound : UI.loadAudio().reverseDoneSound).play();
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

	static createDateField(task) {
		const dateField = document.createElement('input');
		dateField.type = 'date';
		dateField.className = 'input-field';
		dateField.min = '1900-01-01';
		dateField.max = '2100-12-31';
		dateField.value = task.textContent;
		const clearTask = task;
		clearTask.textContent = '';
		task.append(dateField);
		dateField.focus();
		return dateField;
	}

	static toggleStar(e) {
		const listName = this.getActiveList();
		const taskName = e.target.parentElement.querySelector('.task-content').textContent;
		this.masterList.toggleStarInTask(listName, taskName);
		this.displayTasks();
		(!e.target.classList.contains('yellow') ? UI.loadAudio().starSound : UI.loadAudio().reverseStarSound).play();
	}

	static removeTask(e) {
		const listName = this.getActiveList();
		const taskName = e.target.parentElement.querySelector('.task-content').textContent;
		this.masterList.deleteTaskFromList(listName, taskName);
		this.displayTasks();
		UI.loadAudio().removeSound.play();
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
			UI.loadAudio().alertSound.play();
			return false;
		}
		return true;
	}

	static validateListName(listName, version, type = 'List') {
		const listNameTrim = listName.trim();
		if (!this.validateName(listNameTrim, version, type)) return false;
		if (this.masterList.findList(listNameTrim)) {
			this.handlePopup('exists', version, type);
			const exists = document.querySelector('.exists');
			if (exists) {
				exists.setAttribute('data-before', `List with this name already exists`);
			}
			UI.loadAudio().alertSound.play();
			return false;
		}
		return true;
	}

	static validateTaskName(taskName, version) {
		const taskNameTrim = taskName.trim();
		if (!this.validateName(taskNameTrim, version, 'Task')) return false;
		if (this.masterList.findTaskInList(this.getActiveList(), taskNameTrim)) {
			this.handlePopup('exists', version);
			const exists = document.querySelector('.exists');
			if (exists) {
				exists.setAttribute('data-before', `Task with this name already exists`);
			}
			UI.loadAudio().alertSound.play();
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
				this.masterList.addList(name);
				this.closeInputContainer();
				this.displayLists('TASKS');
				this.setActiveList(name);
				this.displayTasks();
				this.selectList();
				UI.loadAudio().confirmSound.play();
			}
		}

		if (whereToAdd.className === 'tasks') {
			if (!this.validateTaskName(name, 'two')) {
				inputField.focus();
			} else {
				this.masterList.addTaskToList(this.getActiveList(), name);
				this.closeInputContainer();
				this.displayTasks();
				UI.loadAudio().confirmSound.play();
			}
		}
	}

	static cancelBtnPress(inputContainer) {
		inputContainer.remove();
		UI.loadAudio().abortSound.play();
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
				UI.loadAudio().addNewSound.play();
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

	static handleKeyboardAddCancel = (e) => {
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
	};

	static loadExampleContent = () => {
		const lists = ['Shopping', 'Movies to watch', 'Places to visit', 'Great ideas!'];

		const tasks = [
			'Bake Neapolitan pizza',
			'Go swimming on Tuesday',
			'Get hired as a Front End Developer',
			'Conquer the Crown of Polish Mountains',
			'Finish The Odin Project',
		];

		const shopping = [
			'Apples',
			'Bananas',
			'Strawberries',
			'Avocados',
			'Bell Peppers',
			'Carrots',
			'Broccoli',
			'Garlic',
			'Lemons/Limes',
			'Onion',
			'Basil',
			'Potatoes',
			'Spinach',
			'Tomatoes',
		];

		const placesToVisit = ['Amsterdam', 'Berlin', 'Madrid', 'Rome', 'London', 'Paris', 'Prague', 'Stockholm', 'Vienna'];

		const moviesToWatch = [
			'1. 2001: A Space Odyssey (1968)',
			'2. Blade Runner (1982)',
			'3. Star Wars: Episode IV - A New Hope (1977)',
			'4. Alien (1979)',
			'5. Star Wars: Episode V - The Empire Strikes Back (1980)',
			'6. Planet of the Apes (1968)',
			'7. Star Trek II: The Wrath of Khan (1982)',
			'8. The Matrix (1999)',
			'9. The Thing (1982)',
			'10. Jurassic Park (1993)',
			'11. Aliens (1986)',
			'12. E.T. the Extra-Terrestrial (1982)',
			'13. A Clockwork Orange (1971)',
			'14. The Day the Earth Stood Still (1951)',
			'15. Invasion of the Body Snatchers (1956)',
			'16. Metropolis (1927)',
			'17. Terminator 2: Judgement Day (1991)',
			'18. Forbidden Planet (1956)',
			'19. Close Encounters of the Third Kind (1977)',
			'20. Back to the Future (1985)',
			'21. Brazil (1985)',
			'22. Starship Troopers (1997)',
			'23. Ex Machina (2014)',
			'24. Wall-E (2008)',
			'25. Inception (2010)',
		];

		const greatIdeas = [
			'1) Travel to a country where you don’t speak the language',
			'2) Go on a solo trip',
			'3) Visit a “Dark Sky” site',
			'4) Live abroad for a year',
			'5) Take a pottery class',
			'6) Plant a vegetable garden',
			'7) Start a book club',
			'8) Write a book',
			'9) Teach a class',
			'10) Become a mentor',
			'11) Climb a mountain',
			'12) Run a marathon',
			'13) Start your own business',
			'14) Plant a tree and watch it grow',
			'15) Become a volunteer',
			'16) Adopt a pet',
			'17) Try skydiving',
			'18) Take a hot air balloon ride',
			'19) Learn to meditate',
			'20) Join a dance class',
			'21) Write a Letter to Your Future Self',
			'22) Do Something—anything!—You’ve never done',
		];

		const loadLists = (listsArray) => {
			listsArray.forEach((list) => {
				if (!this.masterList.findList(list)) {
					this.masterList.addList(list);
				}
			});
		};

		const loadTasks = (listName, tasksArray) => {
			tasksArray.forEach((task) => {
				if (!this.masterList.findTaskInList(listName, task)) {
					this.masterList.addTaskToList(listName, task);
				}
			});
		};

		loadLists(lists);
		loadTasks('TASKS', tasks);
		loadTasks('Shopping', shopping);
		loadTasks('Places to visit', placesToVisit);
		loadTasks('Movies to watch', moviesToWatch);
		loadTasks('Great ideas!', greatIdeas);

		this.masterList.addStarInTask('TASKS', 'Conquer the Crown of Polish Mountains');
		this.masterList.addIsDoneInTask('TASKS', 'Go swimming on Tuesday');

		this.displayLists('TASKS');

		this.displayLists('Shopping');

		this.displayTasks();
		this.selectList();
	};

	static clearAllContent = () => {
		this.masterList = new ListsManager();
		this.displayLists('TASKS');
		this.displayTasks();
		this.selectList();
		UI.loadAudio().removeSound.play();
	};

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
			UI.loadAudio().loadExampleSound.play();
		});

		clearAllBtn.addEventListener('click', this.clearAllContent);
		window.addEventListener('keydown', this.handleKeyboardAddCancel);
		window.addEventListener('click', this.closeInputContainerOnClick.bind(this), true);
		tasksTitle.addEventListener('click', this.editListName.bind(this));
	}

	static loadUserInterface() {
		UI.loadAudio();
		UI.hamburgerAutoToggle();
		UI.displayLists('TASKS');
		UI.displayTasks();
		UI.selectList();
		UI.addNewList();
		UI.addNewTask();
		UI.attachEventListeners();
		UI.loadExampleContent();
	}
}
