import { NextResponse } from 'next/server';
import { z } from 'zod';

const phoneSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, 'Invalid phone number format')
});

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Strict input validation
    const parsed = phoneSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { phone } = parsed.data;

    // Here you would integrate with an SMS gateway (e.g., Twilio, AWS SNS)
    // For this implementation, we are using a hardcoded OTP as requested.
    
    // Rate limiting should be implemented here (e.g., using Redis) to prevent abuse.
    
    return NextResponse.json({ 
      message: 'OTP sent successfully (Development mode: use the hardcoded OTP)' 
    }, { status: 200 });

  } catch (error) {
    console.error('Error sending OTP:', error);
    // Never expose internal errors
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
