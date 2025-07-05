import { NextRequest, NextResponse } from 'next/server';
import { getUsers, createUser } from '../../../lib/api';
import { UserFilters } from '../../../lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const email = searchParams.get('email') || undefined;
    const first_name = searchParams.get('first_name') || undefined;
    const last_name = searchParams.get('last_name') || undefined;
    const sortBy = searchParams.get('sortBy') as 'created_at' | 'first_name' | 'last_name' | 'email' | undefined;
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | undefined;

    // Build filters object
    const filters: UserFilters = {};
    if (email) filters.email = email;
    if (first_name) filters.first_name = first_name;
    if (last_name) filters.last_name = last_name;
    if (sortBy) filters.sortBy = sortBy;
    if (sortOrder) filters.sortOrder = sortOrder;

    const result = await getUsers(filters, limit, offset);

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error in GET /api/users:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch users' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { clerk_id, email, first_name, last_name } = body;
    
    if (!clerk_id || !email || !first_name || !last_name) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: clerk_id, email, first_name, last_name' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    const userData = {
      clerk_id,
      email,
      first_name,
      last_name
    };

    const newUser = await createUser(userData);

    if (!newUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to create user' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: newUser
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/users:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create user' 
      },
      { status: 500 }
    );
  }
} 