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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui */ \"./src/modules/ui.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', _modules_ui__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadUserInterface);\n\n\n//# sourceURL=webpack://minimalist/./src/index.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ListsManager)\n/* harmony export */ });\n/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list */ \"./src/modules/list.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ \"./src/modules/task.js\");\n\n\n\nclass ListsManager {\n\tconstructor() {\n\t\tthis.lists = [];\n\t\tthis.lists.push(new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('TASKS'));\n\t\tthis.lists.push(new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('TODAY'));\n\t\tthis.lists.push(new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('THIS WEEK'));\n\t}\n\n\taddList(newList) {\n\t\tconst list = new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"](newList);\n\t\tthis.lists.push(list);\n\t}\n\n\tdeleteList(listName) {\n\t\tthis.lists = this.lists.filter((list) => list.name !== listName);\n\t}\n\n\tchangeListName(listName, newName) {\n\t\tconst list = this.findList(listName);\n\t\tif (list) {\n\t\t\tlist.setName(newName);\n\t\t}\n\t}\n\n\taddTaskToList(listName, taskName) {\n\t\tconst list = this.findList(listName);\n\t\tif (list) {\n\t\t\tconst task = new _task__WEBPACK_IMPORTED_MODULE_1__[\"default\"](taskName);\n\t\t\tlist.addTask(task);\n\t\t}\n\t}\n\n\tdeleteTaskFromList(listName, taskName) {\n\t\tconst list = this.findList(listName);\n\t\tif (list) {\n\t\t\tlist.deleteTask(taskName);\n\t\t}\n\t}\n\n\tchangeTaskName(listName, taskName, newName) {\n\t\tconst task = this.findTaskInList(listName, taskName);\n\t\tif (task) {\n\t\t\ttask.setName(newName);\n\t\t}\n\t}\n\n\ttoggleStarInTask(listName, taskName) {\n\t\tconst task = this.findTaskInList(listName, taskName);\n\t\tif (task) {\n\t\t\ttask.toggleStar(task.star);\n\t\t}\n\t}\n\n\taddStarInTask(listName, taskName) {\n\t\tconst task = this.findTaskInList(listName, taskName);\n\t\tif (task) {\n\t\t\ttask.addStar(task.star);\n\t\t}\n\t}\n\n\ttoggleIsDoneInTask(listName, taskName) {\n\t\tconst task = this.findTaskInList(listName, taskName);\n\t\tif (task) {\n\t\t\ttask.toggleIsDone(task.isDone);\n\t\t}\n\t}\n\n\taddIsDoneInTask(listName, taskName) {\n\t\tconst task = this.findTaskInList(listName, taskName);\n\t\tif (task) {\n\t\t\ttask.addIsDone(task.isDone);\n\t\t}\n\t}\n\n\tgetLists() {\n\t\treturn this.lists;\n\t}\n\n\tfindList(listName) {\n\t\treturn this.lists.find((list) => list.name === listName);\n\t}\n\n\tfindTaskInList(listName, taskName) {\n\t\tconst list = this.findList(listName);\n\t\treturn this.findList(listName) ? list.tasks.find((task) => task.name === taskName) : false;\n\t}\n}\n\n\n//# sourceURL=webpack://minimalist/./src/modules/manage.js?");

/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\nclass Task {\n\tconstructor(name, date = 'no date', star = false, isDone = false) {\n\t\tthis.name = name;\n\t\tthis.date = date;\n\t\tthis.star = star;\n\t\tthis.isDone = isDone;\n\t}\n\n\tsetName(name) {\n\t\tthis.name = name;\n\t}\n\n\tgetName() {\n\t\treturn this.name;\n\t}\n\n\tsetDate(date) {\n\t\tthis.date = date;\n\t}\n\n\tgetDate() {\n\t\treturn this.date;\n\t}\n\n\ttoggleStar(star) {\n\t\tthis.star = !star;\n\t}\n\n\taddStar() {\n\t\tthis.star = true;\n\t}\n\n\ttoggleIsDone(isDone) {\n\t\tthis.isDone = !isDone;\n\t}\n\n\taddIsDone() {\n\t\tthis.isDone = true;\n\t}\n}\n\n\n//# sourceURL=webpack://minimalist/./src/modules/task.js?");

/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _manage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./manage */ \"./src/modules/manage.js\");\n\n\nclass UI {\n\tstatic masterList = new _manage__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n\tstatic lastWidth = window.innerWidth;\n\n\tstatic hamburgerAutoToggle() {\n\t\tconst hamburger = document.querySelector('#hamburger');\n\t\tconst main = document.querySelector('.main');\n\t\tif (window.matchMedia('(min-width: 800px)').matches) {\n\t\t\thamburger.classList.add('open');\n\t\t\tmain.classList.remove('sidebar-toggle');\n\n\t\t\tif (this.lastWidth < 800) {\n\t\t\t\tconst toggle = new Audio('sound/mixkit-air-woosh-1489-pitch.wav');\n\t\t\t\ttoggle.play();\n\t\t\t}\n\t\t} else {\n\t\t\thamburger.classList.remove('open');\n\t\t\tmain.classList.add('sidebar-toggle');\n\n\t\t\tif (this.lastWidth >= 800) {\n\t\t\t\tconst reverseToggle = new Audio('sound/mixkit-air-woosh-1489-pitch-reverse.wav');\n\t\t\t\treverseToggle.play();\n\t\t\t}\n\t\t}\n\t\tthis.lastWidth = window.innerWidth;\n\t}\n\n\tstatic hamburgerManualToggle(e) {\n\t\tconst hamburger = document.querySelector('#hamburger');\n\t\tconst main = document.querySelector('.main');\n\t\thamburger.classList.toggle('open');\n\t\tmain.classList.toggle('sidebar-toggle');\n\n\t\tif (e.target.closest('#hamburger.open')) {\n\t\t\tconst toggle = new Audio('sound/mixkit-air-woosh-1489-pitch.wav');\n\t\t\ttoggle.play();\n\t\t}\n\n\t\tif (e.target.closest('#hamburger:not(.open)')) {\n\t\t\tconst reverseToggle = new Audio('sound/mixkit-air-woosh-1489-pitch-reverse.wav');\n\t\t\treverseToggle.play();\n\t\t}\n\t}\n\n\tstatic hamburgerManualClose(e) {\n\t\tconst currentList = UI.getActiveList();\n\t\tif (e.target.textContent === currentList) {\n\t\t\tif (e.target.classList.contains('nav-btn')) {\n\t\t\t\tif (window.innerWidth < 800) {\n\t\t\t\t\tconst reverseToggle = new Audio('sound/mixkit-air-woosh-1489-pitch-reverse.wav');\n\t\t\t\t\treverseToggle.play();\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\tstatic createList(list) {\n\t\tconst button = document.createElement('button');\n\t\tbutton.className = 'button nav-btn';\n\t\tbutton.textContent = list.name;\n\n\t\tconst remove = document.createElement('div');\n\t\tremove.className = 'remove';\n\n\t\tconst btnWrap = document.createElement('div');\n\t\tbtnWrap.className = 'btnWrap';\n\n\t\tbtnWrap.append(button);\n\t\tbtnWrap.append(remove);\n\n\t\treturn { button, btnWrap };\n\t}\n\n\tstatic displayLists(activeList) {\n\t\tconst listOne = this.masterList.getLists().slice(0, 3);\n\t\tconst listTwo = this.masterList.getLists().slice(3);\n\t\tconst firstList = document.querySelector('#first-list');\n\t\tconst secondList = document.querySelector('#second-list');\n\t\tfirstList.textContent = '';\n\t\tsecondList.textContent = '';\n\n\t\tlistOne.forEach((list) => {\n\t\t\tconst { button } = this.createList(list);\n\t\t\tfirstList.appendChild(button);\n\t\t});\n\n\t\tlistTwo.forEach((list) => {\n\t\t\tconst { btnWrap } = this.createList(list);\n\t\t\tsecondList.appendChild(btnWrap);\n\t\t});\n\n\t\tthis.setActiveList(activeList);\n\n\t\tthis.addListHandlers(secondList);\n\t}\n\n\tstatic updateListName(inputField) {\n\t\tconst tasksTitle = document.querySelector('.content .title');\n\t\tconst tasksList = document.querySelector('.tasks-list');\n\t\ttasksTitle.textContent = inputField.value;\n\t\tif (!inputField.value) {\n\t\t\ttasksTitle.textContent = inputField;\n\t\t}\n\t\tthis.displayLists(tasksTitle.textContent);\n\t\tthis.addTaskHandlers(tasksList, tasksTitle);\n\t}\n\n\tstatic handleInputField(element, name, listName, isTask) {\n\t\tconst inputField = this.createInputField(element, name);\n\t\tlet isEnterPressed = false;\n\t\tlet isEscapePressed = false;\n\n\t\tconst changeName = () => {\n\t\t\tif (isTask) {\n\t\t\t\tif (this.validateTaskName(inputField.value)) {\n\t\t\t\t\tthis.masterList.changeTaskName(listName, name, inputField.value);\n\t\t\t\t\tthis.displayTasks();\n\t\t\t\t} else {\n\t\t\t\t\tsetTimeout(() => {\n\t\t\t\t\t\tthis.displayTasks();\n\t\t\t\t\t}, 1000);\n\t\t\t\t}\n\t\t\t} else if (this.validateListName(inputField.value)) {\n\t\t\t\tthis.masterList.changeListName(name, inputField.value);\n\t\t\t\tthis.setActiveList(inputField.value);\n\t\t\t\tthis.updateListName(inputField);\n\t\t\t\tthis.selectList();\n\t\t\t} else {\n\t\t\t\tthis.updateListName(this.getActiveList());\n\t\t\t\tthis.selectList();\n\t\t\t}\n\t\t};\n\n\t\tconst handleEnter = (k) => {\n\t\t\tif (inputField && k.key === 'Enter') {\n\t\t\t\tisEnterPressed = true;\n\t\t\t\tchangeName();\n\t\t\t}\n\t\t};\n\n\t\tconst handleEscape = (k) => {\n\t\t\tif (k.key === 'Escape') {\n\t\t\t\tisEscapePressed = true;\n\t\t\t\tthis.displayTasks();\n\t\t\t\twindow.removeEventListener('keydown', handleEscape);\n\t\t\t}\n\t\t};\n\n\t\tconst handleBlur = () => {\n\t\t\tif (!isEnterPressed && !isEscapePressed) {\n\t\t\t\tchangeName();\n\t\t\t}\n\n\t\t\twindow.removeEventListener('keydown', handleEnter);\n\t\t\twindow.removeEventListener('keydown', handleEscape);\n\t\t\tinputField.removeEventListener('blur', handleBlur);\n\t\t};\n\t\twindow.addEventListener('keydown', handleEnter);\n\t\twindow.addEventListener('keydown', handleEscape);\n\t\tinputField.addEventListener('blur', handleBlur);\n\t}\n\n\tstatic editName(e, isTask) {\n\t\tconst listName = this.getActiveList();\n\t\tconst element = e.target.closest(isTask ? '.task-content' : '.content .title');\n\n\t\tif (element && !element.contains(document.querySelector('.input-field'))) {\n\t\t\tconst name = element.textContent;\n\t\t\telement.textContent = '';\n\t\t\tthis.handleInputField(element, name, listName, isTask);\n\t\t}\n\t}\n\n\tstatic editListName(e) {\n\t\tif (e.target.textContent !== 'TASKS' && e.target.textContent !== 'TODAY' && e.target.textContent !== 'THIS WEEK') {\n\t\t\tthis.editName(e, false);\n\t\t}\n\t}\n\n\tstatic editTaskName(e) {\n\t\tthis.editName(e, true);\n\t}\n\n\tstatic getNextList(e) {\n\t\tlet nextList;\n\t\tconst parentElementSibling = e.target.parentElement.nextElementSibling;\n\t\tif (parentElementSibling) {\n\t\t\tconst navBtn = parentElementSibling.querySelector('.nav-btn');\n\t\t\tif (navBtn) {\n\t\t\t\tnextList = navBtn.textContent;\n\t\t\t}\n\t\t}\n\t\treturn nextList;\n\t}\n\n\tstatic updateActiveList(currentList, listName, nextList) {\n\t\tconst lastList = this.masterList.getLists().slice(-1)[0].name;\n\n\t\tif (currentList !== listName) {\n\t\t\tthis.setActiveList(currentList);\n\t\t} else if (nextList) {\n\t\t\tthis.setActiveList(nextList);\n\t\t} else {\n\t\t\tthis.setActiveList(lastList);\n\t\t}\n\t}\n\n\tstatic removeList(e) {\n\t\tconst listName = e.target.parentElement.querySelector('.nav-btn').textContent;\n\t\tconst currentList = this.getActiveList();\n\t\tconst nextList = this.getNextList(e);\n\n\t\tthis.masterList.deleteList(listName);\n\t\tthis.displayLists();\n\t\tthis.updateActiveList(currentList, listName, nextList);\n\t\tthis.displayTasks();\n\t\tthis.selectList();\n\t\tthis.removeSound();\n\t}\n\n\tstatic addEventHandler(selector, event, handler, location) {\n\t\tconst elements = location.querySelectorAll(selector);\n\n\t\telements.forEach((element) => {\n\t\t\telement.addEventListener(event, handler.bind(this));\n\t\t});\n\t}\n\n\tstatic addListHandlers(secondList) {\n\t\tthis.addEventHandler('.remove', 'click', this.removeList, secondList);\n\t}\n\n\tstatic createTask(task) {\n\t\tconst li = document.createElement('li');\n\t\tconst circle = document.createElement('div');\n\t\tconst checkMark = document.createElement('div');\n\t\tconst taskContent = document.createElement('p');\n\t\tconst date = document.createElement('p');\n\t\tconst star = document.createElement('div');\n\t\tconst remove = document.createElement('div');\n\n\t\tcircle.className = 'circle';\n\t\tcheckMark.className = 'checkMark';\n\t\ttaskContent.className = 'task-content';\n\t\tdate.className = 'date';\n\t\tstar.className = 'star';\n\t\tremove.className = 'remove';\n\n\t\tif (task.isDone) {\n\t\t\tli.classList.add('done');\n\t\t} else {\n\t\t\tli.classList.remove('done');\n\t\t}\n\n\t\ttaskContent.textContent = task.name;\n\t\tdate.textContent = task.date;\n\n\t\tif (task.star) {\n\t\t\tstar.classList.add('yellow');\n\t\t} else {\n\t\t\tstar.classList.remove('yellow');\n\t\t}\n\n\t\tli.append(circle);\n\t\tcircle.append(checkMark);\n\t\tli.append(taskContent);\n\t\tli.append(date);\n\t\tli.append(star);\n\t\tli.append(remove);\n\n\t\treturn li;\n\t}\n\n\tstatic displayTasks() {\n\t\tconst tasksTitle = document.querySelector('.content .title');\n\t\tconst tasksList = document.querySelector('.tasks-list');\n\t\tconst currentList = this.getActiveList();\n\t\tif (currentList) {\n\t\t\ttasksList.textContent = '';\n\t\t\ttasksTitle.textContent = currentList;\n\n\t\t\tif (tasksTitle.textContent === 'TASKS' || tasksTitle.textContent === 'TODAY' || tasksTitle.textContent === 'THIS WEEK') {\n\t\t\t\ttasksTitle.classList.add('default');\n\t\t\t} else {\n\t\t\t\ttasksTitle.classList.remove('default');\n\t\t\t}\n\n\t\t\tthis.masterList\n\t\t\t\t.findList(currentList)\n\t\t\t\t.getTasks()\n\t\t\t\t.forEach((task) => {\n\t\t\t\t\ttasksList.prepend(this.createTask(task));\n\t\t\t\t});\n\t\t}\n\t\tthis.addTaskHandlers(tasksList, tasksTitle);\n\t}\n\n\tstatic toggleIsDone(e) {\n\t\tconst listName = this.getActiveList();\n\t\tconst taskName = e.target.parentElement.querySelector('.task-content').textContent;\n\t\tthis.masterList.toggleIsDoneInTask(listName, taskName);\n\t\tthis.displayTasks();\n\t\tthis.isDoneSound(e);\n\t}\n\n\tstatic createInputField(task, taskName) {\n\t\tconst inputField = document.createElement('input');\n\t\tinputField.className = 'input-field';\n\t\tinputField.type = 'text';\n\t\ttask.append(inputField);\n\t\tinputField.value = taskName;\n\t\tinputField.focus();\n\t\treturn inputField;\n\t}\n\n\tstatic toggleStar(e) {\n\t\tconst listName = this.getActiveList();\n\t\tconst taskName = e.target.parentElement.querySelector('.task-content').textContent;\n\t\tthis.masterList.toggleStarInTask(listName, taskName);\n\t\tthis.displayTasks();\n\n\t\tthis.starSound(e);\n\t}\n\n\tstatic removeTask(e) {\n\t\tconst listName = this.getActiveList();\n\t\tconst taskName = e.target.parentElement.querySelector('.task-content').textContent;\n\t\tthis.masterList.deleteTaskFromList(listName, taskName);\n\t\tthis.displayTasks();\n\t\tthis.removeSound();\n\t}\n\n\tstatic addTaskHandlers(tasksList) {\n\t\tthis.addEventHandler('.circle', 'click', this.toggleIsDone, tasksList);\n\t\tthis.addEventHandler('.task-content', 'click', this.editTaskName, tasksList);\n\t\tthis.addEventHandler('.star', 'click', this.toggleStar, tasksList);\n\t\tthis.addEventHandler('.remove', 'click', this.removeTask, tasksList);\n\t}\n\n\tstatic selectList() {\n\t\tconst navButtons = document.querySelectorAll('nav .nav-btn');\n\t\tconst removeActiveClass = () => navButtons.forEach((btn) => btn.classList.remove('active'));\n\t\tconst addActiveClass = (target) => target.classList.add('active');\n\n\t\tnavButtons.forEach((button) => {\n\t\t\tbutton.addEventListener('click', (e) => {\n\t\t\t\tif (!e.target.classList.contains('active')) {\n\t\t\t\t\tremoveActiveClass();\n\t\t\t\t\taddActiveClass(e.target);\n\t\t\t\t\tthis.displayTasks();\n\t\t\t\t}\n\t\t\t\tthis.hamburgerAutoToggle();\n\t\t\t});\n\t\t});\n\t\tthis.hamburgerAutoToggle();\n\t}\n\n\tstatic createInputContainer() {\n\t\tconst inputDiv = document.createElement('div');\n\t\tinputDiv.className = 'input-container';\n\n\t\tconst inputField = document.createElement('input');\n\t\tinputField.className = 'input-field';\n\t\tinputField.type = 'text';\n\t\tinputDiv.append(inputField);\n\n\t\tconst inputBtns = document.createElement('div');\n\t\tinputBtns.className = 'input-btns';\n\t\tinputDiv.append(inputBtns);\n\n\t\tconst addBtn = document.createElement('button');\n\t\taddBtn.className = 'add-btn action';\n\t\taddBtn.textContent = 'Add';\n\t\tinputBtns.append(addBtn);\n\n\t\tconst cancelBtn = document.createElement('button');\n\t\tcancelBtn.className = 'cancel-btn action';\n\t\tcancelBtn.textContent = 'Cancel';\n\t\tinputBtns.append(cancelBtn);\n\n\t\treturn inputDiv;\n\t}\n\n\tstatic setActiveList(listName) {\n\t\tconst navButtons = document.querySelectorAll('nav .nav-btn');\n\n\t\tnavButtons.forEach((button) => {\n\t\t\tif (button.textContent === listName) {\n\t\t\t\tbutton.classList.add('active');\n\t\t\t} else {\n\t\t\t\tbutton.classList.remove('active');\n\t\t\t}\n\t\t});\n\t}\n\n\tstatic getActiveList() {\n\t\tconst currentList = document.querySelector('nav .nav-btn.active').textContent;\n\t\treturn currentList;\n\t}\n\n\tstatic emptyTitlePopup() {\n\t\tconst content = document.querySelector('.content');\n\t\tcontent.classList.add('empty');\n\n\t\tconst tasksList = document.querySelectorAll('.tasks-list li');\n\t\ttasksList.forEach((task) => {\n\t\t\ttask.classList.add('lock');\n\t\t});\n\n\t\tconst handleAnimationEnd = () => {\n\t\t\tcontent.classList.remove('empty');\n\n\t\t\ttasksList.forEach((task) => {\n\t\t\t\ttask.classList.remove('lock');\n\t\t\t});\n\n\t\t\tcontent.removeEventListener('animationend', handleAnimationEnd);\n\t\t\tthis.displayTasks();\n\t\t};\n\n\t\tcontent.addEventListener('animationend', handleAnimationEnd);\n\t}\n\n\tstatic emptyTaskPopup() {\n\t\tconst content = document.querySelector('.content');\n\t\tcontent.classList.add('lock');\n\n\t\tconst tasksList = document.querySelectorAll('.tasks-list li');\n\t\ttasksList.forEach((task) => {\n\t\t\tif (task.querySelector('.task-content').textContent === '') {\n\t\t\t\ttask.classList.add('empty');\n\t\t\t\ttask.querySelector('.input-field').remove();\n\n\t\t\t\tconst handleAnimationEnd = () => {\n\t\t\t\t\tcontent.classList.remove('lock');\n\t\t\t\t\ttask.classList.remove('empty');\n\t\t\t\t\ttask.classList.remove('lock');\n\t\t\t\t\ttask.removeEventListener('animationend', handleAnimationEnd);\n\t\t\t\t\tthis.displayTasks();\n\t\t\t\t};\n\t\t\t\ttask.addEventListener('animationend', handleAnimationEnd);\n\t\t\t} else {\n\t\t\t\ttask.classList.add('lock');\n\t\t\t}\n\t\t});\n\t}\n\n\tstatic existsTitlePopup() {\n\t\tconst content = document.querySelector('.content');\n\t\tcontent.classList.add('exists');\n\n\t\tconst tasksList = document.querySelectorAll('.tasks-list li');\n\t\ttasksList.forEach((task) => {\n\t\t\ttask.classList.add('lock');\n\t\t});\n\n\t\tconst handleAnimationEnd = () => {\n\t\t\tcontent.classList.remove('exists');\n\n\t\t\ttasksList.forEach((task) => {\n\t\t\t\ttask.classList.remove('lock');\n\t\t\t});\n\n\t\t\tcontent.removeEventListener('animationend', handleAnimationEnd);\n\t\t\tthis.displayTasks();\n\t\t};\n\n\t\tcontent.addEventListener('animationend', handleAnimationEnd);\n\t}\n\n\tstatic existsTaskPopup() {\n\t\tconst content = document.querySelector('.content');\n\n\t\tcontent.classList.add('lock');\n\n\t\tconst tasksList = document.querySelectorAll('.tasks-list li');\n\t\ttasksList.forEach((task) => {\n\t\t\tif (task.querySelector('.task-content').textContent === '') {\n\t\t\t\ttask.classList.add('exists');\n\t\t\t\ttask.querySelector('.input-field').remove();\n\n\t\t\t\tconst handleAnimationEnd = () => {\n\t\t\t\t\tcontent.classList.remove('lock');\n\t\t\t\t\ttask.classList.remove('exists');\n\t\t\t\t\ttask.classList.remove('lock');\n\t\t\t\t\ttask.removeEventListener('animationend', handleAnimationEnd);\n\t\t\t\t\tthis.displayTasks();\n\t\t\t\t};\n\t\t\t\ttask.addEventListener('animationend', handleAnimationEnd);\n\t\t\t\tsetTimeout(() => {\n\t\t\t\t\tcontent.classList.remove('lock');\n\t\t\t\t}, 1000);\n\t\t\t} else {\n\t\t\t\ttask.classList.add('lock');\n\t\t\t}\n\t\t});\n\t}\n\n\tstatic validateName(name, type) {\n\t\tif (name === '' || name.match(/^\\s+$/)) {\n\t\t\tif (type === 'List') {\n\t\t\t\tthis.emptyTitlePopup();\n\t\t\t} else if (type === 'Task') {\n\t\t\t\tthis.emptyTaskPopup();\n\t\t\t}\n\t\t\tconst empty = document.querySelector('.empty');\n\t\t\tempty.setAttribute('data-before', `${type} name cannot be empty`);\n\t\t\tthis.alertSound();\n\t\t\treturn false;\n\t\t}\n\t\treturn true;\n\t}\n\n\tstatic validateListName(listName) {\n\t\tif (!this.validateName(listName, 'List')) return false;\n\t\tif (this.masterList.findList(listName)) {\n\t\t\tthis.existsTitlePopup();\n\t\t\tconst exists = document.querySelector('.exists');\n\t\t\texists.setAttribute('data-before', `List with this name already exists`);\n\t\t\tthis.alertSound();\n\t\t\treturn false;\n\t\t}\n\t\treturn true;\n\t}\n\n\tstatic validateTaskName(taskName) {\n\t\tif (!this.validateName(taskName, 'Task')) return false;\n\t\tif (this.masterList.findTaskInList(this.getActiveList(), taskName)) {\n\t\t\tthis.existsTaskPopup();\n\t\t\tconst exists = document.querySelector('.exists');\n\t\t\texists.setAttribute('data-before', `Task with this name already exists`);\n\t\t\tthis.alertSound();\n\t\t\treturn false;\n\t\t}\n\t\treturn true;\n\t}\n\n\tstatic addBtnPress(inputField, whereToAdd) {\n\t\tconst listName = inputField.value;\n\n\t\tif (whereToAdd.id === 'second-list') {\n\t\t\tif (!this.validateListName(listName)) {\n\t\t\t\tinputField.focus();\n\t\t\t} else {\n\t\t\t\tthis.masterList.addList(listName);\n\t\t\t\tthis.closeInputContainer();\n\t\t\t\tthis.displayLists('TASKS');\n\t\t\t\tthis.setActiveList(listName);\n\t\t\t\tthis.displayTasks();\n\t\t\t\tthis.selectList();\n\t\t\t\tthis.confirmSound();\n\t\t\t}\n\t\t}\n\n\t\tif (whereToAdd.className === 'tasks') {\n\t\t\tif (!this.validateTaskName(listName)) {\n\t\t\t\tinputField.focus();\n\t\t\t} else {\n\t\t\t\tthis.masterList.addTaskToList(this.getActiveList(), listName);\n\t\t\t\tthis.closeInputContainer();\n\t\t\t\tthis.displayTasks();\n\t\t\t\tthis.confirmSound();\n\t\t\t}\n\t\t}\n\t}\n\n\tstatic cancelBtnPress(inputContainer) {\n\t\tinputContainer.remove();\n\t\tthis.abortSound();\n\t}\n\n\tstatic addNewElement(whichBtn, whereToAdd) {\n\t\twhichBtn.addEventListener('click', () => {\n\t\t\tlet inputContainer = whereToAdd.querySelector('.input-container');\n\t\t\tif (!inputContainer) {\n\t\t\t\tthis.closeInputContainer();\n\n\t\t\t\tconst secondList = document.querySelector('#second-list');\n\t\t\t\tconst tasksList = document.querySelector('.tasks');\n\n\t\t\t\tif (whereToAdd === secondList) {\n\t\t\t\t\twhereToAdd.append(this.createInputContainer());\n\t\t\t\t} else if (whereToAdd === tasksList) {\n\t\t\t\t\twhereToAdd.prepend(this.createInputContainer());\n\t\t\t\t}\n\n\t\t\t\tconst inputField = whereToAdd.querySelector('input');\n\t\t\t\tinputField.focus();\n\t\t\t\tinputContainer = whereToAdd.querySelector('.input-container');\n\n\t\t\t\tconst addBtn = whereToAdd.querySelector('.add-btn');\n\t\t\t\tconst cancelBtn = whereToAdd.querySelector('.cancel-btn');\n\n\t\t\t\taddBtn.addEventListener('click', () => this.addBtnPress(inputField, whereToAdd));\n\t\t\t\tcancelBtn.addEventListener('click', () => this.cancelBtnPress(inputContainer));\n\t\t\t} else {\n\t\t\t\tconst inputField = whereToAdd.querySelector('input');\n\t\t\t\tinputField.focus();\n\t\t\t}\n\t\t\tthis.addNewSound();\n\t\t});\n\t}\n\n\tstatic addNewList() {\n\t\tconst newListBtn = document.querySelector('#new-list-btn');\n\t\tconst secondList = document.querySelector('#second-list');\n\t\tthis.addNewElement(newListBtn, secondList);\n\t}\n\n\tstatic addNewTask() {\n\t\tconst newTaskBtn = document.querySelector('#add-task-btn');\n\t\tconst tasksList = document.querySelector('.tasks');\n\t\tthis.addNewElement(newTaskBtn, tasksList);\n\t}\n\n\tstatic closeInputContainer() {\n\t\tconst inputContainer = document.querySelector('.input-container');\n\t\tif (inputContainer) {\n\t\t\tinputContainer.remove();\n\t\t}\n\t}\n\n\tstatic closeInputContainerOnClick(e) {\n\t\tconst inputContainer = e.target.closest('.input-container');\n\t\tconst hamburger = e.target.closest('#hamburger');\n\n\t\tif (!inputContainer && e.target.id !== 'new-list-btn' && e.target.id !== 'add-task-btn' && !hamburger) {\n\t\t\tthis.closeInputContainer();\n\t\t}\n\t}\n\n\tstatic handleKeyboardAddCancel = (e) => {\n\t\tconst inputContainer = document.querySelector('.input-container');\n\t\tif (inputContainer) {\n\t\t\tif (e.key === 'Enter') {\n\t\t\t\tconst addBtn = inputContainer.querySelector('.add-btn');\n\t\t\t\taddBtn.click();\n\t\t\t} else if (e.key === 'Escape') {\n\t\t\t\tconst cancelBtn = inputContainer.querySelector('.cancel-btn');\n\t\t\t\tcancelBtn.click();\n\t\t\t}\n\t\t}\n\t};\n\n\tstatic isDoneSound(e) {\n\t\tif (!e.target.parentElement.classList.contains('done')) {\n\t\t\tconst done = new Audio('sound/mixkit-game-ball-tap-2073.wav');\n\t\t\tdone.play();\n\t\t}\n\n\t\tif (e.target.parentElement.classList.contains('done')) {\n\t\t\tconst reverseDone = new Audio('sound/mixkit-game-ball-tap-2073-reverse-slow.wav');\n\t\t\treverseDone.play();\n\t\t}\n\t}\n\n\tstatic starSound(e) {\n\t\tif (!e.target.classList.contains('yellow')) {\n\t\t\tconst star = new Audio('sound/mixkit-retro-arcade-casino-notification-211.wav');\n\t\t\tstar.play();\n\t\t}\n\n\t\tif (e.target.classList.contains('yellow')) {\n\t\t\tconst reverseStar = new Audio('sound/mixkit-retro-arcade-casino-notification-211-reverse.wav');\n\t\t\treverseStar.play();\n\t\t}\n\t}\n\n\tstatic removeSound() {\n\t\tconst remove = new Audio('sound/Empty-trash-sound-effect-reverse.mp3');\n\t\tremove.play();\n\t}\n\n\tstatic loadSound() {\n\t\tconst remove = new Audio('sound/mixkit-player-boost-recharging-2040.wav');\n\t\tremove.play();\n\t}\n\n\tstatic addNewSound() {\n\t\tconst addNew = new Audio('sound/mixkit-repeating-arcade-beep-1084.wav');\n\t\taddNew.play();\n\t}\n\n\tstatic alertSound() {\n\t\tconst alert = new Audio('sound/mixkit-quick-jump-arcade-game-239.wav');\n\t\talert.play();\n\t}\n\n\tstatic confirmSound() {\n\t\tconst confirm = new Audio('sound/mixkit-video-game-lock-2851.wav');\n\t\tconfirm.play();\n\t}\n\n\tstatic abortSound() {\n\t\tconst abort = new Audio('sound/mixkit-video-game-lock-2851-reverse.wav');\n\t\tabort.play();\n\t}\n\n\tstatic loadExampleContent = () => {\n\t\tconst lists = ['Shopping', 'Movies to watch', 'Places to visit', 'Great ideas!'];\n\n\t\tconst tasks = [\n\t\t\t'Bake Neapolitan pizza',\n\t\t\t'Go swimming on Tuesday',\n\t\t\t'Get hired as a Front End Developer',\n\t\t\t'Conquer the Crown of Polish Mountains',\n\t\t\t'Finish The Odin Project',\n\t\t];\n\n\t\tconst shopping = [\n\t\t\t'Apples',\n\t\t\t'Bananas',\n\t\t\t'Strawberries',\n\t\t\t'Avocados',\n\t\t\t'Bell Peppers',\n\t\t\t'Carrots',\n\t\t\t'Broccoli',\n\t\t\t'Garlic',\n\t\t\t'Lemons/Limes',\n\t\t\t'Onion',\n\t\t\t'Basil',\n\t\t\t'Potatoes',\n\t\t\t'Spinach',\n\t\t\t'Tomatoes',\n\t\t];\n\n\t\tconst placesToVisit = ['Amsterdam', 'Berlin', 'Madrid', 'Rome', 'London', 'Paris', 'Prague', 'Stockholm', 'Vienna'];\n\n\t\tconst moviesToWatch = [\n\t\t\t'1. 2001: A Space Odyssey (1968)',\n\t\t\t'2. Blade Runner (1982)',\n\t\t\t'3. Star Wars: Episode IV - A New Hope (1977)',\n\t\t\t'4. Alien (1979)',\n\t\t\t'5. Star Wars: Episode V - The Empire Strikes Back (1980)',\n\t\t\t'6. Planet of the Apes (1968)',\n\t\t\t'7. Star Trek II: The Wrath of Khan (1982)',\n\t\t\t'8. The Matrix (1999)',\n\t\t\t'9. The Thing (1982)',\n\t\t\t'10. Jurassic Park (1993)',\n\t\t\t'11. Aliens (1986)',\n\t\t\t'12. E.T. the Extra-Terrestrial (1982)',\n\t\t\t'13. A Clockwork Orange (1971)',\n\t\t\t'14. The Day the Earth Stood Still (1951)',\n\t\t\t'15. Invasion of the Body Snatchers (1956)',\n\t\t\t'16. Metropolis (1927)',\n\t\t\t'17. Terminator 2: Judgement Day (1991)',\n\t\t\t'18. Forbidden Planet (1956)',\n\t\t\t'19. Close Encounters of the Third Kind (1977)',\n\t\t\t'20. Back to the Future (1985)',\n\t\t\t'21. Brazil (1985)',\n\t\t\t'22. Starship Troopers (1997)',\n\t\t\t'23. Ex Machina (2014)',\n\t\t\t'24. Wall-E (2008)',\n\t\t\t'25. Inception (2010)',\n\t\t];\n\n\t\tconst greatIdeas = [\n\t\t\t'1) Travel to a country where you don’t speak the language',\n\t\t\t'2) Go on a solo trip',\n\t\t\t'3) Visit a “Dark Sky” site',\n\t\t\t'4) Live abroad for a year',\n\t\t\t'5) Take a pottery class',\n\t\t\t'6) Plant a vegetable garden',\n\t\t\t'7) Start a book club',\n\t\t\t'8) Write a book',\n\t\t\t'9) Teach a class',\n\t\t\t'10) Become a mentor',\n\t\t\t'11) Climb a mountain',\n\t\t\t'12) Run a marathon',\n\t\t\t'13) Start your own business',\n\t\t\t'14) Plant a tree and watch it grow',\n\t\t\t'15) Become a volunteer',\n\t\t\t'16) Adopt a pet',\n\t\t\t'17) Try skydiving',\n\t\t\t'18) Take a hot air balloon ride',\n\t\t\t'19) Learn to meditate',\n\t\t\t'20) Join a dance class',\n\t\t\t'21) Write a Letter to Your Future Self',\n\t\t\t'22) Do Something—anything!—You’ve never done',\n\t\t];\n\n\t\tconst loadLists = (listsArray) => {\n\t\t\tlistsArray.forEach((list) => {\n\t\t\t\tif (!this.masterList.findList(list)) {\n\t\t\t\t\tthis.masterList.addList(list);\n\t\t\t\t}\n\t\t\t});\n\t\t};\n\n\t\tconst loadTasks = (listName, tasksArray) => {\n\t\t\ttasksArray.forEach((task) => {\n\t\t\t\tif (!this.masterList.findTaskInList(listName, task)) {\n\t\t\t\t\tthis.masterList.addTaskToList(listName, task);\n\t\t\t\t}\n\t\t\t});\n\t\t};\n\n\t\tloadLists(lists);\n\t\tloadTasks('TASKS', tasks);\n\t\tloadTasks('Shopping', shopping);\n\t\tloadTasks('Places to visit', placesToVisit);\n\t\tloadTasks('Movies to watch', moviesToWatch);\n\t\tloadTasks('Great ideas!', greatIdeas);\n\n\t\tthis.masterList.addStarInTask('TASKS', 'Conquer the Crown of Polish Mountains');\n\t\tthis.masterList.addIsDoneInTask('TASKS', 'Go swimming on Tuesday');\n\n\t\tthis.displayLists('TASKS');\n\n\t\tthis.displayLists('Shopping');\n\n\t\tthis.displayTasks();\n\t\tthis.selectList();\n\t};\n\n\tstatic clearAllContent = () => {\n\t\tthis.masterList = new _manage__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\t\tthis.displayLists('TASKS');\n\t\tthis.displayTasks();\n\t\tthis.selectList();\n\t\tthis.removeSound();\n\t};\n\n\tstatic attachEventListeners() {\n\t\tconst hamburger = document.querySelector('#hamburger');\n\t\tconst nav = document.querySelector('nav.nav');\n\t\tconst loadExampleBtn = document.querySelector('#load-example-btn');\n\t\tconst clearAllBtn = document.querySelector('#clear-all-btn');\n\t\tconst tasksTitle = document.querySelector('.content .title');\n\n\t\thamburger.addEventListener('click', this.hamburgerManualToggle);\n\t\tnav.addEventListener('click', this.hamburgerManualClose);\n\t\twindow.addEventListener('resize', this.hamburgerAutoToggle);\n\n\t\tloadExampleBtn.addEventListener('click', () => {\n\t\t\tthis.loadExampleContent();\n\t\t\tthis.loadSound();\n\t\t});\n\n\t\tclearAllBtn.addEventListener('click', this.clearAllContent);\n\t\twindow.addEventListener('keydown', this.handleKeyboardAddCancel);\n\t\twindow.addEventListener('click', this.closeInputContainerOnClick.bind(this), true);\n\t\ttasksTitle.addEventListener('click', this.editListName.bind(this));\n\t}\n\n\tstatic loadUserInterface() {\n\t\tUI.hamburgerAutoToggle();\n\t\tUI.displayLists('TASKS');\n\t\tUI.displayTasks();\n\t\tUI.selectList();\n\t\tUI.addNewList();\n\t\tUI.addNewTask();\n\t\tUI.attachEventListeners();\n\t\tUI.loadExampleContent();\n\t}\n}\n\n\n//# sourceURL=webpack://minimalist/./src/modules/ui.js?");

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