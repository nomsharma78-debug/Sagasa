import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request, { params }) {
  try {
    const { filename } = await params;
    // Prevent directory traversal
    if (!filename || filename.includes('/') || filename.includes('\\') || filename.includes('..')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const path = join(process.cwd(), 'public', 'uploads', 'avatars', filename);
    const buffer = await readFile(path);
    
    const ext = filename.split('.').pop().toLowerCase();
    const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
    
    return new NextResponse(buffer, {
      headers: { 
        'Content-Type': mime,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (err) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
