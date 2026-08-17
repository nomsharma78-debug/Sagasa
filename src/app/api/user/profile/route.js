import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { getZoneFromPincode } from '@/lib/zoneMapping';

// Input validation strictly excludes 'role' and 'zone'
const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).optional(),
  gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say']).optional(),
  address: z.object({
    street: z.string().max(255).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    pincode: z.string().regex(/^[0-9]{6}$/, 'Invalid 6-digit pincode').optional(),
    phone: z.string().regex(/^[0-9]{10}$/, 'Invalid 10-digit phone').optional(),
  }).optional(),
  preferences: z.object({
    language: z.string().max(50).optional(),
    currency: z.string().max(20).optional(),
    primaryCategory: z.enum(["Women's", "Men's", "Show Both", ""]).optional(),
    preferredSize: z.string().max(10).optional(),
  }).optional(),
  avatarUrl: z.string().max(1000).nullable().optional(),
  email: z.union([
    z.string().email('Invalid email format').regex(/@gmail\.com$/, 'Only Gmail addresses are allowed'),
    z.literal(''),
    z.null()
  ]).optional()
}).strict(); // Prevents extra fields like 'role' or 'zone'

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  if (!token) return null;
  
  const payload = await verifyToken(token);
  if (!payload || !payload.userId) return null;

  await connectToDatabase();
  return User.findById(payload.userId);
}

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Never return passwords/sensitive internal fields if they existed, though our schema doesn't have them
    return NextResponse.json({
      id: user._id,
      phone: user.phone,
      name: user.name,
      email: user.email,
      gender: user.gender,
      role: user.role,
      avatarUrl: user.avatarUrl,
      address: user.address,
      preferences: user.preferences
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Strict input validation
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    const updates = parsed.data;

    // Apply basic updates
    if (updates.name !== undefined) user.name = updates.name;
    if (updates.email !== undefined) user.email = updates.email;
    if (updates.gender !== undefined) user.gender = updates.gender;
    if (updates.avatarUrl !== undefined) user.avatarUrl = updates.avatarUrl;
    
    // Process preferences updates
    if (updates.preferences) {
      if (!user.preferences) user.preferences = {};
      if (updates.preferences.language !== undefined) user.preferences.language = updates.preferences.language;
      if (updates.preferences.currency !== undefined) user.preferences.currency = updates.preferences.currency;
      if (updates.preferences.primaryCategory !== undefined) user.preferences.primaryCategory = updates.preferences.primaryCategory;
      if (updates.preferences.preferredSize !== undefined) user.preferences.preferredSize = updates.preferences.preferredSize;
    }
    
    // Process address updates securely
    if (updates.address) {
      if (!user.address) user.address = {};
      
      if (updates.address.street !== undefined) user.address.street = updates.address.street;
      if (updates.address.city !== undefined) user.address.city = updates.address.city;
      if (updates.address.state !== undefined) user.address.state = updates.address.state;
      
      if (updates.address.phone !== undefined) user.address.phone = updates.address.phone;
      
      // If pincode changed, calculate the zone automatically using the secure backend logic
      if (updates.address.pincode && updates.address.pincode !== user.address.pincode) {
        user.address.pincode = updates.address.pincode;
        
        try {
          const locationData = await getZoneFromPincode(updates.address.pincode);
          user.address.zone = locationData.zone;
          // Do not overwrite user.address.city or state to respect user input
        } catch (zoneError) {
          return NextResponse.json({ 
            error: 'Could not resolve pincode location details. Please ensure the pincode is valid.' 
          }, { status: 400 });
        }
      }
    }

    await user.save();

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        avatarUrl: user.avatarUrl,
        address: user.address,
        preferences: user.preferences
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Optional: Log or process the deletion reason if sent in the body
    try {
      const body = await request.json();
      if (body.reason) {
        console.log(`User ${user._id} deleted account. Reason: ${body.reason}`);
      }
    } catch (e) {
      // Body is optional
    }

    // Delete user from database
    await User.findByIdAndDelete(user._id);

    // Clear the auth cookie
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');

    return NextResponse.json({ message: 'Account deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
