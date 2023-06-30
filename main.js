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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui */ \"./src/modules/ui.js\");\n/* harmony import */ var _modules_manage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/manage */ \"./src/modules/manage.js\");\n\n\n\n\n\n//# sourceURL=webpack://minimalist/./src/index.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ListsManager)\n/* harmony export */ });\n/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list */ \"./src/modules/list.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ \"./src/modules/task.js\");\n\n\n\nclass ListsManager {\n\tconstructor() {\n\t\tthis.lists = [];\n\t\tthis.lists.push(new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('TASKS'));\n\t\tthis.lists.push(new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('TODAY'));\n\t\tthis.lists.push(new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('THIS WEEK'));\n\t}\n\n\taddList(newList) {\n\t\tconst list = new _list__WEBPACK_IMPORTED_MODULE_0__[\"default\"](newList);\n\t\tthis.lists.push(list);\n\t}\n\n\tdeleteList(listName) {\n\t\tthis.lists = this.lists.filter((list) => list.name !== listName);\n\t}\n\n\tchangeListName(listName, newName) {\n\t\tconst list = this.findList(listName);\n\t\tif (list) {\n\t\t\tlist.setName(newName);\n\t\t}\n\t}\n\n\taddTaskToList(listName, taskName) {\n\t\tconst list = this.findList(listName);\n\t\tif (list) {\n\t\t\tconst task = new _task__WEBPACK_IMPORTED_MODULE_1__[\"default\"](taskName);\n\t\t\tlist.addTask(task);\n\t\t}\n\t}\n\n\tdeleteTaskFromList(listName, taskName) {\n\t\tconst list = this.findList(listName);\n\t\tif (list) {\n\t\t\tlist.deleteTask(taskName);\n\t\t}\n\t}\n\n\tchangeTaskName(listName, taskName, newName) {\n\t\tconst task = this.findTaskInList(listName, taskName);\n\t\tif (task) {\n\t\t\ttask.setName(newName);\n\t\t}\n\t}\n\n\ttoggleStarInTask(listName, taskName) {\n\t\tconst task = this.findTaskInList(listName, taskName);\n\t\tif (task) {\n\t\t\ttask.toggleStar(task.star);\n\t\t}\n\t}\n\n\ttoggleIsDoneInTask(listName, taskName) {\n\t\tconst task = this.findTaskInList(listName, taskName);\n\t\tif (task) {\n\t\t\ttask.toggleIsDone(task.isDone);\n\t\t}\n\t}\n\n\tgetLists() {\n\t\treturn this.lists;\n\t}\n\n\tfindList(listName) {\n\t\treturn this.lists.find((list) => list.name === listName);\n\t}\n\n\tfindTaskInList(listName, taskName) {\n\t\tconst list = this.findList(listName);\n\t\treturn this.findList(listName) ? list.tasks.find((task) => task.name === taskName) : false;\n\t}\n}\n\n// TEST\nconst masterList = new ListsManager();\nmasterList.addList('pierwsza lista');\nmasterList.addList('druga lista');\nmasterList.deleteList('pierwsza lista');\nmasterList.addList('trzecia lista');\n\nmasterList.changeListName('trzecia lista', 'nowa nazwa');\n\nmasterList.addTaskToList('TASKS', 'zadanie 1');\nmasterList.addTaskToList('TASKS', 'zadanie 2');\nmasterList.deleteTaskFromList('TASKS', 'zadanie 1');\n\nmasterList.changeTaskName('TASKS', 'zadanie 2', 'nowa nazwa zadania 2');\n\nmasterList.toggleStarInTask('TASKS', 'nowa nazwa zadania 2');\nmasterList.toggleIsDoneInTask('TASKS', 'nowa nazwa zadania 2');\n\nconsole.table(masterList.getLists());\n\n\n//# sourceURL=webpack://minimalist/./src/modules/manage.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// import List from './list'\n// import Task from './task'\n\nconst hamburgerMenuControl = (() => {\n\tconst hamburger = document.querySelector('#hamburger');\n\tconst main = document.querySelector('.main');\n\n\tconst manualToggle = () => {\n\t\tmain.classList.toggle('sidebar-toggle');\n\t\thamburger.classList.toggle('change');\n\t};\n\n\tconst autoToggle = () => {\n\t\tif (window.matchMedia('(min-width: 800px)').matches) {\n\t\t\tmain.classList.remove('sidebar-toggle');\n\t\t\thamburger.classList.add('change');\n\t\t} else {\n\t\t\tmain.classList.add('sidebar-toggle');\n\t\t\thamburger.classList.remove('change');\n\t\t}\n\t};\n\tautoToggle();\n\n\thamburger.addEventListener('click', manualToggle);\n\twindow.addEventListener('resize', autoToggle);\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hamburgerMenuControl);\n\n\n//# sourceURL=webpack://minimalist/./src/modules/ui.js?");

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