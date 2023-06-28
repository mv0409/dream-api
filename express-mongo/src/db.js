const mongoose = require('mongoose');

const dbClient = async (config) => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    /* eslint-disable-next-line no-console */
    console.log('🚀 Database connected');
    return mongoose;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log('💥 Mongoose connection error:', error);
  }
};
module.exports = { dbClient };
