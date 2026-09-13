const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const host = process.env.MONGO_HOST || 'mongodb';
    const port = process.env.MONGO_PORT || '27017';
    const database = process.env.MONGO_DATABASE || 'streamingapp';

    if (!username || !password) {
      throw new Error('MongoDB credentials are not configured');
    }

    const URL =
      `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}` +
      `@${host}:${port}/${database}?authSource=admin`;

    console.log(
      `Connecting to MongoDB at: mongodb://${host}:${port}/${database}`
    );

    await mongoose.connect(URL);

    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
};

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('DB ERROR:', error);
});

db.once('open', () => {
  console.log('DB connection established');
});

module.exports = {
  connectDB,
  db,
  mongoose
};
