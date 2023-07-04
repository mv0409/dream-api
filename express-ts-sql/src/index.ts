import 'reflect-metadata';
import express from 'express';
import { PORT } from './config/env';
import { loadRoutes } from './routes/main-route';
import { dbClient } from './db/data-source';

const app = express();

const db = dbClient();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

loadRoutes(app);

const server = app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`✔️  App started on port:${PORT}`);
});

console.log(__dirname)
export { server, db };
