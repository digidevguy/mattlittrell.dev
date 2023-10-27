import RealTimeVotes from './realtime-votes';
import { createSupabaseServerComponentClient } from 'src/libs/supabase';

export const dynamic = 'force-dynamic';

export default async function Table() {
	const supabase = await createSupabaseServerComponentClient();

	const { data, error } = await supabase
		.from('games')
		.select('id, title, votes(id)')
		.order('title', { ascending: true });

	return (
		<div className='flex flex-col items-center px-2 space-y-4 sm: min-w-full md:min-w-fit text-zinc-400'>
			<h1 className='font-semibold text-2xl'>Current Votes</h1>
			<hr className='min-w-full border border-slate-300' />
			<RealTimeVotes votes={data} />
		</div>
	);
}
