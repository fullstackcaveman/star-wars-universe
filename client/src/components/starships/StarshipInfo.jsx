import { useEffect, useState } from 'react';
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
	listStarshipInfo,
	listStarshipInfoByName,
} from '../../actions/starshipActions';
import { NavLink } from 'react-router-dom';
import { useLinkBuilder } from '../../hooks/useLinkBuilder';
import InfoArrayContainer from '../elements/InfoArrayContainer';
import RelatedFilms from '../films/RelatedFilms';

const StarshipInfo = ({ match }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const checked = useSelector((state) => state.adminShowEditBtn);
	const { adminShowEditBtn } = checked;

	const starshipInfo = useSelector((state) => state.starshipInfo);
	const { loading: starshipLoader, error, starship } = starshipInfo;

	const {
		name,
		image,
		model,
		cost_in_credits,
		length,
		max_atmosphering_speed,
		crew,
		passengers,
		cargo_capacity,
		consumables,
		hyperdrive_rating,
		MGLT,
		starship_class,
		manufacturer,
		// pilots,
		films,
	} = starship;

	document.title = `Star Wars | ${starship.name}`;

	useEffect(() => {
		if (match.params.id) {
			dispatch(listStarshipInfo(match.params.id));
		} else {
			dispatch(listStarshipInfoByName(match.params.pretty_url));
		}
		setTimeout(() => setLoading(starshipLoader), 1000);
		// eslint-disable-next-line
	}, [match, dispatch]);

	// eslint-disable-next-line
	const [value, handleBuildLink, handleInfoClick] = useLinkBuilder();

	const infoClick = (e) => {
		const model = e.target.attributes.model.value;
		const query = e.target.attributes.query.value;
		handleInfoClick(model, query);
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
								<CardMedia component='img' alt={name} image={image} />
								<CardContent className='card-data'>
									<div>
										<Typography component='h1'>{name}</Typography>
									</div>
									<div className='info-blocks'>
										<div className='left-info'>
											{!model ? null : (
												<Typography component='h3'>
													{`Model: ${model}`}
												</Typography>
											)}

											{!starship_class ? null : (
												<Typography component='h3'>
													{`Class: ${starship_class}`}
												</Typography>
											)}

											{!cost_in_credits ? null : (
												<Typography component='h3'>
													{`Cost: ${cost_in_credits}`}
													<span className='small-text'>credits</span>
												</Typography>
											)}

											{!max_atmosphering_speed ? null : (
												<Typography component='h3'>
													{`Speed: ${max_atmosphering_speed}`}
													<span className='small-text'>km/h</span>
												</Typography>
											)}

											{!hyperdrive_rating ? null : (
												<Typography component='h3'>
													{`Hyperdrive Rating: ${hyperdrive_rating}`}
												</Typography>
											)}

											{!MGLT ? null : (
												<Typography component='h3'>
													{`MGLT: ${MGLT}`}
												</Typography>
											)}

											{!length ? null : (
												<Typography component='h3'>
													{`Length: ${length}`}
													<span className='small-text'>m</span>
												</Typography>
											)}
										</div>

										<div className='right-info'>
											{!crew ? null : (
												<Typography component='h3'>
													{`Crew: ${crew}`}
												</Typography>
											)}

											{!passengers ? null : (
												<Typography component='h3'>
													{`Passengers: ${passengers}`}
												</Typography>
											)}

											{!cargo_capacity ? null : (
												<Typography component='h3'>
													{`Cargo capacity: ${cargo_capacity}`}
													<span className='small-text'>metric tons</span>
												</Typography>
											)}

											{!consumables ? null : (
												<Typography component='h3'>
													{`Consumables: ${consumables}`}
												</Typography>
											)}

											{manufacturer === undefined ||
											manufacturer.length === 0 ? null : (
												<div className='info-array-container'>
													<InfoArrayContainer
														addClass='info-array no-links'
														model='Manufacturer'
														arr={manufacturer}
													/>
												</div>
											)}
										</div>
									</div>

									{adminShowEditBtn ? (
										<NavLink to={`/admin/starship/${starship._id}/edit`}>
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
						<div className='flex'>
							<RelatedFilms films={films} handleInfoClick={handleInfoClick} />
						</div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default StarshipInfo;
