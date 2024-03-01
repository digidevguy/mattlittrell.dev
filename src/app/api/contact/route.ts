import { NextResponse } from 'next/server';
import { sendEmail } from 'src/libs/sendgrid';

export async function POST(request: Request) {
	const { name, email, message } = await request.json();

	const subject = `New message from ${name}`;
	const text = `${message}\n\nFrom: ${name} - ${email}`;

	try {
		await sendEmail(subject, text);
		return NextResponse.json({ message: 'Email sent successfully' });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Internal Server Error' });
	}
}
