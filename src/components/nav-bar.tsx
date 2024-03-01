'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { navItems } from 'src/data/navigation';

export default function NavBar() {
	let pathname = usePathname() || '/';

	if (pathname.includes('/blog/')) {
		pathname = '/blog';
	}

	const [hoveredPath, setHoveredPath] = useState(pathname);

	return (
		<div className='border bg-zinc-300 dark:border-stone-800/90 p-[0.4rem] rounded-lg mb-12 sticky top-4 z-[100] dark:bg-stone-900/80 backdrop-blur'>
			{/* <div className='p-[0.4rem] mb-12 sticky top-4 z-[100]'> */}
			<nav className='flex gap-2 relative justify-start w-full z-[100] rounded-lg'>
				{navItems.map((item, index) => {
					const isActive = item.path === pathname;

					return (
						<Link
							key={item.path}
							className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
								isActive ? 'text-zinc-100' : 'text-zinc-700 dark:text-zinc-400'
							}`}
							data-active={isActive}
							onMouseOver={() => setHoveredPath(item.path)}
							onMouseLeave={() => setHoveredPath(pathname)}
							href={item.path}
						>
							<span>{item.name}</span>
							{item.path === hoveredPath && (
								<motion.div
									className='absolute left-0 bottom-0 h-full bg-stone-800/80 rounded-md -z-10'
									layoutId='hidden'
									aria-hidden='true'
									style={{ width: '100%' }}
									transition={{
										type: 'spring',
										bounce: 0.25,
										stiffness: 130,
										damping: 9,
										duration: 0.3,
									}}
								/>
							)}
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
