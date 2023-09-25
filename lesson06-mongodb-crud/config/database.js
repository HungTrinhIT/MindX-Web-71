import { MongoClient } from 'mongodb';

console.log("process.env.MONGO_URI", process.env.MONGO_URI)
const DATABASE = 'social-apps-web-71';

const db = {};

const connectToDatabase = async () => {
  try {
    console.log("AAAA", process.env.MONGO_URI)
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();

    console.log('Database connected successfully');
    const database = mongoClient.db(DATABASE);

    // Collections
    db.posts = database.collection('posts');
    db.todos = database.collection('todos');
  } catch (error) {
    console.error('Connect to DB failed:', error);
    process.exit(1);
  }
};

export { connectToDatabase, db };
