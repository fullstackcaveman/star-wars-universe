import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = () => {
	return (
		<footer>
			<div className='footer-container'>
				<div className='footer-top'>
					<h2>
						<div className='copyright'>
							<a
								href='https://fullstackcaveman.com'
								target='_blank'
								rel='noreferrer noopener'
							>
								&copy; FullStackCaveman {new Date().getFullYear()}
							</a>
						</div>

						<div className='socials'>
							<a
								href='https://github.com/fullstackcaveman'
								target='_blank'
								rel='noreferrer noopener nofollow'
							>
								<GitHubIcon className='github-icon' />
							</a>
							<a
								href='https://linkedin.com/in/fullstackcaveman/'
								target='_blank'
								rel='noreferrer noopener nofollow'
							>
								{' '}
								<LinkedInIcon className='linkedin-icon' />
							</a>
						</div>
					</h2>
				</div>
				<div className='footer-bottom'>
					<h2>
						Star Wars and all associated names and/or images are &copy;Lucasfilm
						Ltd. Images were freely collected from{' '}
						<a
							href='https://starwars.fandom.com/wiki/Main_Page'
							target='_blank'
							rel='noreferrer noopener nofollow'
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
