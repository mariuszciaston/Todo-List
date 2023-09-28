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
}
