import { NextResponse } from 'next/server';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: Request) {
	const { name, email, message } = await request.json();
	console.log(name, email, message);

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
		await sgMail.send(msg);
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
