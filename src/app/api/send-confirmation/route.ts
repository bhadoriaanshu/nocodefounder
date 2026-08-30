import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Sends a "we'll be in touch" confirmation email to whoever just submitted
// the booking form. This is best-effort: if RESEND_API_KEY isn't configured
// yet, or the send fails for any reason, we log it and return a 200-ish
// response rather than blocking the booking flow (the Netlify Forms
// submission is the source of truth for the lead either way).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name : "";
    const email = typeof body?.email === "string" ? body.email : "";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set; skipping confirmation email.");
      return NextResponse.json({ skipped: true });
    }

    const resend = new Resend(apiKey);
    const firstName = name.trim().split(/\s+/)[0] || "there";

    const { error } = await resend.emails.send({
      from: "No Code Founder <nocodefoundersite@gmail.com>",
      to: email,
      subject: "We've received your request — No Code Founder",
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #2b2420;">
          <h2 style="color:#1a2238; margin-bottom: 16px;">Thanks for reaching out, ${firstName}!</h2>
          <p style="line-height: 1.6;">We've received your booking request and our team will review it and get back to you within 24 hours.</p>
          <p style="line-height: 1.6;">In the meantime, feel free to check out our <a href="https://nocodefounder.site/blog" style="color:#c0396b;">blog</a> or <a href="https://nocodefounder.site/faq" style="color:#c0396b;">FAQ</a> for more on how we work.</p>
          <p style="margin-top: 32px; color: #6b5f52;">— The No Code Founder Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend failed to send confirmation email:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("send-confirmation route error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
