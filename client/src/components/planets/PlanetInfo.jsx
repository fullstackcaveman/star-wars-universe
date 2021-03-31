import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Background from '../elements/Background';
// import RelatedFilms from '../films/RelatedFilms';

import { listPlanetInfo } from '../../actions/planetActions';

const PlanetInfo = ({ match }) => {
	const dispatch = useDispatch();

	const planetInfo = useSelector((state) => state.planetInfo);
	const { loading, error, planet } = planetInfo;

	const {
		climate,
		gravity,
		terrain,
		// residents,
		// films,
		name,
		// pretty_url,
		rotation_period,
		orbital_period,
		diameter,
		surface_water,
		population,
	} = planet;

	document.title = `Star Wars | ${planet.name}`;

	useEffect(() => {
		dispatch(listPlanetInfo(match.params.id));
	}, [match, dispatch]);

	return (
		<>
			<div className='info-container'>
				{loading ? (
					<Loader />
				) : error ? (
					<Message severity='error' message={error} />
				) : (
					<>
						<Card className='info-card'>
							<div className='flex'>
								{!planet.image ? (
									<CardMedia
										component='img'
										alt={planet.name}
										image='../../images/placeholder.jpg'
									/>
								) : (
									<CardMedia
										component='img'
										alt={planet.name}
										image={planet.image}
									/>
								)}

								<CardContent className='card-data'>
									<Typography component='h1'>{name}</Typography>

									{!population ? (
										<Typography component='h3'>Population: unknown</Typography>
									) : (
										<Typography component='h3'>{`Population: ${population}`}</Typography>
									)}

									{!rotation_period ? (
										<Typography component='h3'>
											Rotation Period: unknown
										</Typography>
									) : (
										<Typography component='h3'>{`Rotation Period: ${rotation_period} Days`}</Typography>
									)}

									{!orbital_period ? (
										<Typography component='h3'>
											Orbital Period: unknown
										</Typography>
									) : (
										<Typography component='h3'>{`Orbital Period: ${orbital_period} Days`}</Typography>
									)}

									{!diameter ? (
										<Typography component='h3'>Diameter: unknown</Typography>
									) : (
										<Typography component='h3'>{`Diameter: ${diameter}km`}</Typography>
									)}

									{!gravity ? (
										<Typography component='h3'>Gravity: unknown</Typography>
									) : (
										<Typography component='h3'>{`Gravity: ${gravity}`}</Typography>
									)}

									{!terrain ? (
										<Typography component='h3'>Terrain: n/a</Typography>
									) : (
										<Typography component='h3'>{`Terrain: ${terrain}`}</Typography>
									)}

									{!surface_water ? (
										<Typography component='h3'>Surface Water: n/a</Typography>
									) : (
										<Typography component='h3'>{`Surface Water: ${surface_water}`}</Typography>
									)}

									{!climate ? (
										<Typography component='h3'>Climate: unknown</Typography>
									) : (
										<Typography component='h3'>{`Climate: ${climate}`}</Typography>
									)}
								</CardContent>
							</div>
						</Card>
						<div className='flex'>{/* <RelatedFilms /> */}</div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default PlanetInfo;
