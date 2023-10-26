'use client';
import { useState } from 'react';
import { FETCH_STATUS } from 'src/libs/fetchStatus';

export default function FeedbackPage() {
	const [form, setForm] = useState({
		type: '',
		feedback: '',
		name: '',
	});
	const [status, setStatus] = useState(FETCH_STATUS.IDLE);
	const [error, setError] = useState<string | null>(null);

	function handleChange(
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	async function submitFeedback(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus(FETCH_STATUS.LOADING);

		try {
			const res = await fetch('/api/feedback', {
				method: 'POST',
				body: JSON.stringify(form),
			});

			if (!res.ok) {
				const { message } = await res.json();

				throw new Error('Something went wrong, please try again later.');
			}

			const data = await res.json();

			setStatus(FETCH_STATUS.SUCCESS);
			setForm({ name: '', type: '', feedback: '' });
		} catch (error: any) {
			setError(error.message);
			setStatus(FETCH_STATUS.ERROR);
			return;
		}
	}

	const isLoading = status === FETCH_STATUS.LOADING;
	const isSuccess = status === FETCH_STATUS.SUCCESS;
	const isError = status === FETCH_STATUS.ERROR;

	return (
		<section className='h-max flex flex-col items-center justify-center'>
			<form
				onSubmit={submitFeedback}
				className='flex flex-col space-y-4 bg-zinc-800 px-4 py-6 rounded-md'
			>
				<div className=''>
					<h1 className='text-2xl font-bold text-zinc-100'>Feedback</h1>
					<p className='text-zinc-400 font'>
						I would love to hear your thoughts or feedback on how the site can
						be improved.
					</p>
				</div>
				<label htmlFor='type'>Feedback Type</label>
				<select
					id='type'
					name='type'
					className='p-2 rounded-md text-zinc-400'
					value={form.type}
					onChange={handleChange}
				>
					<option value=''>Select an option</option>
					<option value='comment'>Comment</option>
					<option value='question'>Question</option>
					<option value='feature-request'>Feature Request</option>
				</select>
				<label htmlFor='feedback'>Feedback</label>
				<textarea
					id='feedback'
					name='feedback'
					rows={4}
					className='p-2 rounded-md text-zinc-400'
					value={form.feedback}
					onChange={handleChange}
				/>
				<label id='name'>Your name</label>
				<input
					type='text'
					id='name'
					name='name'
					className='p-2 rounded-md text-zinc-400'
					value={form.name}
					onChange={handleChange}
				/>
				<div className='flex w-full justify-around p-4'>
					<button
						type='submit'
						className='py-2 px-6 border border-zinc-100 rounded-md'
					>
						{isLoading ? (
							<div
								className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
								role='status'
							/>
						) : null}{' '}
						Submit
					</button>
					<button
						type='reset'
						className='py-2 px-6 border border-zinc-100 rounded-md'
						onClick={() => setForm({ name: '', type: '', feedback: '' })}
					>
						Reset form
					</button>
				</div>
				{isSuccess ? (
					<p className='text-green-400 text-center'>
						Message sent successfully!
					</p>
				) : null}
				{isError ? <p className='text-red-400 text-center'>{error}</p> : null}
			</form>
		</section>
	);
}
