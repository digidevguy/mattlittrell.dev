import NavBar from 'src/components/nav-bar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import profilePic from '../../public/animated-profile.png';
import clsx from 'clsx';
import localFont from 'next/font/local';
import Footer from 'src/components/footer';

const roboto = localFont({
	src: [
		{
			path: '../../public/fonts/Roboto-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Roboto-Medium.ttf',
			weight: '600',
			style: 'bold',
		},
	],
	variable: '--font-roboto',
	display: 'swap',
});

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
		<html
			lang='en'
			className={clsx(
				'text-black bg-white dark:bg-[#111010] dark:text-white transition-colors duration-300 ease-in-out',
				roboto.variable
			)}
		>
			{/* <body className='antialiased bg-gradient-to-tr overflow-x-hidden min-w-screen from-zinc-950 via-stone-900 to-neutral-950 flex min-h-screen flex-col justify-between max-w-2xl mb-40 md:flex-row mt-8 mx-4 lg:mx-auto'> */}

			<body className='antialiased max-w-2xl flex flex-col md:flex-row mt-8 mx-auto'>
				<main className='flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0'>
					<section className='w-full flex gap-4 justify-start mb-6 p-2'>
						<div>
							<Image
								src={profilePic}
								alt='avatar'
								className='w-12 h-12 rounded-full shadow-lg grayscale hover:grayscale-0 duration-300'
							/>
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
					<Footer />
				</main>
			</body>
		</html>
	);
}
