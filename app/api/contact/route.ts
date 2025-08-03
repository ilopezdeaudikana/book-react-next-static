import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '')

export async function POST(request: Request): Promise<NextResponse> {
  const data = await request.json()
  const { email, message } = data

  const msg = {
    to: process.env.SENDGRID_SENDER,
    from: process.env.SENDGRID_SENDER ?? 'foo',
    subject: 'Book Contact Form',
    text: `From: ${email}\n\n${message}`,
  }

  try {
    await sgMail.send(msg)
    return NextResponse.json({ message: 'message sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ message: 'error sending message' })
  }
}
