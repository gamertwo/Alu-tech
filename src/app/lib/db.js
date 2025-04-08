import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'whitegoldaluminum',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to initialize database and create tables if they don't exist
export async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Create contact_messages table if it doesn't exist
      await connection.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) DEFAULT NULL,
          company VARCHAR(255) DEFAULT NULL,
          inquiryType VARCHAR(50) NOT NULL,
          message TEXT NOT NULL,
          status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      
      // Create meeting_requests table if it doesn't exist
      await connection.query(`
        CREATE TABLE IF NOT EXISTS meeting_requests (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          company VARCHAR(255) DEFAULT NULL,
          productId VARCHAR(50) NOT NULL,
          productName VARCHAR(255) NOT NULL,
          preferredDate VARCHAR(50) NOT NULL,
          preferredTime VARCHAR(50) NOT NULL,
          message TEXT DEFAULT NULL,
          status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      
      console.log('Database tables initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing database tables:', error);
      return false;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    return false;
  }
}

export default pool;