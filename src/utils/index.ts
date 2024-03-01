const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
import { NextResponse } from 'next/server';

export async function sendMail(msg) {
	try {
		const res = await sgMail.send(msg);
		console.log(res);

		if (res[0].statusCode !== 202) {
			throw new Error('Failed to send email');
		}

		return {
			message: 'Message sent successfully',
			status: 200,
		};
	} catch (error) {
		return {
			message: 'Message failed to send',
			status: 500,
		};
	}
}
