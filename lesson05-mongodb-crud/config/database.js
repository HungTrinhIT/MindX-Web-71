import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'social-app-web71';

const db = {};

const connectToDatabase = async () => {
  try {
    const mongoClient = new MongoClient(MONGO_URI);
    await mongoClient.connect();

    console.log('Connected to MongoDB successfully');
    const database = mongoClient.db(DB_NAME);

    db.posts = database.collection('posts');
    db.users = database.collection('users');

    return 'done';
  } catch (error) {
    console.error('DB Connection failed:', error);
    process.exit(1);
  }
};

export { connectToDatabase, db };
