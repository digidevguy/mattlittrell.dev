import { sendMail } from 'src/utils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const { type, feedback, name } = await request.json();

	const msg = {
		to: process.env.RECEIEVER_EMAIL,
		from: process.env.SENDER_EMAIL,
		subject: `New ${type} from ${name}`,
		html: `
                <p>${feedback}</p>
                <br>
                <br>
                <p>From: ${name}</p>
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
