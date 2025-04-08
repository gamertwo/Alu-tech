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
    
    // Insert into database
    await pool.query(
      `INSERT INTO contact_messages 
      (id, name, email, phone, company, inquiryType, message, status, createdAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        messageId,
        requestData.name,
        requestData.email,
        requestData.phone || null,
        requestData.company || null,
        requestData.inquiryType,
        requestData.message,
        'new',
        new Date().toISOString()
      ]
    );
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact message submitted successfully',
        data: {
          id: messageId,
          ...requestData,
          status: 'new',
          createdAt: new Date().toISOString()
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact message' },
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