// app/api/meeting-requests/route.js
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

// GET handler - Retrieve all meeting requests
export async function GET() {
  try {
    await ensureDatabaseIsInitialized();
    
    const [rows] = await pool.query('SELECT * FROM meeting_requests ORDER BY createdAt DESC');
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching meeting requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meeting requests' },
      { status: 500 }
    );
  }
}

// POST handler - Create a new meeting request
export async function POST(request) {
  try {
    await ensureDatabaseIsInitialized();
    
    const requestData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'preferredDate', 'preferredTime', 'productId', 'productName'];
    for (const field of requiredFields) {
      if (!requestData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Generate a unique ID for the meeting request
    const newRequestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    // Add timestamps and ID
    const newRequest = {
      id: newRequestId,
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    // Insert into database
    await pool.query(
      `INSERT INTO meeting_requests 
      (id, name, email, phone, company, preferredDate, preferredTime, productId, productName, message, status, createdAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newRequest.id,
        newRequest.name,
        newRequest.email,
        newRequest.phone,
        newRequest.company || null,
        newRequest.preferredDate,
        newRequest.preferredTime,
        newRequest.productId,
        newRequest.productName,
        newRequest.message || null,
        newRequest.status,
        newRequest.createdAt
      ]
    );
    
    return NextResponse.json(
      { success: true, request: newRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating meeting request:', error);
    return NextResponse.json(
      { error: 'Failed to create meeting request' },
      { status: 500 }
    );
  }
}

// PUT handler - Update an existing meeting request
export async function PUT(request) {
  try {
    await ensureDatabaseIsInitialized();
    
    const requestData = await request.json();
    
    if (!requestData.id) {
      return NextResponse.json(
        { error: 'Meeting request ID is required' },
        { status: 400 }
      );
    }
    
    // Check if meeting request exists
    const [existingRows] = await pool.query(
      'SELECT * FROM meeting_requests WHERE id = ?',
      [requestData.id]
    );
    
    if (existingRows.length === 0) {
      return NextResponse.json(
        { error: 'Meeting request not found' },
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
      `UPDATE meeting_requests SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    // Get the updated record
    const [updatedRows] = await pool.query(
      'SELECT * FROM meeting_requests WHERE id = ?',
      [requestData.id]
    );
    
    return NextResponse.json({
      success: true,
      request: updatedRows[0]
    });
  } catch (error) {
    console.error('Error updating meeting request:', error);
    return NextResponse.json(
      { error: 'Failed to update meeting request' },
      { status: 500 }
    );
  }
}

// DELETE handler - Remove a meeting request
export async function DELETE(request) {
  try {
    await ensureDatabaseIsInitialized();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Meeting request ID is required' },
        { status: 400 }
      );
    }
    
    // Check if meeting request exists
    const [existingRows] = await pool.query(
      'SELECT * FROM meeting_requests WHERE id = ?',
      [id]
    );
    
    if (existingRows.length === 0) {
      return NextResponse.json(
        { error: 'Meeting request not found' },
        { status: 404 }
      );
    }
    
    // Delete the meeting request
    await pool.query('DELETE FROM meeting_requests WHERE id = ?', [id]);
    
    return NextResponse.json({
      success: true,
      message: 'Meeting request deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting meeting request:', error);
    return NextResponse.json(
      { error: 'Failed to delete meeting request' },
      { status: 500 }
    );
  }
}