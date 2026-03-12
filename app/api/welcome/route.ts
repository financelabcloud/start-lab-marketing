import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. Send the Welcome Email
    const emailData = await resend.emails.send({
      from: 'Start Lab <founder@startlab.cloud>', // Make sure this is your verified domain!
      to: [email],
      subject: 'Welcome to Start Lab 🧪',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
          <h2 style="color: #000000; margin-bottom: 24px;">You're on the list.</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #3f3f46;">
            Thank you for joining the Start Lab waitlist. We are building the ultimate AI Co-Founder to help entrepreneurs validate their ideas instantly without the 100 awkward cold calls.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #3f3f46;">
            I'll personally email you as soon as new features are unlocked. In the meantime, if you have an idea you're dying to test, you can run a free sprint right now.
          </p>
          <div style="margin: 32px 0;">
            <a href="https://app.startlab.cloud/login" style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Run a Free Sprint</a>
          </div>
          <p style="font-size: 14px; color: #71717a; margin-top: 48px; border-top: 1px solid #e4e4e7; padding-top: 24px;">
            Keep building,<br>
            The Start Lab Team
          </p>
        </div>
      `,
    });

    // 2. Add the user to your Global Contacts list automatically
    await resend.contacts.create({
      email: email,
    });

    return NextResponse.json({ status: 'success', emailData });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ status: 'error', error }, { status: 500 });
  }
}