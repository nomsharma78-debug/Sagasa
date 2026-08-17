import { NextResponse } from 'next/server';
import { getZoneFromPincode } from '@/lib/zoneMapping';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pincode = searchParams.get('pincode');

  if (!pincode || !/^\d{6}$/.test(pincode)) {
    return NextResponse.json({ error: 'Invalid pincode' }, { status: 400 });
  }

  try {
    const data = await getZoneFromPincode(pincode);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Pincode not found or invalid' }, { status: 404 });
  }
}
