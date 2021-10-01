import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './App';
import config from './config.default';

createConnection(config.typeorm)
	.then(() => {
		new App()._app.listen(config.port, () => {
			console.log('🚀 Dream server started: ', config.publicDomain);
		});
	})
	.catch((error) => {
		console.log(error.message);
		process.exit();
	});
