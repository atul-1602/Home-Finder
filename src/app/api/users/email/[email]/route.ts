import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '../../../../../lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const { email } = params;

    if (!email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email is required' 
        },
        { status: 400 }
      );
    }

    // Decode the email from URL
    const decodedEmail = decodeURIComponent(email);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(decodedEmail)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(decodedEmail);

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
    console.error('Error in GET /api/users/email/[email]:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch user' 
      },
      { status: 500 }
    );
  }
} 