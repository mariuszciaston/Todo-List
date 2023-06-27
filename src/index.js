import hamburgerMenuControl from './modules/ui';

import pierwsza from './modules/manage';

console.log(pierwsza);

pierwsza.setName('nowa nazwa pierwszej listy');
console.log(pierwsza);

console.log(pierwsza.getName());

pierwsza.addTask('zadanie 1');
console.log(pierwsza);

console.log(pierwsza.getTasks());

pierwsza.deleteTask('zadanie 1');
console.log(pierwsza);
