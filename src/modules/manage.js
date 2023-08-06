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

	addStarInTask(listName, taskName) {
		const task = this.findTaskInList(listName, taskName);
		if (task) {
			task.addStar(task.star);
		}
	}

	toggleIsDoneInTask(listName, taskName) {
		const task = this.findTaskInList(listName, taskName);
		if (task) {
			task.toggleIsDone(task.isDone);
		}
	}

	addIsDoneInTask(listName, taskName) {
		const task = this.findTaskInList(listName, taskName);
		if (task) {
			task.addIsDone(task.isDone);
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
