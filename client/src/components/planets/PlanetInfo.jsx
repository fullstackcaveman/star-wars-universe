import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Typography,
	Card,
	CardMedia,
	CardContent,
	Button,
} from '@material-ui/core';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Background from '../elements/Background';

import {
	listPlanetInfo,
	listPlanetInfoByName,
} from '../../actions/planetActions';
import { NavLink } from 'react-router-dom';

const PlanetInfo = ({ match, history }) => {
	const dispatch = useDispatch();

	const checked = useSelector((state) => state.adminShowEditBtn);
	const { adminShowEditBtn } = checked;

	const planetInfo = useSelector((state) => state.planetInfo);
	const { loading, error, planet } = planetInfo;

	const {
		climate,
		gravity,
		terrain,
		residents,
		films,
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
		if (match.params.id) {
			dispatch(listPlanetInfo(match.params.id));
		} else {
			dispatch(listPlanetInfoByName(match.params.pretty_url));
		}
	}, [match, dispatch]);

	const handleInfoClick = (model, query) => {
		const data = query.toLowerCase();

		const route = data.split(' ').join('-');

		history.push(`/${model}/info/${route}`);
	};

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

									{adminShowEditBtn ? (
										<NavLink to={`/admin/planet/${planet._id}/edit`}>
											<Button
												variant='contained'
												color='secondary'
												size='small'
												style={{ width: '50px' }}
											>
												EDIT
											</Button>
										</NavLink>
									) : null}
								</CardContent>
							</div>
						</Card>
						<div className='flex'></div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default PlanetInfo;
