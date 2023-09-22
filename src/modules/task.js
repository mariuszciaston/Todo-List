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

	addStar() {
		this.star = true;
	}

	toggleIsDone(isDone) {
		this.isDone = !isDone;
	}

	addIsDone() {
		this.isDone = true;
	}
}
