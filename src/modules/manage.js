import List from './list';
import Task from './task';

export default class ListsManager {
	constructor() {
		this.lists = [];
		this.lists.push(new List('TASKS'));
		this.lists.push(new List('TODAY'));
		this.lists.push(new List('THIS WEEK'));
	}

	addList(newList) {
		const list = new List(newList);
		this.lists.push(list);
	}

	deleteList(listName) {
		this.lists = this.lists.filter((list) => list.name !== listName);
	}

	changeListName(listName, newName) {
		const list = this.findList(listName);
		if (list) {
			list.setName(newName);
		}
	}

	addTaskToList(listName, taskName) {
		const list = this.findList(listName);
		if (list) {
			const task = new Task(taskName);
			list.addTask(task);
		}
	}

	deleteTaskFromList(listName, taskName) {
		const list = this.findList(listName);
		if (list) {
			list.deleteTask(taskName);
		}
	}

	changeTaskName(listName, taskName, newName) {
		const task = this.findTaskInList(listName, taskName);
		if (task) {
			task.setName(newName);
		}
	}

	toggleStarInTask(listName, taskName) {
		const task = this.findTaskInList(listName, taskName);
		if (task) {
			task.toggleStar(task.star);
		}
	}

	toggleIsDoneInTask(listName, taskName) {
		const task = this.findTaskInList(listName, taskName);
		if (task) {
			task.toggleIsDone(task.isDone);
		}
	}

	getLists() {
		return this.lists;
	}

	findList(listName) {
		return this.lists.find((list) => list.name === listName);
	}

	findTaskInList(listName, taskName) {
		const list = this.findList(listName);
		return this.findList(listName) ? list.tasks.find((task) => task.name === taskName) : false;
	}
}

// TEST
const masterList = new ListsManager();
masterList.addList('pierwsza lista');
masterList.addList('druga lista');
masterList.deleteList('pierwsza lista');
masterList.addList('trzecia lista');
masterList.changeListName('trzecia lista', 'nowa nazwa');

masterList.addTaskToList('TASKS', 'zadanie 1');
masterList.addTaskToList('TASKS', 'zadanie 2');
masterList.deleteTaskFromList('TASKS', 'zadanie 1');
masterList.changeTaskName('TASKS', 'zadanie 2', 'nowa nazwa zadania 2');
masterList.toggleStarInTask('TASKS', 'nowa nazwa zadania 2');
masterList.toggleIsDoneInTask('TASKS', 'nowa nazwa zadania 2');

console.table(masterList.getLists());
