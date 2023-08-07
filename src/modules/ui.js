/* eslint-disable no-alert */
import ListsManager from './manage';

const masterList = new ListsManager();

export default class UI {
	static getElements = () => {
		const hamburger = document.querySelector('#hamburger');
		const main = document.querySelector('.main');
		const loadExampleBtn = document.querySelector('#load-example-btn');
		const navButtons = document.querySelectorAll('nav .nav-btn');
		return { hamburger, main, loadExampleBtn, navButtons };
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

		const createList = (list) => {
			const button = document.createElement('button');
			button.className = 'button nav-btn';
			if (list.name === 'TASKS') {
				button.classList.add('active');
			}
			button.textContent = list.name;
			return button;
		};

		listOne.forEach((list) => {
			firstList.appendChild(createList(list));
		});

		listTwo.forEach((list) => {
			secondList.appendChild(createList(list));
		});
	}

	static displayTasks() {
		const { navButtons } = UI.getElements();
		const tasksTitle = document.querySelector('.content .title');
		const tasksList = document.querySelector('.tasks-list');
		tasksList.textContent = '';

		navButtons.forEach((button) => {
			if (button.classList.contains('active')) {
				tasksTitle.textContent = button.textContent;
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
		const { navButtons } = UI.getElements();
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
							const { navButtons } = UI.getElements();
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
			if (!masterList.findList(list)) {
				masterList.addList(list);
			}
		});

		const loadTasks = (listName, tasksArray) => {
			tasksArray.forEach((task) => {
				if (!masterList.findTaskInList(listName, task)) {
					masterList.addTaskToList(listName, task);
				}
			});
		};

		loadTasks('TASKS', tasks);
		loadTasks('Shopping', shopping);
		loadTasks('Places to visit', placesToVisit);
		loadTasks('Movies to watch', moviesToWatch);
		loadTasks('Great ideas!', greatIdeas);

		masterList.addStarInTask('TASKS', 'Conquer the Crown of Polish Mountains');
		masterList.addIsDoneInTask('TASKS', 'Go swimming on Tuesday');

		UI.displayLists();
		UI.displayTasks();
		UI.selectList();
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
		const { hamburger, loadExampleBtn } = UI.getElements();
		hamburger.addEventListener('click', UI.hamburgerManualToggle);
		window.addEventListener('resize', UI.hamburgerAutoToggle);
		loadExampleBtn.addEventListener('click', UI.loadExampleContent);
		window.addEventListener('keydown', UI.handleKeyboard);
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

		UI.loadExampleContent();
	}
}
