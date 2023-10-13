import NavBar from '@/components/nav-bar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import profilePic from '../../public/animated-profile.png';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	metadataBase: new URL('https://matthewlittrell.dev'),
	title: 'Matthew Littrell',
	description:
		'A Full Stack Web Developer from Dallas,TX. Love Huskies and coding.',
	openGraph: {
		title: 'Matthew Littrell',
		description:
			'A Full Stack Web Developer from Dallas,TX. Love Huskies and coding.',
		url: 'https://matthewlittrell.dev',
		siteName: 'Matthew Littrell',
		locale: 'en_US',
		type: 'website',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='bg-gradient-to-tr overflow-x-hidden min-w-screen from-zinc-950 via-stone-900 to-neutral-950 flex min-h-screen flex-col items-center justify-between'>
				<main className='flex-auto flex flex-col p-4 py-24 gap-6 w-full lg:w-[55%]'>
					<section className='w-full flex gap-4 justify-start mb-6 p-2'>
						<div>
							<Image
								src={profilePic}
								alt='avatar'
								className='w-12 h-12 rounded-full shadow-lg grayscale hover:grayscale-0 duration-300'
							/>
							{/* <img
								src='https://avatars.githubusercontent.com/u/68690233?s=100&v=4'
								alt='avatar'
								className='w-12 h-12 rounded-full shadow-lg grayscale hover:grayscale-0 duration-300'
							/> */}
						</div>
						<div className='flex flex-col gap-2 justify-center'>
							<h2 className='mb-0 text-zinc-100 font-bold'>Matthew</h2>
							<p className='mb-0 text-zinc-400 font-semibold leading-none'>
								Dev • Bibliophile • Life-long learner
							</p>
						</div>
					</section>
					<NavBar />
					{children}
				</main>
			</body>
		</html>
	);
}
