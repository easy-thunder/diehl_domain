require('dotenv').config()




import { Pool } from 'pg';

const connectionString= process.env.CONNECTION_STRING

export async function connectToDatabase() {
  try {
    const db = new Pool({
      connectionString,
    });

    return db;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
}