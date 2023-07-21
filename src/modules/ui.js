// import List from './list'
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

console.table(masterList.getLists());

export default class UI {
	static load() {
		UI.hamburgerMenuControl();
		UI.displayLists();
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
}
