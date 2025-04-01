// app/api/contact/route.js
import { NextResponse } from 'next/server';
import pool, { initDatabase } from '@/app/lib/db';

// Add serverless-compatible configuration
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Initialize the database on server startup
let dbInitialized = false;

async function ensureDatabaseIsInitialized() {
  if (!dbInitialized) {
    dbInitialized = await initDatabase();
    
    // Create contact_messages table if it doesn't exist
    if (dbInitialized) {
      const connection = await pool.getConnection();
      try {
        // Create table if it doesn't exist
        await connection.query(`
          CREATE TABLE IF NOT EXISTS contact_messages (
            id VARCHAR(50) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            inquiryType VARCHAR(50) NOT NULL,
            message TEXT NOT NULL,
            status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )
        `);
        
        // Check if columns exist
        const [columns] = await connection.query(`
          SELECT COLUMN_NAME 
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_SCHEMA = DATABASE() 
          AND TABLE_NAME = 'contact_messages'
        `);
        
        const columnNames = columns.map(col => col.COLUMN_NAME.toLowerCase());
        
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
        
      } catch (error) {
        console.error('Error setting up contact_messages table:', error);
      } finally {
        connection.release();
      }
    }
  }
  return dbInitialized;
}

// GET handler - Retrieve contact messages with optional filters
export async function GET(request) {
  try {
    await ensureDatabaseIsInitialized();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');
    
    let query = 'SELECT * FROM contact_messages';
    const queryParams = [];
    
    // Add WHERE clause for status filter
    if (status && status !== 'all') {
      query += ' WHERE status = ?';
      queryParams.push(status);
    }
    
    // Add ORDER BY clause for newest first
    query += ' ORDER BY createdAt DESC';
    
    // Add LIMIT clause
    if (limit) {
      query += ' LIMIT ?';
      queryParams.push(parseInt(limit, 10));
    }
    
    const [rows] = await pool.query(query, queryParams);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
}

// POST handler - Create a new contact message
export async function POST(request) {
  try {
    await ensureDatabaseIsInitialized();
    
    const requestData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'inquiryType', 'message'];
    for (const field of requiredFields) {
      if (!requestData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Generate a unique ID for the contact message
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    // Get columns from the table to ensure we only insert into existing columns
    const connection = await pool.getConnection();
    let columnNames = [];
    try {
      const [columns] = await connection.query(`
        SHOW COLUMNS FROM contact_messages
      `);
      columnNames = columns.map(col => col.Field.toLowerCase());
    } finally {
      connection.release();
    }

    // Prepare message data
    const messageData = {
      id: messageId,
      name: requestData.name,
      email: requestData.email,
      status: 'new',
      inquiryType: requestData.inquiryType,
      message: requestData.message,
      createdAt: new Date().toISOString()
    };
    
    // Add optional fields only if the columns exist in the table
    if (columnNames.includes('phone')) {
      messageData.phone = requestData.phone || null;
    }
    
    if (columnNames.includes('company')) {
      messageData.company = requestData.company || null;
    }
    
    // Build dynamic query based on available columns
    const fields = Object.keys(messageData);
    const placeholders = fields.map(() => '?').join(',');
    const values = Object.values(messageData);
    
    // Insert into database with dynamic fields
    await pool.query(
      `INSERT INTO contact_messages (${fields.join(',')}) VALUES (${placeholders})`,
      values
    );
    
    return NextResponse.json(
      { success: true, message: messageData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact message: ' + error.message },
      { status: 500 }
    );
  }
}

// PUT handler - Update contact message status
export async function PUT(request) {
  try {
    await ensureDatabaseIsInitialized();
    
    const requestData = await request.json();
    
    if (!requestData.id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }
    
    // Check if message exists
    const [existingRows] = await pool.query(
      'SELECT * FROM contact_messages WHERE id = ?',
      [requestData.id]
    );
    
    if (existingRows.length === 0) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    // Update only the provided fields
    const updateFields = [];
    const updateValues = [];
    
    // Extract fields to update (exclude id)
    Object.entries(requestData).forEach(([key, value]) => {
      if (key !== 'id' && value !== undefined) {
        updateFields.push(`${key} = ?`);
        updateValues.push(value);
      }
    });
    
    // Add ID at the end for the WHERE clause
    updateValues.push(requestData.id);
    
    // Execute update
    await pool.query(
      `UPDATE contact_messages SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    // Get the updated record
    const [updatedRows] = await pool.query(
      'SELECT * FROM contact_messages WHERE id = ?',
      [requestData.id]
    );
    
    return NextResponse.json({
      success: true,
      message: updatedRows[0]
    });
  } catch (error) {
    console.error('Error updating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to update contact message' },
      { status: 500 }
    );
  }
}

// DELETE handler - Delete a contact message
export async function DELETE(request) {
  try {
    await ensureDatabaseIsInitialized();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }
    
    // Check if message exists
    const [existingRows] = await pool.query(
      'SELECT * FROM contact_messages WHERE id = ?',
      [id]
    );
    
    if (existingRows.length === 0) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    // Delete the message
    await pool.query('DELETE FROM contact_messages WHERE id = ?', [id]);
    
    return NextResponse.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact message' },
      { status: 500 }
    );
  }
}