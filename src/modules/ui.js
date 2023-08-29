/* eslint-disable no-alert */
import ListsManager from './manage';

export default class UI {
	static masterList = new ListsManager();

	static hamburgerAutoToggle() {
		const inputContainer = document.querySelector('.input-container');
		if (!inputContainer) {
			const hamburger = document.querySelector('#hamburger');
			const main = document.querySelector('.main');
			if (window.matchMedia('(min-width: 800px)').matches) {
				hamburger.classList.add('open');
				main.classList.remove('sidebar-toggle');
			} else {
				hamburger.classList.remove('open');
				main.classList.add('sidebar-toggle');
			}
		}
	}

	static hamburgerManualToggle() {
		const hamburger = document.querySelector('#hamburger');
		const main = document.querySelector('.main');
		hamburger.classList.toggle('open');
		main.classList.toggle('sidebar-toggle');
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

	static displayTasks2(inputField) {
		const tasksTitle = document.querySelector('.content .title');
		const tasksList = document.querySelector('.tasks-list');
		tasksTitle.textContent = inputField.value;
		this.displayLists(tasksTitle.textContent);
		this.addTaskHandlers(tasksList, tasksTitle);
	}

	static handleInputField2(tasksTitle, listName) {
		const inputField = this.createInputField(tasksTitle, listName);
		let isEnterPressed2 = false;
		let isEscapePressed2 = false;

		const handleEnter2 = (k) => {
			if (inputField) {
				if (k.key === 'Enter') {
					isEnterPressed2 = true;

					if (!isEscapePressed2 && this.validateListName(inputField.value)) {
						this.masterList.changeListName(listName, inputField.value);

						this.setActiveList(inputField.value);
						this.displayTasks2(inputField);
						this.selectList();
					} else if (!isEscapePressed2) {
						const currentList = document.querySelector('nav .nav-btn.active');
						currentList.value = document.querySelector('nav .nav-btn.active').textContent;
						this.displayTasks2(currentList);
						this.selectList();
					}
				}
			}
		};

		const handleEscape2 = (k) => {
			if (k.key === 'Escape') {
				isEscapePressed2 = true;
				const currentList = document.querySelector('nav .nav-btn.active');
				currentList.value = document.querySelector('nav .nav-btn.active').textContent;
				this.displayTasks2(currentList);
				this.selectList();
				window.removeEventListener('keydown', handleEscape2);
			}
		};

		const handleBlur2 = () => {
			if (!isEnterPressed2 && !isEscapePressed2 && this.validateListName(inputField.value)) {
				this.masterList.changeListName(listName, inputField.value);
				this.setActiveList(inputField.value);
				this.displayTasks2(inputField);
				this.selectList();
			} else if (!isEnterPressed2 && !isEscapePressed2) {
				const currentList = document.querySelector('nav .nav-btn.active');
				currentList.value = document.querySelector('nav .nav-btn.active').textContent;
				this.displayTasks2(currentList);
				this.selectList();
			}

			window.removeEventListener('keydown', handleEnter2);
			window.removeEventListener('keydown', handleEscape2);
			inputField.removeEventListener('blur', handleBlur2);
			window.keydownEventAdded = false;
			inputField.blurEventAdded = false;
		};

		if (!window.keydownEventAdded) {
			window.addEventListener('keydown', handleEnter2);
			window.addEventListener('keydown', handleEscape2);
			window.keydownEventAdded = true;
		}

		if (!inputField.blurEventAdded) {
			inputField.addEventListener('blur', handleBlur2);
			inputField.blurEventAdded = true;
		}
	}

	static editListName(e) {
		const tasksTitle = e.target;
		if (tasksTitle.textContent !== 'TASKS' && tasksTitle.textContent !== 'TODAY' && tasksTitle.textContent !== 'THIS WEEK') {
			const listName = this.getActiveList();
			tasksTitle.textContent = '';
			this.handleInputField2(tasksTitle, listName);
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
			this.masterList
				.findList(currentList)
				.getTasks()
				.forEach((task) => {
					tasksList.prepend(this.createTask(task));
				});
		}
		this.addTaskHandlers(tasksList, tasksTitle);
	}

	static toggleIsDone(e) {
		const listName = this.getActiveList();
		const taskName = e.target.parentElement.querySelector('.task-content').textContent;
		this.masterList.toggleIsDoneInTask(listName, taskName);
		this.displayTasks();

		if (!e.target.parentElement.classList.contains('done')) {
			const done = new Audio('mixkit-game-ball-tap-2073.wav');
			done.play();
		}

		if (e.target.parentElement.classList.contains('done')) {
			const reverseDone = new Audio('mixkit-game-ball-tap-2073-reverse-slow.wav');
			reverseDone.play();
		}
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

	static handleInputField(task, taskName, listName) {
		const inputField = this.createInputField(task, taskName);
		let isEnterPressed = false;
		let isEscapePressed = false;

		const handleEnter = (k) => {
			if (inputField) {
				if (k.key === 'Enter') {
					isEnterPressed = true;
					if (!isEscapePressed && this.validateTaskName(inputField.value)) {
						this.masterList.changeTaskName(listName, taskName, inputField.value);
						this.displayTasks();
					}
				}
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
			if (!isEnterPressed && !isEscapePressed && this.validateTaskName(inputField.value)) {
				this.masterList.changeTaskName(listName, taskName, inputField.value);
				this.displayTasks();
			} else {
				this.displayTasks();
			}
			window.removeEventListener('keydown', handleEnter);
			window.removeEventListener('keydown', handleEscape);
			inputField.removeEventListener('blur', handleBlur);
		};

		window.addEventListener('keydown', handleEnter);
		window.addEventListener('keydown', handleEscape);
		inputField.addEventListener('blur', handleBlur);
	}

	static editTaskName(e) {
		const listName = this.getActiveList();
		const task = e.target.closest('.task-content');

		if (task && !task.contains(document.querySelector('.input-field'))) {
			const taskName = task.textContent;
			task.textContent = '';
			this.handleInputField(task, taskName, listName);
		}
	}

	static toggleStar(e) {
		const listName = this.getActiveList();
		const taskName = e.target.parentElement.querySelector('.task-content').textContent;
		this.masterList.toggleStarInTask(listName, taskName);
		this.displayTasks();

		if (!e.target.classList.contains('yellow')) {
			const star = new Audio('mixkit-retro-arcade-casino-notification-211.wav');
			star.play();
		}
	}

	static removeTask(e) {
		const listName = this.getActiveList();
		const taskName = e.target.parentElement.querySelector('.task-content').textContent;
		this.masterList.deleteTaskFromList(listName, taskName);
		this.displayTasks();
	}

	static addTaskHandlers(tasksList) {
		this.addEventHandler('.circle', 'click', this.toggleIsDone, tasksList);
		this.addEventHandler('.task-content', 'click', this.editTaskName, tasksList);
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

	static validateName(name, type) {
		if (name === '' || name.match(/^\s+$/)) {
			alert(`${type} name cannot be empty`);
			return false;
		}
		return true;
	}

	static validateListName(listName) {
		if (!this.validateName(listName, 'List')) return false;
		if (this.masterList.findList(listName)) {
			alert('List with this name already exists');
			return false;
		}
		return true;
	}

	static validateTaskName(taskName) {
		if (!this.validateName(taskName, 'Task')) return false;
		if (this.masterList.findTaskInList(this.getActiveList(), taskName)) {
			alert('Task with this name already exists');
			return false;
		}
		return true;
	}

	static addBtnPress(inputField, whereToAdd) {
		const listName = inputField.value;

		if (whereToAdd.id === 'second-list') {
			if (!this.validateListName(listName)) {
				inputField.focus();
			} else {
				this.masterList.addList(listName);
				this.closeInputContainer();
				this.displayLists('TASKS');
				this.setActiveList(listName);
				this.displayTasks();
				this.selectList();
			}
		}

		if (whereToAdd.className === 'tasks') {
			if (!this.validateTaskName(listName)) {
				inputField.focus();
			} else {
				this.masterList.addTaskToList(this.getActiveList(), listName);
				this.closeInputContainer();
				this.displayTasks();
			}
		}
	}

	static cancelBtnPress(inputContainer) {
		inputContainer.remove();
	}

	static addNewElement(whichBtn, whereToAdd) {
		whichBtn.addEventListener('click', () => {
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

		this.displayLists('Places to visit');

		this.displayTasks();
		this.selectList();
	};

	static clearAllContent = () => {
		this.masterList = new ListsManager();
		this.displayLists('TASKS');
		this.displayTasks();
		this.selectList();
	};

	static attachEventListeners() {
		const hamburger = document.querySelector('#hamburger');
		const loadExampleBtn = document.querySelector('#load-example-btn');
		const clearAllBtn = document.querySelector('#clear-all-btn');
		const tasksTitle = document.querySelector('.content .title');

		hamburger.addEventListener('click', this.hamburgerManualToggle);
		window.addEventListener('resize', this.hamburgerAutoToggle);
		loadExampleBtn.addEventListener('click', this.loadExampleContent);
		clearAllBtn.addEventListener('click', this.clearAllContent);
		window.addEventListener('keydown', this.handleKeyboardAddCancel);
		window.addEventListener('click', this.closeInputContainerOnClick.bind(this), true);
		tasksTitle.addEventListener('click', this.editListName.bind(this));
	}

	static loadUserInterface() {
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
