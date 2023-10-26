import { NextResponse } from 'next/server';
import { sendMail } from 'src/utils';

export async function POST(request: Request) {
	const { name, email, message } = await request.json();

	const msg = {
		to: process.env.RECEIEVER_EMAIL,
		from: process.env.SENDER_EMAIL,
		subject: `New message from ${name}`,
		text: message,
		html: `
                <strong>${message}</strong>
                <br>
                <br>
                <p>From: ${name} - ${email}</p>
            `,
	};

	try {
		await sendMail(msg);
		return NextResponse.json({
			message: 'Message sent successfully',
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({
			message: 'Message failed to send',
			status: 500,
		});
	}
}
