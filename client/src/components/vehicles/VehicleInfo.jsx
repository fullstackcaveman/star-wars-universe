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
	listVehicleInfo,
	listVehicleInfoByName,
} from '../../actions/vehicleActions';
import { NavLink } from 'react-router-dom';
import { useLinkBuilder } from '../../hooks/useLinkBuilder';

const VehicleInfo = ({ match }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState();

	const checked = useSelector((state) => state.adminShowEditBtn);
	const { adminShowEditBtn } = checked;

	const vehicleInfo = useSelector((state) => state.vehicleInfo);
	const { loading: vehicleLoader, error, vehicle } = vehicleInfo;

	const {
		name,
		model,
		image,
		cost_in_credits,
		length,
		max_atmosphering_speed,
		crew,
		passengers,
		cargo_capacity,
		consumables,
		vehicle_class,
		manufacturer,
		// pilots,
		// films,
	} = vehicle;

	document.title = `Star Wars | ${vehicle.name}`;

	useEffect(() => {
		if (match.params.id) {
			dispatch(listVehicleInfo(match.params.id));
		} else {
			dispatch(listVehicleInfoByName(match.params.pretty_url));
		}
		setTimeout(() => setLoading(vehicleLoader), 1000);
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
											{!model ? (
												<Typography component='h3'>Model: unknown</Typography>
											) : (
												<Typography component='h3'>{`Model: ${model}`}</Typography>
											)}

											{!vehicle_class ? (
												<Typography component='h3'>
													Vehicle Class: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Vehicle Class: ${vehicle_class}`}</Typography>
											)}

											{cost_in_credits === 'unknown' ? (
												<Typography component='h3'>Cost: unknown</Typography>
											) : (
												<Typography component='h3'>{`Cost: ${cost_in_credits} credits`}</Typography>
											)}

											{length === 'unknown' ? (
												<Typography component='h3'>Length: unknown</Typography>
											) : (
												<Typography component='h3'>{`Length: ${length}m`}</Typography>
											)}

											{max_atmosphering_speed === 'unknown' ? (
												<Typography component='h3'>
													Max Speed: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Max Speed: ${max_atmosphering_speed}km/h`}</Typography>
											)}

											{!crew ? (
												<Typography component='h3'>Crew: unknown</Typography>
											) : (
												<Typography component='h3'>{`Crew: ${crew}`}</Typography>
											)}
										</div>

										<div className='right-info'>
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
												<Typography component='h3'>{`Cargo Capacity: ${cargo_capacity}kg`}</Typography>
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
										<NavLink to={`/admin/vehicle/${vehicle._id}/edit`}>
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

export default VehicleInfo;
