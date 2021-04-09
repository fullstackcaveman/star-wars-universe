import { useState, useEffect } from 'react';
import update from 'immutability-helper';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
	IconButton,
} from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import {
	listStarshipInfo,
	updateStarship,
} from '../../actions/starshipActions';
import { STARSHIP_UPDATE_RESET } from '../../constants/starshipConstants';

const StarshipEdit = ({ match, history }) => {
	const starshipId = match.params.id;

	const [starshipForm, setStarshipForm] = useState({
		name: '',
		pretty_url: '',
		model: '',
		image: '',
		cost_in_credits: '',
		length: '',
		max_atmosphering_speed: '',
		crew: '',
		passengers: '',
		cargo_capacity: '',
		consumables: '',
		hyperdrive_rating: '',
		MGLT: '',
		starship_class: '',
		manufacturer: [],
		pilots: [],
		films: [],
	});

	const dispatch = useDispatch();

	const starshipInfo = useSelector((state) => state.starshipInfo);
	const { loading, error, starship } = starshipInfo;

	const starshipUpdate = useSelector((state) => state.starshipUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = starshipUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: STARSHIP_UPDATE_RESET });
			history.push('/admin/starshiplist');
		} else {
			if (!starship.name || starship._id !== starshipId) {
				dispatch(listStarshipInfo(starshipId));
			} else {
				setStarshipForm({
					name: starship.name,
					pretty_url: starship.pretty_url,
					model: starship.model,
					image: starship.image,
					manufacturer: starship.manufacturer,
					cost_in_credits: starship.cost_in_credits,
					length: starship.length,
					max_atmosphering_speed: starship.max_atmosphering_speed,
					crew: starship.crew,
					passengers: starship.passengers,
					cargo_capacity: starship.cargo_capacity,
					consumables: starship.consumables,
					hyperdrive_rating: starship.hyperdrive_rating,
					MGLT: starship.MGLT,
					starship_class: starship.starship_class,
					pilots: starship.pilots,
					films: starship.films,
				});
			}
		}
	}, [starship, starshipId, dispatch, successUpdate, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateStarship({
				_id: starshipId,
				...starshipForm,
			})
		);
	};

	// ******************************************************************
	// Handle Arrays in form fields -
	const handleArrayChange = (e, index, arr) => {
		setStarshipForm(
			update(starshipForm, {
				[arr]: {
					[index]: {
						$set: e.target.value,
					},
				},
			})
		);
	};

	const handleAddItem = (arr) => {
		const newArray = starshipForm[arr].push('');
		setStarshipForm({ ...starshipForm, newArray });
	};

	const handleDelete = (arr, index) => {
		const newArray = starshipForm[arr].filter(
			(item) => item !== starshipForm[arr][index]
		);
		setStarshipForm({ ...starshipForm, [arr]: newArray });
	};

	// ******************************************************************

	const paperStyle = {
		padding: 20,
		height: 'auto',
		width: 250,
		margin: '20px auto',
	};

	const avatarStyle = { backgroundColor: '#ffee58', marginBottom: 10 };

	const inputStyle = {
		margin: '5px auto',
	};

	const submitBtnStyle = {
		marginTop: '10px',
		marginBottom: '20px',
		backgroundColor: '#ffee58',

		color: 'rgb(3, 53, 50)',
		fontFamily: 'Impact, sans-serif',
		fontSize: '1rem',
	};

	return (
		<>
			<Grid className='add-user'>
				<Paper elevation={10} style={paperStyle}>
					<Grid align='center'>
						<Avatar style={avatarStyle} />
						<Typography variant='h5' id='add-user-h2'>
							{`Edit ${starship.name}`}
							{loadingUpdate && <Loader />}
							{errorUpdate && (
								<Message severity='error' message={errorUpdate} />
							)}
						</Typography>
					</Grid>
					{loading ? (
						<Loader />
					) : error ? (
						<Message severity='error' message={error} />
					) : (
						<form onSubmit={submitHandler}>
							<TextField
								style={inputStyle}
								label='Name'
								placeholder='Enter User Name'
								variant='outlined'
								size='small'
								fullWidth
								name='name'
								value={starshipForm.name || ''}
								onChange={(e) =>
									setStarshipForm({ ...starshipForm, name: e.target.value })
								}
							/>

							<TextField
								style={inputStyle}
								label='Pretty URL'
								placeholder='Enter Pretty URL'
								variant='outlined'
								size='small'
								fullWidth
								name='pretty_url'
								value={starshipForm.pretty_url || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										pretty_url: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Starship Class'
								placeholder='Enter Starship Class'
								variant='outlined'
								size='small'
								fullWidth
								name='starship_class'
								value={starshipForm.starship_class || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										starship_class: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Image'
								placeholder='Enter Image'
								variant='outlined'
								size='small'
								fullWidth
								name='image'
								value={starshipForm.image || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										image: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Cost in Credits'
								placeholder='Enter Cost in Credits'
								variant='outlined'
								size='small'
								fullWidth
								name='cost_in_credits'
								value={starshipForm.cost_in_credits || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										cost_in_credits: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Length'
								placeholder='Enter Length'
								variant='outlined'
								size='small'
								fullWidth
								name='length'
								value={starshipForm.length || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										length: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Max Atm Speed'
								placeholder='Enter Max Atm Speed'
								variant='outlined'
								size='small'
								fullWidth
								name='max_atmosphering_speed'
								value={starshipForm.max_atmosphering_speed || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										max_atmosphering_speed: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Crew'
								placeholder='Enter Crew'
								variant='outlined'
								size='small'
								fullWidth
								name='crew'
								value={starshipForm.crew || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										crew: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Passengers'
								placeholder='Enter Passengers'
								variant='outlined'
								size='small'
								fullWidth
								name='passengers'
								value={starshipForm.passengers || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										passengers: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Cargo Capacity'
								placeholder='Enter Cargo Capacity'
								variant='outlined'
								size='small'
								fullWidth
								name='cargo_capacity'
								value={starshipForm.cargo_capacity || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										cargo_capacity: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Consumables'
								placeholder='Enter Consumables'
								variant='outlined'
								size='small'
								fullWidth
								name='consumables'
								value={starshipForm.consumables || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										consumables: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Hyperdrive Rating'
								placeholder='Enter Hyperdrive Rating'
								variant='outlined'
								size='small'
								fullWidth
								name='hyperdrive_rating'
								value={starshipForm.hyperdrive_rating || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										hyperdrive_rating: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='MGLT'
								placeholder='Enter MGLT'
								variant='outlined'
								size='small'
								fullWidth
								name='MGLT'
								value={starshipForm.MGLT || ''}
								onChange={(e) =>
									setStarshipForm({
										...starshipForm,
										MGLT: e.target.value,
									})
								}
							/>

							<div
								className='manufacturer'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Manufacturer(s):</Typography>
								{(starshipForm.manufacturer || []).map((_man, index) => (
									<div key={index} className='manufacturer'>
										<TextField
											variant='outlined'
											size='small'
											value={starshipForm.manufacturer[index]}
											name='manufacturer'
											onChange={(e) =>
												handleArrayChange(e, index, 'manufacturer')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('manufacturer', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('manufacturer')}
								>
									Add New Manufacturer
								</Button>
							</div>

							<div
								className='pilots'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Pilots:</Typography>
								{(starshipForm.pilots || []).map((_cyb, index) => (
									<div key={index} className='pilots'>
										<TextField
											variant='outlined'
											size='small'
											value={starshipForm.pilots[index]}
											name='pilots'
											onChange={(e) => handleArrayChange(e, index, 'pilots')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('pilots', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('pilots')}
								>
									Add New Pilot
								</Button>
							</div>

							<div
								className='films'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Films:</Typography>
								{(starshipForm.films || []).map((_aff, index) => (
									<div key={index} className='films'>
										<TextField
											variant='outlined'
											size='small'
											value={starshipForm.films[index]}
											name='films'
											onChange={(e) => handleArrayChange(e, index, 'films')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('films', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('films')}
								>
									Add New Film
								</Button>
							</div>

							<Button
								style={submitBtnStyle}
								type='submit'
								color='primary'
								variant='contained'
								fullWidth
							>
								Update
							</Button>
						</form>
					)}
					<Typography variant='body2'>
						<Link to='/admin/starshipList'>CANCEL</Link>
					</Typography>
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default StarshipEdit;
