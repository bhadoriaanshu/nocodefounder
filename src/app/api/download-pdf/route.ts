import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const cookieStore = cookies();
  const paymentVerified = cookieStore.get('payment_verified');

  if (!paymentVerified || paymentVerified.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const filePath = path.join(process.cwd(), 'private', '30-Micro-SaaS-You-Can-Build-Without-Coding.pdf');
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="30-Micro-SaaS-You-Can-Build-Without-Coding.pdf"',
      },
    });
  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
