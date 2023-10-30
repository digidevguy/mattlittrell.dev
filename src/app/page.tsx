import CallToAction from 'src/components/call-to-action';
import SkillBoard from 'src/components/skill-board';

export default function Home() {
	return (
		<section className='flex flex-col items-center space-y-4 px-2 md:px-0'>
			<h1>Hi, I&apos;m Matthew 👋</h1>
			<p className='prose prose-nuetral dark:text-zinc-400'>
				I&apos;m a full stack web developer with a passion for learning and
				discovering new technologies. I&apos;m currently working as a small
				business owner and freelance developer. In my work I strive to provide
				web-based solutions to my clients that are tailored to their needs.
				I&apos;m currently learning more about Next.js, TypeScript, and GraphQL.
				<br />
				<br />
				In addition, I actively contribute to open-source projects and
				collaborate with other developers to promote innovation and
				knowledge-sharing in the web development community.
			</p>
			{/* <SkillBoard /> */}
			<CallToAction />
		</section>
	);
}
