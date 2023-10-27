'use client';
import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { GoMail, GoPaperAirplane } from 'react-icons/go';
import { FETCH_STATUS } from 'src/libs/fetchStatus';

export default function ContactForm() {
	const [form, setForm] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [status, setStatus] = useState(FETCH_STATUS.IDLE);
	const [error, setError] = useState<string | null>(null);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus(FETCH_STATUS.LOADING);

		if (!form.name || !form.email || !form.message) {
			setStatus(FETCH_STATUS.ERROR);
			setError('Please fill out all fields.');
			return;
		}

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});

			if (!res.ok) {
				const { message } = await res.json();

				throw new Error('Something went wrong, please try again later.');
			}

			const data = await res.json();

			setStatus(FETCH_STATUS.SUCCESS);
			setForm({ name: '', email: '', message: '' });
		} catch (error: any) {
			setError(error.message);
			setStatus(FETCH_STATUS.ERROR);
			return;
		}
	}

	const isLoading = status === FETCH_STATUS.LOADING;
	const isSuccess = status === FETCH_STATUS.SUCCESS;
	const isError = status === FETCH_STATUS.ERROR;
	const isIdle = status === FETCH_STATUS.IDLE;

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col space-y-4 px-4 py-6 bg-zinc-300 rounded-md shadow-md dark:bg-zinc-800 dark:shadow-none dark:rounded-none'
		>
			<label
				htmlFor='name'
				className='relative text-gray-400 focus-within:text-gray-600 block'
			>
				{!form.name ? (
					<FaRegUser className='pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3' />
				) : null}
				<input
					type='text'
					className='rounded-md p-2 w-full'
					name='name'
					value={form.name}
					onChange={handleChange}
				/>
			</label>
			<label
				htmlFor='email'
				className='relative text-gray-400 focus-within:text-gray-600 block'
			>
				{!form.email ? (
					<GoMail className='pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3' />
				) : null}
				<input
					type='email'
					className='w-full rounded-md p-2'
					name='email'
					value={form.email}
					onChange={handleChange}
				/>
			</label>
			<textarea
				placeholder='Message'
				className='rounded-md p-2 text-zinc-400'
				rows={5}
				name='message'
				value={form.message}
				onChange={handleChange}
			/>
			<button
				type='submit'
				className='dark:text-zinc-400 hover:text-white transition-all duration-30You0 ease-in-out bg-transparent border border-zinc-800 dark:border-zinc-400 hover:bg-zinc-400 hover:border-transparent rounded-md py-2 px-4 flex items-center justify-center space-x-2'
			>
				{isLoading ? (
					<div
						className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
						role='status'
					/>
				) : null}
				<p className='pointer-events-none'>Send</p>{' '}
				<GoPaperAirplane className='inline-block w-4 h-4 pointer-events-none' />
			</button>
			{isSuccess ? (
				<p className='text-green-400 text-center'>Message sent successfully!</p>
			) : null}
			{isError ? <p className='text-red-400 text-center'>{error}</p> : null}
		</form>
	);
}
