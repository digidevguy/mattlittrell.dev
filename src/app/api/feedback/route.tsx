import { sendEmail } from 'src/libs/sendgrid';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const { type, feedback, name } = await request.json();

	const subject = `New ${type} from ${name}`;
	const text = `${feedback}\n\nFrom: ${name}`;

	try {
		await sendEmail(subject, text);
		return NextResponse.json({ message: 'Email sent successfully' });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Internal Server Error' });
	}
}
