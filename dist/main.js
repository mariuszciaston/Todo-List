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

eval("const displayController = (() => {\n\tconst addTaskBtn = document.querySelector('#add-task-btn');\n\tconst loadExample = document.querySelector('#load-example-btn');\n\tlet taskCount = 0;\n\n\tconst addTask = (inputTask) => {\n\t\tif (inputTask) {\n\t\t\tconst tasksList = document.querySelector('.tasks-list');\n\t\t\tconst li = document.createElement('li');\n\t\t\tconst circle = document.createElement('div');\n\t\t\tconst checkMark = document.createElement('div');\n\t\t\tconst taskContent = document.createElement('p');\n\t\t\tconst date = document.createElement('p');\n\t\t\tconst star = document.createElement('div');\n\t\t\tconst remove = document.createElement('div');\n\n\t\t\tcircle.className = 'circle';\n\t\t\tcheckMark.className = 'checkMark';\n\t\t\ttaskContent.className = 'task-content';\n\t\t\tdate.className = 'date';\n\t\t\tstar.className = 'star';\n\t\t\tremove.className = 'remove';\n\n\t\t\ttaskContent.textContent = inputTask;\n\t\t\tdate.textContent = 'no date';\n\n\t\t\tli.append(circle);\n\t\t\tcircle.append(checkMark);\n\t\t\tli.append(taskContent);\n\t\t\tli.append(date);\n\t\t\tli.append(star);\n\t\t\tli.append(remove);\n\t\t\ttasksList.prepend(li);\n\t\t}\n\t};\n\n\taddTaskBtn.addEventListener('click', () => {\n\t\tconst inputTask = prompt('Please enter task content', '');\n\t\taddTask(inputTask);\n\t});\n\n\tloadExample.addEventListener('click', () => {\n\t\ttaskCount += 1;\n\t\taddTask(`Example task ${taskCount}`);\n\t});\n\n\t// Hamburger menu\n\tconst hamburger = document.querySelector('#hamburger');\n\tconst main = document.querySelector('.main');\n\n\thamburger.addEventListener('click', () => {\n\t\tmain.classList.toggle('sidebar-toggle');\n\t\thamburger.classList.toggle('change');\n\t});\n\n\tfunction showSidebar() {\n\t\tif (window.matchMedia('(min-width: 800px)').matches) {\n\t\t\tmain.classList.remove('sidebar-toggle');\n\t\t\thamburger.classList.add('change');\n\t\t} else {\n\t\t\tmain.classList.add('sidebar-toggle');\n\t\t\thamburger.classList.remove('change');\n\t\t}\n\t}\n\n\twindow.addEventListener('resize', () => {\n\t\tshowSidebar();\n\t});\n\n\tshowSidebar();\n\n\treturn { addTask };\n})();\n\ndisplayController.addTask('Finish The Odin Project ');\ndisplayController.addTask('Conquer the Crown of Polish Mountains');\ndisplayController.addTask('Get hired as a Front End Developer');\ndisplayController.addTask('Go swimming on Tuesday');\ndisplayController.addTask('Bake Neapolitan pizza');\n\n\n\nconst logicController = (() => {\n\tconst circles = document.querySelectorAll('.tasks-list li .circle');\n\tcircles.forEach((circle) => {\n\t\tcircle.addEventListener('click', () => {\n\t\t\tcircle.parentElement.classList.toggle('done');\n\t\t});\n\t});\n\n\tconst stars = document.querySelectorAll('.tasks-list li .star');\n\tstars.forEach((star) => {\n\t\tstar.addEventListener('click', () => {\n\t\t\tstar.classList.toggle('yellow');\n\t\t});\n\t});\n\n\tconst removes = document.querySelectorAll('.tasks-list li .remove');\n\tremoves.forEach((remove) => {\n\t\tremove.addEventListener('click', () => {\n\t\t\tremove.parentElement.remove();\n\t\t});\n\t});\n})();\n\n\n//# sourceURL=webpack://minimalist/./src/index.js?");

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