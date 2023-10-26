import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const devConfig = {
	copyright: `Copyright ©️ ${new Date().getFullYear()} Matthew Littrell.`,
	author: {
		name: 'Matthew Littrell',
		accounts: [
			{
				label: 'GitHub Account',
				url: 'https://github.com/digidevguy',
				icon: <FaGithub />,
			},
			{
				label: 'LinkedIn Account',
				url: 'https://www.linkedin.com/in/matthew-littrell-886066111/',
				icon: <FaLinkedin />,
			},
			{
				label: 'Email link',
				url: 'mailto:info@mattlittrell.dev?subject=Mail%20from%20Portfolio%20Site',
				icon: <FiMail />,
			},
		],
	},
};

export default devConfig;
