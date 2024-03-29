import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Background from '../elements/Background';

import {
	listVehicleInfo,
	listVehicleInfoByName,
} from '../../actions/vehicleActions';
import { NavLink, useParams } from 'react-router-dom';
import { useLinkBuilder } from '../../hooks/useLinkBuilder';
import InfoArrayContainer from '../elements/InfoArrayContainer';
import RelatedItems from '../elements/RelatedItems';
import { listFilms } from '../../actions/filmActions';

const VehicleInfo = ({ match }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const checked = useSelector((state) => state.adminShowEditBtn);
	const { adminShowEditBtn } = checked;

	const vehicleInfo = useSelector((state) => state.vehicleInfo);
	const { loading: vehicleLoader, error, vehicle } = vehicleInfo;

	const allFilms = useSelector((state) => state.filmList);
	const { films } = allFilms;

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
		relatedFilms,
	} = vehicle;

	document.title = `Star Wars | ${vehicle.name}`;

	const { pretty_url, id } = useParams();

	useEffect(() => {
		if (id) {
			dispatch(listVehicleInfo(id));
		} else {
			dispatch(listVehicleInfoByName(pretty_url));
		}
		dispatch(listFilms());

		setTimeout(() => setLoading(vehicleLoader), 2000);
		// eslint-disable-next-line
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
											{!model ? null : (
												<Typography component='h3'>
													{`Model: ${model}`}
												</Typography>
											)}

											{!vehicle_class ? null : (
												<Typography component='h3'>
													{`Vehicle Class: ${vehicle_class}`}
												</Typography>
											)}

											{cost_in_credits === 'unknown' ? null : (
												<Typography component='h3'>
													{`Cost: ${Number(cost_in_credits).toLocaleString()}`}
													<span className='small-text'>credits</span>
												</Typography>
											)}

											{!length ? null : (
												<Typography component='h3'>
													{`Length: ${length}`}
													<span className='small-text'>m</span>
												</Typography>
											)}

											{!max_atmosphering_speed ? null : (
												<Typography component='h3'>
													{`Max Speed: ${max_atmosphering_speed}`}
													<span className='small-text'>km/h</span>
												</Typography>
											)}

											{!crew ? null : (
												<Typography component='h3'>
													{`Crew: ${crew}`}
												</Typography>
											)}
										</div>

										<div className='right-info'>
											{!passengers ? null : (
												<Typography component='h3'>
													{`Passengers: ${passengers}`}
												</Typography>
											)}

											{cargo_capacity === 'unknown' ? null : (
												<Typography component='h3'>
													{`Cargo Capacity: ${Number(
														cargo_capacity
													).toLocaleString()}`}
													<span className='small-text'>kg</span>
												</Typography>
											)}

											{consumables === 'unknown' ? null : (
												<Typography component='h3'>
													{`Consumables: ${consumables}`}
												</Typography>
											)}

											{manufacturer === undefined ||
											manufacturer.length === 0 ? null : (
												<div className='info-array-container'>
													<InfoArrayContainer
														addClass='info-array no-links'
														model='Maunfacturer'
														arr={manufacturer}
													/>
												</div>
											)}
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

						<div className='flex'>
							{relatedFilms === undefined ||
							relatedFilms.length === 0 ? null : (
								<div className='flex'>
									<RelatedItems
										items={relatedFilms}
										related={films}
										model='Films'
										handleInfoClick={handleInfoClick}
									/>
								</div>
							)}
						</div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default VehicleInfo;
