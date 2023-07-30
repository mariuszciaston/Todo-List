/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui */ \"./src/modules/ui.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', _modules_ui__WEBPACK_IMPORTED_MODULE_0__[\"default\"].load);\n\n\n//# sourceURL=webpack://minimalist/./src/index.js?");

/***/ }),

/***/ "./src/modules/list.js":
/*!*****************************!*\
  !*** ./src/modules/list.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ List)\n/* harmony export */ });\nclass List {\n\tconstructor(name) {\n\t\tthis.name = name;\n\t\tthis.tasks = [];\n\t}\n\n\tsetName(name) {\n\t\tthis.name = name;\n\t}\n\n\tgetName() {\n\t\treturn this.name;\n\t}\n\n\taddTask(newTask) {\n\t\tthis.tasks.push(newTask);\n\t}\n\n\tdeleteTask(taskName) {\n\t\tthis.tasks = this.tasks.filter((task) => task.name !== taskName);\n\t}\n\n\tgetTasks() {\n\t\treturn this.tasks;\n\t}\n}\n\n\n//# sourceURL=webpack://minimalist/./src/modules/list.js?");

/***/ }),

/***/ "./src/modules/manage.js":
/*!*******************************!*\
  !*** ./src/modules/manage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ListsManager)\n/* harmony export */ });\n/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list */ \"./src/modules/list.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ \"./src/modules/task.js\");\n\n\n\nclass ListsManager {\n\tconstructor() {\n\t\tthis.lists = [];\n\t\tthis.lists.push(new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('TASKS'));\n\t\tthis.lists.push(new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('TODAY'));\n\t\tthis.lists.push(new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('THIS WEEK'));\n\t}\n\n\taddList(newList) {\n\t\tconst list = new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"](newList);\n\t\tthis.lists.push(list);\n\t}\n\n\tdeleteList(listName) {\n\t\tthis.lists = this.lists.filter((list) => list.name !== listName);\n\t}\n\n\tchangeListName(listName, newName) {\n\t\tconst list = this.findList(listName);\n\t\tif (list) {\n\t\t\tlist.setName(newName);\n\t\t}\n\t}\n\n\taddTaskToList(listName, taskName) {\n\t\tconst list = this.findList(listName);\n\t\tif (list) {\n\t\t\tconst task = new _task__WEBPACK_IMPORTED_MODULE_1__[\"default\"](taskName);\n\t\t\tlist.addTask(task);\n\t\t}\n\t}\n\n\tdeleteTaskFromList(listName, taskName) {\n\t\tconst list = this.findList(listName);\n\t\tif (list) {\n\t\t\tlist.deleteTask(taskName);\n\t\t}\n\t}\n\n\tchangeTaskName(listName, taskName, newName) {\n\t\tconst task = this.findTaskInList(listName, taskName);\n\t\tif (task) {\n\t\t\ttask.setName(newName);\n\t\t}\n\t}\n\n\ttoggleStarInTask(listName, taskName) {\n\t\tconst task = this.findTaskInList(listName, taskName);\n\t\tif (task) {\n\t\t\ttask.toggleStar(task.star);\n\t\t}\n\t}\n\n\ttoggleIsDoneInTask(listName, taskName) {\n\t\tconst task = this.findTaskInList(listName, taskName);\n\t\tif (task) {\n\t\t\ttask.toggleIsDone(task.isDone);\n\t\t}\n\t}\n\n\tgetLists() {\n\t\treturn this.lists;\n\t}\n\n\tfindList(listName) {\n\t\treturn this.lists.find((list) => list.name === listName);\n\t}\n\n\tfindTaskInList(listName, taskName) {\n\t\tconst list = this.findList(listName);\n\t\treturn this.findList(listName) ? list.tasks.find((task) => task.name === taskName) : false;\n\t}\n}\n\n\n//# sourceURL=webpack://minimalist/./src/modules/manage.js?");

/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\nclass Task {\n\tconstructor(name, date = 'no date', star = false, isDone = false) {\n\t\tthis.name = name;\n\t\tthis.date = date;\n\t\tthis.star = star;\n\t\tthis.isDone = isDone;\n\t}\n\n\tsetName(name) {\n\t\tthis.name = name;\n\t}\n\n\tgetName() {\n\t\treturn this.name;\n\t}\n\n\tsetDate(date) {\n\t\tthis.date = date;\n\t}\n\n\tgetDate() {\n\t\treturn this.date;\n\t}\n\n\ttoggleStar(star) {\n\t\tthis.star = !star;\n\t}\n\n\ttoggleIsDone(isDone) {\n\t\tthis.isDone = !isDone;\n\t}\n}\n\n\n//# sourceURL=webpack://minimalist/./src/modules/task.js?");

/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _manage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./manage */ \"./src/modules/manage.js\");\n/* eslint-disable no-alert */\n// import List from './list';\n// import Task from './task'\n\n\n// TEST\nconst masterList = new _manage__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nmasterList.addList('Shopping');\nmasterList.addList('Movies to watch');\nmasterList.addTaskToList('TASKS', 'Bake Neapolitan pizza');\nmasterList.addTaskToList('TASKS', 'Go swimming on Tuesday');\nmasterList.addTaskToList('TASKS', 'Get hired as a Front End Developer');\nmasterList.addTaskToList('TASKS', 'Conquer the Crown of Polish Mountains');\nmasterList.addTaskToList('TASKS', 'Finish The Odin Project');\n\nmasterList.addTaskToList('TODAY', '1234');\n\nmasterList.toggleIsDoneInTask('TASKS', 'Finish The Odin Project');\nmasterList.toggleStarInTask('TASKS', 'Finish The Odin Project');\n\n// console.table(masterList.getLists());\n\nclass UI {\n\tstatic load() {\n\t\tUI.hamburgerMenuControl();\n\t\tUI.displayLists();\n\t\tUI.displayTasks();\n\n\t\tUI.selectList();\n\t\tUI.addNewList();\n\t\tUI.addNewTask();\n\t}\n\n\tstatic hamburgerMenuControl() {\n\t\tconst hamburger = document.querySelector('#hamburger');\n\t\tconst main = document.querySelector('.main');\n\n\t\tconst manualToggle = () => {\n\t\t\tmain.classList.toggle('sidebar-toggle');\n\t\t\thamburger.classList.toggle('open');\n\t\t};\n\n\t\tconst autoToggle = () => {\n\t\t\tif (window.matchMedia('(min-width: 800px)').matches) {\n\t\t\t\tmain.classList.remove('sidebar-toggle');\n\t\t\t\thamburger.classList.add('open');\n\t\t\t} else {\n\t\t\t\tmain.classList.add('sidebar-toggle');\n\t\t\t\thamburger.classList.remove('open');\n\t\t\t}\n\t\t};\n\t\tautoToggle();\n\n\t\tif (!hamburger.hasAttribute('listener')) {\n\t\t\thamburger.addEventListener('click', manualToggle);\n\t\t\twindow.addEventListener('resize', autoToggle);\n\t\t\thamburger.setAttribute('listener', 'true');\n\t\t}\n\t}\n\n\tstatic displayLists() {\n\t\tconst firstList = document.querySelector('#first-list');\n\t\tconst secondList = document.querySelector('#second-list');\n\t\tconst listOne = masterList.getLists().slice(0, 3);\n\t\tconst listTwo = masterList.getLists().slice(3);\n\t\tfirstList.textContent = '';\n\t\tsecondList.textContent = '';\n\n\t\tlistOne.forEach((list) => {\n\t\t\tconst button = document.createElement('button');\n\t\t\tbutton.className = 'button nav-btn';\n\t\t\tif (list.name === 'TASKS') {\n\t\t\t\tbutton.classList.add('active');\n\t\t\t}\n\t\t\tbutton.textContent = list.name;\n\t\t\tfirstList.appendChild(button);\n\t\t});\n\n\t\tlistTwo.forEach((list) => {\n\t\t\tconst button = document.createElement('button');\n\t\t\tbutton.className = 'button nav-btn';\n\t\t\tbutton.textContent = list.name;\n\t\t\tsecondList.appendChild(button);\n\t\t});\n\t}\n\n\tstatic displayTasks() {\n\t\tconst navButtons = document.querySelectorAll('nav .nav-btn');\n\t\tconst tasksList = document.querySelector('.tasks-list');\n\t\ttasksList.textContent = '';\n\n\t\tconst tasksTitle = document.querySelector('.content .title');\n\n\t\t(function updateTitle() {\n\t\t\tnavButtons.forEach((button) => {\n\t\t\t\tif (button.classList.contains('active')) {\n\t\t\t\t\ttasksTitle.textContent = button.textContent;\n\t\t\t\t}\n\t\t\t});\n\t\t})();\n\n\t\tnavButtons.forEach((button) => {\n\t\t\tif (button.classList.contains('active')) {\n\t\t\t\tmasterList\n\t\t\t\t\t.findList(button.textContent)\n\t\t\t\t\t.getTasks()\n\t\t\t\t\t.forEach((task) => {\n\t\t\t\t\t\tconst li = document.createElement('li');\n\t\t\t\t\t\tconst circle = document.createElement('div');\n\t\t\t\t\t\tconst checkMark = document.createElement('div');\n\t\t\t\t\t\tconst taskContent = document.createElement('p');\n\t\t\t\t\t\tconst date = document.createElement('p');\n\t\t\t\t\t\tconst star = document.createElement('div');\n\t\t\t\t\t\tconst remove = document.createElement('div');\n\n\t\t\t\t\t\tcircle.className = 'circle';\n\t\t\t\t\t\tcheckMark.className = 'checkMark';\n\t\t\t\t\t\ttaskContent.className = 'task-content';\n\t\t\t\t\t\tdate.className = 'date';\n\t\t\t\t\t\tstar.className = 'star';\n\t\t\t\t\t\tremove.className = 'remove';\n\n\t\t\t\t\t\tif (task.isDone) {\n\t\t\t\t\t\t\tli.classList.add('done');\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tli.classList.remove('done');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\ttaskContent.textContent = task.name;\n\t\t\t\t\t\tdate.textContent = task.date;\n\n\t\t\t\t\t\tif (task.star) {\n\t\t\t\t\t\t\tstar.classList.add('yellow');\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tstar.classList.remove('yellow');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tli.append(circle);\n\t\t\t\t\t\tcircle.append(checkMark);\n\t\t\t\t\t\tli.append(taskContent);\n\t\t\t\t\t\tli.append(date);\n\t\t\t\t\t\tli.append(star);\n\t\t\t\t\t\tli.append(remove);\n\t\t\t\t\t\ttasksList.prepend(li);\n\t\t\t\t\t});\n\t\t\t}\n\t\t});\n\t\tUI.hamburgerMenuControl();\n\t}\n\n\tstatic selectList() {\n\t\tconst navButtons = document.querySelectorAll('nav .nav-btn');\n\n\t\tnavButtons.forEach((button) => {\n\t\t\tbutton.addEventListener('click', (e) => {\n\t\t\t\tif (!e.target.classList.contains('active')) {\n\t\t\t\t\tnavButtons.forEach((btn) => {\n\t\t\t\t\t\tbtn.classList.remove('active');\n\t\t\t\t\t});\n\n\t\t\t\t\te.target.classList.add('active');\n\t\t\t\t\tUI.displayTasks();\n\t\t\t\t}\n\t\t\t});\n\t\t});\n\t}\n\n\tstatic addNewList() {\n\t\tconst newListBtn = document.querySelector('#new-list-btn');\n\t\tconst secondList = document.querySelector('#second-list');\n\n\t\tnewListBtn.addEventListener('click', () => {\n\t\t\tlet inputField = secondList.querySelector('input');\n\t\t\tif (!inputField) {\n\t\t\t\tinputField = document.createElement('input');\n\t\t\t\tinputField.type = 'text';\n\t\t\t\tinputField.className = 'input-field';\n\t\t\t\tsecondList.append(inputField);\n\t\t\t\tinputField.focus();\n\n\t\t\t\tconst inputBtns = document.createElement('div');\n\t\t\t\tinputBtns.className = 'input-btns';\n\t\t\t\tsecondList.append(inputBtns);\n\n\t\t\t\tconst addBtn = document.createElement('button');\n\t\t\t\tconst cancelBtn = document.createElement('button');\n\n\t\t\t\taddBtn.className = 'add-btn action';\n\t\t\t\tcancelBtn.className = 'cancel-btn action';\n\t\t\t\taddBtn.textContent = 'Add';\n\t\t\t\tcancelBtn.textContent = 'Cancel';\n\n\t\t\t\tinputBtns.append(addBtn);\n\t\t\t\tinputBtns.append(cancelBtn);\n\n\t\t\t\tconst addBtnPress = () => {\n\t\t\t\t\tif (masterList.findList(inputField.value)) {\n\t\t\t\t\t\talert('List with this name already exists');\n\t\t\t\t\t} else if (inputField.value === '') {\n\t\t\t\t\t\talert('List name cannot be empty');\n\t\t\t\t\t} else if (!masterList.findList(inputField.value) && inputField.value !== '') {\n\t\t\t\t\t\tmasterList.addList(inputField.value);\n\t\t\t\t\t\tinputField.remove();\n\t\t\t\t\t\tinputBtns.remove();\n\t\t\t\t\t\tUI.displayLists();\n\n\t\t\t\t\t\tconst navButtons = document.querySelectorAll('nav .nav-btn');\n\n\t\t\t\t\t\tnavButtons.forEach((button) => {\n\t\t\t\t\t\t\tif (button.textContent === inputField.value) {\n\t\t\t\t\t\t\t\tbutton.classList.add('active');\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tbutton.classList.remove('active');\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t});\n\n\t\t\t\t\t\tUI.displayTasks();\n\t\t\t\t\t\tUI.selectList();\n\t\t\t\t\t\tUI.addNewList();\n\t\t\t\t\t\tUI.addNewTask();\n\n\t\t\t\t\t\tconsole.log(masterList.findList(inputField.value));\n\t\t\t\t\t\tconsole.log(masterList.getLists());\n\t\t\t\t\t}\n\t\t\t\t};\n\n\t\t\t\taddBtn.addEventListener('click', addBtnPress);\n\n\t\t\t\tdocument.addEventListener('keydown', (e) => {\n\t\t\t\t\tif (e.key === 'Enter') {\n\t\t\t\t\t\taddBtnPress();\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\tconst cancelBtnPress = () => {\n\t\t\t\t\tinputField.remove();\n\t\t\t\t\tinputBtns.remove();\n\t\t\t\t\tUI.addNewList();\n\t\t\t\t\tUI.addNewTask();\n\t\t\t\t};\n\n\t\t\t\tcancelBtn.addEventListener('click', cancelBtnPress);\n\n\t\t\t\tdocument.addEventListener('keydown', (e) => {\n\t\t\t\t\tif (e.key === 'Escape') {\n\t\t\t\t\t\tcancelBtnPress();\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t});\n\t}\n\n\tstatic addNewTask() {\n\t\tconst newTaskBtn = document.querySelector('#add-task-btn');\n\t\tif (!newTaskBtn.hasAttribute('listener')) {\n\t\t\tnewTaskBtn.addEventListener('click', () => {\n\t\t\t\tconst activeButton = document.querySelector('nav .nav-btn.active');\n\t\t\t\tconst currentList = activeButton.textContent;\n\n\t\t\t\tconst newTaskName = prompt('Please enter task name', '');\n\t\t\t\tif (masterList.findTaskInList(currentList, newTaskName)) {\n\t\t\t\t\talert('Task with this name already exists');\n\t\t\t\t} else if (newTaskName === '') {\n\t\t\t\t\talert('Task name cannot be empty');\n\t\t\t\t} else if (newTaskName !== null) {\n\t\t\t\t\tmasterList.addTaskToList(currentList, newTaskName);\n\t\t\t\t\tUI.displayTasks();\n\t\t\t\t}\n\t\t\t});\n\t\t\tnewTaskBtn.setAttribute('listener', 'true');\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack://minimalist/./src/modules/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;