import { allBlogs } from 'contentlayer/generated';

export default async function sitemap() {
	const blogs = allBlogs.map((post) => ({
		url: `https://mattlittrell.dev/blog/${post.slug}`,
		lastModified: post.publishedAt,
	}));

	const routes = ['', '/blog', '/projects', '/contact'].map((route) => ({
		url: `https://mattlittrell.dev${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}));

	return [...routes, ...blogs];
}
