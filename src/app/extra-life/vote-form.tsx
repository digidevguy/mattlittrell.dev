'use client';
import { useState, useEffect } from 'react';
import { GoPaperAirplane } from 'react-icons/go';
import { FETCH_STATUS } from 'src/libs/fetchStatus';

export default function VotingForm() {
	const [form, setForm] = useState({
		name: '',
		vote: '',
		newGame: '',
	});
	const [gameList, setGameList] = useState<Game[]>([]);
	const [status, setStatus] = useState(FETCH_STATUS.IDLE);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/extra-life');
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const data: Game[] = await response.json();
				setGameList(data);
				setStatus(FETCH_STATUS.IDLE);
			} catch (error: any) {
				setStatus(FETCH_STATUS.ERROR);
				setError(error.message);
				console.error(error);
			}
		})();
	}, []);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function submitVote(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus(FETCH_STATUS.LOADING);

		try {
			const response = await fetch('/api/extra-life', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			setStatus(FETCH_STATUS.SUCCESS);
			setForm({
				name: '',
				vote: '',
				newGame: '',
			});
		} catch (error: any) {
			setStatus(FETCH_STATUS.ERROR);
			setError(error.error);
		}
	}

	const isLoading = status === FETCH_STATUS.LOADING;
	const isSuccess = status === FETCH_STATUS.SUCCESS;
	const isError = status === FETCH_STATUS.ERROR;

	return (
		<form
			onSubmit={submitVote}
			className={`flex flex-col max-w-md mx-auto space-y-3 px-4 py-4 bg-zinc-900 border ${
				isError ? 'border-red-500' : 'border-zinc-400'
			} rounded-md ${isLoading ? 'animate-pulse' : ''}`}
		>
			<h1 className='font-bold text-2xl tracking-tighter text-center'>
				Cast your vote!
			</h1>
			<label htmlFor='name'>Your name</label>
			<input
				type='text'
				name='name'
				id='name'
				value={form.name}
				onChange={handleChange}
				className='p-2 text-zinc-400 rounded-md'
			/>
			<label htmlFor='vote'>Select your game</label>
			<select
				name='vote'
				id='vote'
				value={form.vote}
				onChange={handleChange}
				className='p-2 text-zinc-400 rounded-md'
			>
				<option value={0}>Select a game</option>
				{gameList.map((game) => (
					<option key={game.id} value={game.id} className='text-zinc-400'>
						{game.title}
					</option>
				))}
			</select>
			<label htmlFor='newGame'>Your game isn&apos;t here? Add it below</label>
			<input
				type='text'
				name='newGame'
				id='newGame'
				value={form.newGame}
				onChange={handleChange}
				className='p-2 text-zinc-400 rounded-md'
			/>
			<button
				type='submit'
				className='text-zinc-400 hover:text-white transition-all duration-300 ease-in-out bg-transparent border border-zinc-400 hover:bg-zinc-400 hover:border-transparent rounded-md py-2 px-4 flex items-center justify-center space-x-2'
			>
				{isLoading ? (
					<div
						className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
						role='status'
					/>
				) : null}
				<p className='pointer-events-none'>Vote</p>{' '}
				<GoPaperAirplane className='inline-block w-4 h-4 pointer-events-none' />
			</button>

			{isSuccess ? (
				<p className='text-green-400 text-center'>Message sent successfully!</p>
			) : null}
			{isError ? <p className='text-red-400 text-center'>{error}</p> : null}
		</form>
	);
}
