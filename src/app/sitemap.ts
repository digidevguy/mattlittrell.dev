import { allBlogs } from 'contentlayer/generated';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const blogs = allBlogs.map((post) => ({
		url: `https://mattlittrell.dev/blog/${post.slug}`,
		lastModified: post.publishedAt,
	}));

	const routes = ['', '/blog', '/extra-life', '/contact', '/feedback'].map(
		(route) => ({
			url: `https://mattlittrell.dev${route}`,
			lastModified: new Date().toISOString().split('T')[0],
		})
	);

	return [...routes, ...blogs];
}
