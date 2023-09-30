export default class Task {
	constructor(name, date = 'set date', star = false, isDone = false) {
		this.name = name;
		this.date = date;
		this.star = star;
		this.isDone = isDone;
	}

	setName(name) {
		this.name = name;
	}

	setDate(date) {
		this.date = date;
	}

	addStar() {
		this.star = true;
	}

	toggleStar(star) {
		this.star = !star;
	}

	addIsDone() {
		this.isDone = true;
	}

	toggleIsDone(isDone) {
		this.isDone = !isDone;
	}
}
