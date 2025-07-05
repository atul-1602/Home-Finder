import { NextRequest, NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '../../../../lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User ID is required' 
        },
        { status: 400 }
      );
    }

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error in GET /api/users/[id]:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch user' 
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User ID is required' 
        },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid email format' 
          },
          { status: 400 }
        );
      }
    }

    // Only allow updating specific fields
    const allowedFields = ['email', 'first_name', 'last_name'];
    const updateData: any = {};
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No valid fields to update' 
        },
        { status: 400 }
      );
    }

    const updatedUser = await updateUser(id, updateData);

    if (!updatedUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User not found or failed to update' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Error in PUT /api/users/[id]:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update user' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User ID is required' 
        },
        { status: 400 }
      );
    }

    const success = await deleteUser(id);

    if (!success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User not found or failed to delete' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error in DELETE /api/users/[id]:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete user' 
      },
      { status: 500 }
    );
  }
} 