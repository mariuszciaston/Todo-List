import List from './list';
import Task from './task';
import ListsManager from './manage';

export default class Storage {
	static masterList = new ListsManager();

	static resetMasterList() {
		this.masterList = new ListsManager();
	}

	static clearAll() {
		localStorage.clear();
	}

	static saveAll() {
		localStorage.setItem('masterList', JSON.stringify(this.masterList.getLists()));
	}

	static recoverAll() {
		if (localStorage.getItem('masterList')) {
			const recoveredData = JSON.parse(localStorage.getItem('masterList'));
			this.resetMasterList();

			this.masterList.lists = recoveredData.map((listData) => {
				const list = new List(listData.name);
				list.tasks = listData.tasks.map((taskData) => new Task(taskData.name, taskData.date, taskData.star, taskData.isDone));
				return list;
			});
		}
	}
}
