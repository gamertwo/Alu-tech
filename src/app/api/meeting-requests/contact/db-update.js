// app/api/contact/db-update.js - Put this code in a one-time script or add to your API route

import pool, { initDatabase } from '@/app/lib/db';

export async function updateContactMessagesTable() {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Check if columns exist first to avoid errors if they already exist
      const [columns] = await connection.query(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'contact_messages'
      `);
      
      const columnNames = columns.map(col => col.COLUMN_NAME);
      
      // Add phone column if it doesn't exist
      if (!columnNames.includes('phone')) {
        await connection.query(`
          ALTER TABLE contact_messages 
          ADD COLUMN phone VARCHAR(50) DEFAULT NULL AFTER email
        `);
        console.log('Added phone column to contact_messages table');
      }
      
      // Add company column if it doesn't exist
      if (!columnNames.includes('company')) {
        await connection.query(`
          ALTER TABLE contact_messages 
          ADD COLUMN company VARCHAR(255) DEFAULT NULL AFTER phone
        `);
        console.log('Added company column to contact_messages table');
      }
      
      return { success: true, message: 'Database table updated successfully' };
    } catch (error) {
      console.error('Error updating table structure:', error);
      return { success: false, error: error.message };
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    return { success: false, error: error.message };
  }
}