import { NextRequest, NextResponse } from 'next/server';
import { addToFavorites, removeFromFavorites, getFavoriteProperties } from '../../../../lib/api';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication required' 
        },
        { status: 401 }
      );
    }

    const favoriteProperties = await getFavoriteProperties(user.id);

    return NextResponse.json({
      success: true,
      data: favoriteProperties
    });
  } catch (error) {
    console.error('Error in GET /api/users/favorites:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch favorite properties' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication required' 
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { propertyId } = body;

    if (!propertyId || typeof propertyId !== 'number') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Property ID is required and must be a number' 
        },
        { status: 400 }
      );
    }

    const success = await addToFavorites(user.id, propertyId);

    if (!success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to add property to favorites' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Property added to favorites successfully'
    });
  } catch (error) {
    console.error('Error in POST /api/users/favorites:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to add property to favorites' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication required' 
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');

    if (!propertyId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Property ID is required' 
        },
        { status: 400 }
      );
    }

    const propertyIdNum = parseInt(propertyId);
    if (isNaN(propertyIdNum)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Property ID must be a valid number' 
        },
        { status: 400 }
      );
    }

    const success = await removeFromFavorites(user.id, propertyIdNum);

    if (!success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to remove property from favorites' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Property removed from favorites successfully'
    });
  } catch (error) {
    console.error('Error in DELETE /api/users/favorites:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to remove property from favorites' 
      },
      { status: 500 }
    );
  }
} 