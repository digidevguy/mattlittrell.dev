import devConfig from '../configs/dev-config';

export default function Footer() {
	return (
		<footer className='w-full pb-4 pt-16'>
			<div className='flex flex-col space-y-4 w-full items-between'>
				<div className='flex flex-row justify-around'>
					<div className='flex flex-col'>
						{/* <a href='/report'>Report</a> */}
						<a href='/feedback'>Feedback</a>
						{/* <a href='/privacy'>Privacy Policy</a> */}
					</div>
					<div className='contact-links flex flex-row space-x-2 items-center'>
						{devConfig.author.accounts.map((social) => (
							<a
								href={social.url}
								key={social.title}
								className='text-2xl'
								target='_blank'
							>
								{social.icon}
							</a>
						))}
					</div>
				</div>
				<span className='divider border border-zinc-400 w-1/2 mx-auto' />
				<p className='mx-auto'>{devConfig.copyright}</p>
			</div>
		</footer>
	);
}
