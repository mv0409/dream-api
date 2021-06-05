import App from './app';
import { controllers } from './controllers';
import Database from './db';
import Routes from './routes';

const database = new Database();
const routes = new Routes(controllers);
const app = new App(routes, database);

app.listen();
