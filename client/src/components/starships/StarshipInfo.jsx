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

import { listStarshipInfo } from '../../actions/starshipActions';
import { NavLink } from 'react-router-dom';
import { useLinkBuilder } from '../../hooks/useLinkBuilder';

const StarshipInfo = ({ match }) => {
	const dispatch = useDispatch();

	const checked = useSelector((state) => state.adminShowEditBtn);
	const { adminShowEditBtn } = checked;

	const starshipInfo = useSelector((state) => state.starshipInfo);
	const { loading, error, starship } = starshipInfo;

	const {
		name,
		// pretty_url,
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
		// films,
	} = starship;

	document.title = `Star Wars | ${starship.name}`;

	useEffect(() => {
		dispatch(listStarshipInfo(match.params.id));
	}, [match, dispatch]);

	// eslint-disable-next-line
	const [value, handleBuildLink, handleInfoClick] = useLinkBuilder();

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
											{!model ? (
												<Typography component='h3'>Model: unknown</Typography>
											) : (
												<Typography component='h3'>{`Model: ${model}`}</Typography>
											)}

											{!starship_class ? (
												<Typography component='h3'>Class: unknown</Typography>
											) : (
												<Typography component='h3'>{`Class: ${starship_class}`}</Typography>
											)}

											{!cost_in_credits ? (
												<Typography component='h3'>Cost: unknown</Typography>
											) : (
												<Typography component='h3'>{`Cost: ${cost_in_credits}`}</Typography>
											)}

											{!max_atmosphering_speed ? (
												<Typography component='h3'>Speed: unknown</Typography>
											) : (
												<Typography component='h3'>{`Speed: ${max_atmosphering_speed}`}</Typography>
											)}

											{!hyperdrive_rating ? (
												<Typography component='h3'>
													Hyperdrive Rating: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Hyperdrive Rating: ${hyperdrive_rating}`}</Typography>
											)}

											{!MGLT ? (
												<Typography component='h3'>MGLT: unknown</Typography>
											) : (
												<Typography component='h3'>{`MGLT: ${MGLT}`}</Typography>
											)}

											{!length ? (
												<Typography component='h3'>Length: unknown</Typography>
											) : (
												<Typography component='h3'>{`Length: ${length}`}</Typography>
											)}
										</div>

										<div className='right-info'>
											{!crew ? (
												<Typography component='h3'>Crew: unknown</Typography>
											) : (
												<Typography component='h3'>{`Crew: ${crew}`}</Typography>
											)}

											{!passengers ? (
												<Typography component='h3'>
													Passengers: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Passengers: ${passengers}`}</Typography>
											)}

											{!cargo_capacity ? (
												<Typography component='h3'>
													Cargo Capacity: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Cargo capacity: ${cargo_capacity}`}</Typography>
											)}

											{!consumables ? (
												<Typography component='h3'>
													Consumables: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Consumables: ${consumables}`}</Typography>
											)}
											<div className='info-array-container'>
												<Typography component='h3'>Manufacturer(s):</Typography>
												<Typography component='p' className='info-array'>
													{(manufacturer || []).map((manu) => (
														<span key={manu}>{`${manu}`}</span>
													))}
												</Typography>
											</div>
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
						<div className='flex'></div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default StarshipInfo;
