// import mongoose from 'mongoose'
import mongoose from 'mongoose';
import { env } from '../env';

class Database {
	host = env.db.host as string;
	dbName = env.db.name as string;

	public async connect(): Promise<void> {
		const options: mongoose.ConnectOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			poolSize: 10, // Maintain up to 10 socket connections
			serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
			socketTimeoutMS: 10000, // Close sockets after 45 seconds of inactivity
			family: 4, // Use IPv4, skip trying IPv6
		};

		await mongoose.connect(
			`${env.db.host}/${env.db.name}`,
			options,
		);
	}
}
export default Database;
