import { NextRequest, NextResponse } from 'next/server';
import { getUserByClerkId } from '../../../../../lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { clerkId: string } }
) {
  try {
    const { clerkId } = params;

    if (!clerkId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Clerk ID is required' 
        },
        { status: 400 }
      );
    }

    const user = await getUserByClerkId(clerkId);

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
    console.error('Error in GET /api/users/clerk/[clerkId]:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch user' 
      },
      { status: 500 }
    );
  }
} 