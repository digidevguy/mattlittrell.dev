import sgMail from '@sendgrid/mail';

export const sendEmail = async (subject: string, text: string) => {
	if (!process.env.SENDGRID_API_KEY) return;
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	if (!subject || !text) {
		console.error('Subject and text are required');
		return;
	}

	const msg = {
		to: process.env.RECEIEVER_EMAIL!,
		from: process.env.SENDER_EMAIL!,
		subject,
		text,
	};

	try {
		await sgMail.send(msg);
		console.log(`Email sent to ${process.env.RECEIEVER_EMAIL}`);
	} catch (error) {
		console.error(error);
	}
};
