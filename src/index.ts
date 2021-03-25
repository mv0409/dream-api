// import App from './app';
// import { controllers } from './controllers';
// import Database from './db';
// import Routes from './routes';

// const database = new Database();
// const routes = new Routes(controllers);
// const app = new App(routes, database);

// app.listen();

// const obj = {
// 	id: 'World',
// 	name: 'Hello',
// };

interface Obj {
	id: string;
	name: string;
}

class BluePrintObj {
	obj!: Obj;
	constructor() {
		this.obj.id = 'hehe';
		this.obj.name = ' hoho';
	}
}
const someClass = new BluePrintObj();

console.log(someClass);
