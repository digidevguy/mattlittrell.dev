import { NextResponse } from 'next/server';
import { createSupabaseRouteHandlerClient } from 'src/libs/supabase';

export async function GET(request: Request) {
	const supabase = createSupabaseRouteHandlerClient();

	const { data, error } = await supabase
		.from('games')
		.select('id,title')
		.order('title', { ascending: true });

	if (error) {
		return NextResponse.json(
			{ error: 'Unable to find list, please try again later.' },
			{ status: 500 }
		);
	}

	return NextResponse.json(data, { status: 200 });
}

export async function POST(request: Request) {
	const { name, vote, newGame } = await request.json();
	console.log(name, vote, newGame);
	const supabase = createSupabaseRouteHandlerClient();

	if (newGame) {
		try {
			const { data: writeData, error: writeError } = await supabase
				.from('games')
				.insert([{ title: newGame }])
				.select();

			if (writeError) {
				throw new Error(writeError.message);
			}

			const { error: voteError } = await supabase
				.from('votes')
				.insert([{ game_id: writeData[0].id, user_name: name }]);

			if (voteError) {
				throw new Error(voteError.message);
			}

			return NextResponse.json(
				{ message: 'Your vote has been added!' },
				{ status: 200 }
			);
		} catch (error: any) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	}

	try {
		const { error: voteError } = await supabase
			.from('votes')
			.insert([{ game_id: vote, user_name: name }]);

		if (voteError) {
			throw new Error(voteError.message);
		}

		return NextResponse.json(
			{ message: 'Your vote has been added!' },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
