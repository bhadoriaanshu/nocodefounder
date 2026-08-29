import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { cookies } from 'next/headers';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount, coupon } = await req.json();

    // Check for 100% discount coupon
    if (coupon === 'gopu001') {
      cookies().set('payment_verified', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 86400, // 24 hours
      });
      
      return NextResponse.json({
        success: true,
        isFree: true,
        downloadUrl: '/api/download-pdf'
      });
    }

    // Create a Razorpay Order
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise (e.g., 99 * 100 = 9900)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
