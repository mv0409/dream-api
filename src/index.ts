import App from './app'
import DreamController from './controllers/dream';
import Routes from './routes';

const dreamController = new DreamController()
const routes = new Routes(dreamController)
const app = new App(routes);

app.listen();