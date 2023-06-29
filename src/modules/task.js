export default class Task {
	constructor(name, date = 'no date', star = false, isDone = false) {
		this.name = name;
		this.date = date;
		this.star = star;
		this.isDone = isDone;
	}

	setName(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}

	setDate(date) {
		this.date = date;
	}

	getDate() {
		return this.date;
	}

	toggleStar(star) {
		this.star = !star;
	}

	toggleIsDone(isDone) {
		this.isDone = !isDone;
	}
}
