/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("/* eslint-disable no-alert */\n/* eslint-disable no-use-before-define */\n\n// LOGIC --------------------------------------------------------------\n\nconst tasksArray = [];\n\nfunction createTask(todo) {\n\tif (todo) {\n\t\ttasksArray.push({ isDone: false, todo, date: 'no date', star: false });\n\t\tdisplayTask();\n\t}\n}\n\n// UI -----------------------------------------------------------------\n\n(function hamburgerMenuControl() {\n\tconst hamburger = document.querySelector('#hamburger');\n\tconst main = document.querySelector('.main');\n\n\tconst manualToggle = () => {\n\t\tmain.classList.toggle('sidebar-toggle');\n\t\thamburger.classList.toggle('change');\n\t};\n\n\tconst autoToggle = () => {\n\t\tif (window.matchMedia('(min-width: 800px)').matches) {\n\t\t\tmain.classList.remove('sidebar-toggle');\n\t\t\thamburger.classList.add('change');\n\t\t} else {\n\t\t\tmain.classList.add('sidebar-toggle');\n\t\t\thamburger.classList.remove('change');\n\t\t}\n\t};\n\tautoToggle();\n\n\thamburger.addEventListener('click', manualToggle);\n\twindow.addEventListener('resize', autoToggle);\n})();\n\nfunction displayTask() {\n\tconst tasksList = document.querySelector('.tasks-list');\n\tconst li = document.createElement('li');\n\tconst circle = document.createElement('div');\n\tconst checkMark = document.createElement('div');\n\tconst taskContent = document.createElement('p');\n\tconst date = document.createElement('p');\n\tconst star = document.createElement('div');\n\tconst remove = document.createElement('div');\n\n\tcircle.className = 'circle';\n\tcheckMark.className = 'checkMark';\n\ttaskContent.className = 'task-content';\n\tdate.className = 'date';\n\tstar.className = 'star';\n\tremove.className = 'remove';\n\n\ttaskContent.textContent = tasksArray[tasksArray.length - 1].todo;\n\tdate.textContent = tasksArray[tasksArray.length - 1].date;\n\n\tli.append(circle);\n\tcircle.append(checkMark);\n\tli.append(taskContent);\n\tli.append(date);\n\tli.append(star);\n\tli.append(remove);\n\ttasksList.prepend(li);\n}\n\nconst addTaskBtn = document.querySelector('#add-task-btn');\nconst loadExampleBtn = document.querySelector('#load-example-btn');\nlet taskCount = 0;\n\naddTaskBtn.addEventListener('click', () => {\n\tcreateTask(prompt('Please enter task content', ''));\n});\n\nloadExampleBtn.addEventListener('click', () => {\n\ttaskCount += 1;\n\tcreateTask(`Example task ${taskCount}`);\n});\n\ncreateTask('Finish The Odin Project ');\ncreateTask('Conquer the Crown of Polish Mountains');\ncreateTask('Get hired as a Front End Developer');\ncreateTask('Go swimming on Tuesday');\ncreateTask('Bake Neapolitan pizza');\n\n\n//# sourceURL=webpack://minimalist/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;