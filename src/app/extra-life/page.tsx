import VoteBoard from './vote-board';
import VotingForm from './vote-form';
import elBannerPic from '../../../public/images/extra-life-logo.png';
import Image from 'next/image';

export default function ExtraLifePage() {
	return (
		<section className='flex flex-col space-y-4 px-2 mb-10 items-center'>
			<h1 className='font-bold text-2xl mb-8 tracking-tighter'>
				help the charity
			</h1>
			<Image src={elBannerPic} alt='Extra Life Banner' />
			<p className='mx-auto prose prose-nuetral dark:prose-invert dark:text-zinc-400'>
				Welcome! This year, I&apos;m excited to be participating in the Extra
				Life event for the 9th consecutive year. I&apos;ll be pledging my time
				and effort to raise funds for children at our local children&apos;s
				hospital. Each year, my aim has been to exceed the amount I raised the
				previous year, and this year is no different. Let&apos;s make a
				difference together! Please donate what you can (any amount is accepted)
				as anything will help!
			</p>
			<a
				href='https://www.extra-life.org/participant/next-step'
				target='_blank'
				className='py-2 px-6 font-bold border rounded-md dark:border-zinc-700 dark:text-zinc-400 bg-cyan-300 dark:hover:text-zinc-100 hover:text-zinc-700 hover:bg-cyan-600 transition-all duration-300 ease-in-out'
			>
				Donate
			</a>
			<p className='mx-auto prose prose-nuetral dark:prose-invert dark:text-zinc-400'>
				I also have included the option for viewers to vote on what games they
				would like to see during the stream. Feel free to vote for one or more
				games that you&apos;d like to see, and if you&apos;d like to join me you
				can join me on{' '}
				<a href='https://discord.gg/QzejhNUm3F' target='_blank'>
					Discord
				</a>
				.
			</p>
			<VotingForm />
			<VoteBoard />
		</section>
	);
}
