import { Link } from 'react-router-dom';

const HeroSection = () => {
	return (
		<Link to='/'>
			<div className='starwars'>
				<p>STAR</p>
				<span className='wars'>WARS</span>
			</div>
		</Link>
	);
};

export default HeroSection;
