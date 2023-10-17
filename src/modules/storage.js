import List from './list';
import Task from './task';
import ListsManager from './manage';

export default class Storage {
	static masterList = new ListsManager();

	static resetMasterList() {
		this.masterList = new ListsManager();
	}

	static clearAll() {
		localStorage.removeItem('masterList');
		localStorage.removeItem('activeList');
	}

	static saveMasterList() {
		localStorage.setItem('masterList', JSON.stringify(this.masterList.getLists()));
	}

	static saveActiveList(activeList) {
		localStorage.setItem('activeList', JSON.stringify(activeList));
	}

	static saveIsMuted(isMuted) {
		localStorage.setItem('isMuted', JSON.stringify(isMuted));
	}

	static recoverMasterList() {
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

	static recoverActiveList() {
		return JSON.parse(localStorage.getItem('activeList'));
	}

	static recoverIsMuted() {
		return JSON.parse(localStorage.getItem('isMuted'));
	}
}
