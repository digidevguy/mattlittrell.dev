import Image from 'next/image';
import callToActionImage from '../../public/images/kelly-sikkema-wireframe.jpg';

export default function CallToAction() {
	return (
		<div className='cta md:flex border-stone-800/90 rounded-md bg-stone-900/80 overflow-hidden items-center'>
			<Image
				src={callToActionImage}
				alt='wireframe'
				className='md:h-auto md:w-80 h-auto'
			/>
			<div className='flex flex-col py-6 md:p-6 text-center md:text-left space-y-4 items-center'>
				<div>
					<h1 className='antialiased font-bold text-xl text-white'>
						Have an idea you want to build?
					</h1>
					<p className='text-zinc-400'>
						Let&apos;s work together to make it a reality!
					</p>
				</div>
				<button className='cta-btn border p-2 border-zinc-300 text-zinc-400 rounded-md md:w-3/4 w-1/2 transition-all ease-in-out hover:bg-zinc-500 hover:text-white hover:scale-110 duration-300'>
					Let&apos;s create something
				</button>
			</div>
		</div>
	);
}
