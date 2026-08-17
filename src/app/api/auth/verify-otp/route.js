import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

const verifySchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, 'Invalid phone number format'),
  otp: z.string().min(1, 'OTP is required')
});

const ADMIN_PHONE = process.env.ADMIN_PHONE;

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Strict input validation
    const parsed = verifySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { phone, otp } = parsed.data;

    // Verify OTP securely from environment variable
    const hardcodedOtp = process.env.HARDCODED_OTP;
    if (!hardcodedOtp || otp !== hardcodedOtp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    // Find or create user
    let user = await User.findOne({ phone });
    
    if (!user) {
      // Create new user
      // Enforce admin role strictly based on the specific phone number
      const role = (phone === ADMIN_PHONE) ? 'admin' : 'user';
      
      user = await User.create({ phone, role });
    } else {
      // If the admin phone number logs in but their role was somehow changed, restore it
      if (phone === ADMIN_PHONE && user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }
    }

    // Issue JWT
    const tokenPayload = {
      userId: user._id.toString(),
      role: user.role
    };
    
    const token = await signToken(tokenPayload);

    // Set HttpOnly, Secure cookie
    // Note: next/headers requires awaiting cookies() in Next.js 15+, but in earlier App Router it was sync.
    // We are using Next.js 15+ compatible approach for future-proofing
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return NextResponse.json({ 
      message: 'Login successful',
      user: {
        id: user._id,
        phone: user.phone,
        role: user.role,
        name: user.name,
        address: user.address
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
