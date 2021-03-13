import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = () => {
	return (
		<footer>
			<div className='footer-container'>
				<div className='footer-top'>
					{/* <h2>
						FullStackCaveman |{' '}
						<a
							href='https://github.com/fullstackcaveman'
							target='_blank'
							rel='noreferrer'
						>
							<GitHubIcon />
							GitHub
						</a>{' '}
						|{' '}
						<a
							href='https://linkedin.com/in/fullstackcaveman/'
							target='_blank'
							rel='noreferrer'
						>
							{' '}
							<LinkedInIcon /> LinkedIn{' '}
						</a>
					</h2>
					<h2>&copy;FullStackCaveman 2021</h2> */}
				</div>
				<div className='footer-bottom'>
					<h2>
						Star Wars and all associated names and/or images are &copy;Lucasfilm
						Ltd. Images were freely collected from{' '}
						<a
							href='https://starwars.fandom.com/wiki/Main_Page'
							target='_blank'
							rel='noreferrer'
						>
							Wookiepedia
						</a>{' '}
						, licensed through Adobe Stock, or created by FullStackCaveman.
					</h2>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
