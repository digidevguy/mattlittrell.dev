import type { Metadata } from 'next';
import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'My blog posts',
};

export default function BlogPage() {
	return (
		<section>
			<h1 className='font-bold text-2xl mb-8 tracking-tighter'>
				read some of my thoughts
			</h1>
			{allBlogs
				.sort((a, b) => {
					if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
						return -1;
					}
					return 1;
				})
				.map((blog) => (
					<Link
						key={blog.slug}
						className='flex flex-col space-y-1 mb-4'
						href={`/blog/${blog.slug}`}
					>
						<div className='w-full flex flex-col'>
							<p className='text-neutral-900 dark:text-neutral-100 tracking-light'>
								{blog.title}
							</p>
						</div>
					</Link>
				))}
		</section>
	);
}
