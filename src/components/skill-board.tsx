import { skillsList } from 'src/configs/skills-config';
import Image from 'next/image';

export default function SkillBoard() {
	return (
		<>
			<div className='grid auto-rows-auto grid-cols-4 md:grid-cols-6  gap-4 border border-stone-800/90 px-2 py-4 rounded-md bg-stone-900/80'>
				{skillsList.map((skill) => (
					<a href={skill.href} key={skill.title}>
						<Image src={skill.image} alt={skill.title} width={48} height={48} />
					</a>
				))}
			</div>
		</>
	);
}
