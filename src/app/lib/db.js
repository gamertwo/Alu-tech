// lib/db.js
import mysql from 'mysql2/promise';

// MySQL connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to initialize the database (create tables if they don't exist)
export async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create meeting_requests table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS meeting_requests (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company VARCHAR(255),
        preferredDate VARCHAR(50) NOT NULL,
        preferredTime VARCHAR(50) NOT NULL,
        productId VARCHAR(50) NOT NULL,
        productName VARCHAR(255) NOT NULL,
        message TEXT,
        status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    connection.release();
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}

// Function to get a database connection
export async function getConnection() {
  return await pool.getConnection();
}

// Export the pool for use in other modules
export default pool;