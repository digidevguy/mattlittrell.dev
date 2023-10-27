import {
	createRouteHandlerClient,
	createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createSupabaseRouteHandlerClient = cache(() => {
	const cookieStore = cookies();
	return createRouteHandlerClient<Database>({ cookies: () => cookieStore });
});

export const createSupabaseServerComponentClient = cache(() => {
	const cookieStore = cookies();
	return createServerComponentClient<Database>({ cookies: () => cookieStore });
});
