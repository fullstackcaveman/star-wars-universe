import { Switch, Link } from 'react-router-dom';
import Background from './Background';

const Home = () => {
	document.title = 'Star Wars Universe';

	return (
		<Switch>
			<>
				<div id='home' className='home'>
					<div className='links-container'>
						<Link to='/characters'>
							<div className='characters-link' />
						</Link>

						<Link to='/films'>
							<div className='films-link' />
						</Link>

						<Link to='/species'>
							<div className='species-link' />
						</Link>

						<Link to='/starships'>
							<div className='starships-link' />
						</Link>

						<Link to='/vehicles'>
							<div className='vehicles-link' />
						</Link>

						<Link to='/planets'>
							<div className='planets-link' />
						</Link>
					</div>

					<Background />
				</div>
			</>
		</Switch>
	);
};

export default Home;
