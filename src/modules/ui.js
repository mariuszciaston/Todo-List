/* eslint-disable no-alert */
import ListsManager from './manage';

export default class UI {
	static masterList = new ListsManager();

	static hamburgerAutoToggle() {
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
		return button;
	}

	static displayLists() {
		const listOne = this.masterList.getLists().slice(0, 3);
		const listTwo = this.masterList.getLists().slice(3);
		const firstList = document.querySelector('#first-list');
		const secondList = document.querySelector('#second-list');
		firstList.textContent = '';
		secondList.textContent = '';

		listOne.forEach((list) => {
			firstList.appendChild(this.createList(list));
		});

		listTwo.forEach((list) => {
			secondList.appendChild(this.createList(list));
		});

		this.setActiveList('TASKS');
	}

	static displayTasks() {
		const navButtons = document.querySelectorAll('nav .nav-btn');

		const tasksTitle = document.querySelector('.content .title');
		const tasksList = document.querySelector('.tasks-list');
		tasksList.textContent = '';

		navButtons.forEach((button) => {
			if (button.classList.contains('active')) {
				tasksTitle.textContent = button.textContent;
				this.masterList
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
					this.displayTasks();
				}
			});
		});
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

	static addBtnPress(inputField, inputContainer, whereToAdd) {
		const listName = inputField.value;

		if (whereToAdd.id === 'second-list') {
			if (this.masterList.findList(listName)) {
				alert('List with this name already exists');
			} else if (listName === '' || listName.match(/^\s+$/)) {
				alert('List name cannot be empty');
			} else {
				this.masterList.addList(listName);
				inputContainer.remove();
				this.displayLists();
				this.setActiveList(listName);
				this.displayTasks();
				this.selectList();
			}
		}

		if (whereToAdd.className === 'tasks') {
			if (this.masterList.findTaskInList(this.getActiveList(), listName)) {
				alert('Task with this name already exists');
			} else if (listName === '' || listName.match(/^\s+$/)) {
				alert('Task name cannot be empty');
			} else {
				this.masterList.addTaskToList(this.getActiveList(), listName);
				inputContainer.remove();
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
				whereToAdd.append(this.createInputContainer());

				const inputField = whereToAdd.querySelector('input');
				inputField.focus();
				inputContainer = whereToAdd.querySelector('.input-container');
				const addBtn = whereToAdd.querySelector('.add-btn');
				const cancelBtn = whereToAdd.querySelector('.cancel-btn');

				addBtn.addEventListener('click', () => this.addBtnPress(inputField, inputContainer, whereToAdd));
				cancelBtn.addEventListener('click', () => this.cancelBtnPress(inputContainer));
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

		lists.forEach((list) => {
			if (!this.masterList.findList(list)) {
				this.masterList.addList(list);
			}
		});

		const loadTasks = (listName, tasksArray) => {
			tasksArray.forEach((task) => {
				if (!this.masterList.findTaskInList(listName, task)) {
					this.masterList.addTaskToList(listName, task);
				}
			});
		};

		loadTasks('TASKS', tasks);
		loadTasks('Shopping', shopping);
		loadTasks('Places to visit', placesToVisit);
		loadTasks('Movies to watch', moviesToWatch);
		loadTasks('Great ideas!', greatIdeas);

		this.masterList.addStarInTask('TASKS', 'Conquer the Crown of Polish Mountains');
		this.masterList.addIsDoneInTask('TASKS', 'Go swimming on Tuesday');

		this.displayLists();
		this.displayTasks();
		this.selectList();
	};

	static handleKeyboard = (e) => {
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

	static attachEventListeners() {
		const loadExampleBtn = document.querySelector('#load-example-btn');
		const hamburger = document.querySelector('#hamburger');

		hamburger.addEventListener('click', this.hamburgerManualToggle);
		window.addEventListener('resize', this.hamburgerAutoToggle);
		loadExampleBtn.addEventListener('click', this.loadExampleContent);
		window.addEventListener('keydown', this.handleKeyboard);
	}

	static loadUserInterface() {
		UI.hamburgerAutoToggle();
		UI.displayLists();
		UI.displayTasks();
		UI.selectList();
		UI.addNewList();
		UI.addNewTask();
		UI.attachEventListeners();
		UI.loadExampleContent();
	}
}
