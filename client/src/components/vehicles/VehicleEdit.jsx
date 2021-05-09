import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHandleForm } from '../../hooks/useHandleForm';
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
import { listVehicleInfo, updateVehicle } from '../../actions/vehicleActions';
import { VEHICLE_UPDATE_RESET } from '../../constants/vehicleConstants';

const VehicleEdit = ({ match, history }) => {
	const vehicleId = match.params.id;

	const [
		vehicleForm,
		setVehicleForm,
		handleChange,
		handleArrayChange,
		handleAddItem,
		handleDelete,
	] = useHandleForm({
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
		vehicle_class: '',
		classification: '',
		height_depth: '',
		max_acceleration: '',
		hyperdrive_system: '',
		shielding: '',
		hull: '',
		sensor_systems: '',
		navigation_system: '',
		docking_bays: '',
		manufacturer: [],
		pilots: [],
		films: [],
		designer: [],
		roles: [],
		affiliation: [],
		armament: [],
		complement: [],
		other_systems: [],
	});

	const dispatch = useDispatch();

	const vehicleInfo = useSelector((state) => state.vehicleInfo);
	const { loading, error, vehicle } = vehicleInfo;

	const vehicleUpdate = useSelector((state) => state.vehicleUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = vehicleUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: VEHICLE_UPDATE_RESET });
			history.push('/admin/vehiclelist');
		} else {
			if (!vehicle.name || vehicle._id !== vehicleId) {
				dispatch(listVehicleInfo(vehicleId));
			} else {
				setVehicleForm({
					name: vehicle.name,
					pretty_url: vehicle.pretty_url,
					image: vehicle.image,
					model: vehicle.model,
					cost_in_credits: vehicle.cost_in_credits,
					length: vehicle.length,
					max_atmosphering_speed: vehicle.max_atmosphering_speed,
					crew: vehicle.crew,
					passengers: vehicle.passengers,
					cargo_capacity: vehicle.cargo_capacity,
					consumables: vehicle.consumables,
					vehicle_class: vehicle.vehicle_class,
					manufacturer: vehicle.manufacturer,
					pilots: vehicle.pilots,
					films: vehicle.films,
				});
			}
		}
		// eslint-disable-next-line
	}, [vehicle, vehicleId, dispatch, successUpdate, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateVehicle({
				_id: vehicleId,
				...vehicleForm,
			})
		);
	};

	const handleInputChange = (e) => {
		handleChange(e.target);
	};

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

	const arrayStyle = {
		border: '1px solid #bdbdbd',
		borderRadius: '5px',
		padding: '5px 0',
		margin: '5px 0',
	};

	return (
		<>
			<Grid className='add-user'>
				<Paper elevation={10} style={paperStyle}>
					<Grid align='center'>
						<Avatar style={avatarStyle} />
						<Typography variant='h5' id='add-user-h2'>
							{`Edit ${vehicle.name}`}
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
								placeholder='Enter Vehicle Name'
								variant='outlined'
								size='small'
								fullWidth
								name='name'
								value={vehicleForm.name || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Pretty URL'
								placeholder='Enter Pretty URL'
								variant='outlined'
								size='small'
								fullWidth
								name='pretty_url'
								value={vehicleForm.pretty_url || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Image'
								placeholder='Enter Image'
								variant='outlined'
								size='small'
								fullWidth
								name='image'
								value={vehicleForm.image || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Cost in Credits'
								placeholder='Enter Cost in Credits'
								variant='outlined'
								size='small'
								fullWidth
								name='cost_in_credits'
								value={vehicleForm.cost_in_credits || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Length'
								placeholder='Enter Length'
								variant='outlined'
								size='small'
								fullWidth
								name='length'
								value={vehicleForm.length || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Max Atm Speed'
								placeholder='Enter Max Atm Speed'
								variant='outlined'
								size='small'
								fullWidth
								name='max_atmosphering_speed'
								value={vehicleForm.max_atmosphering_speed || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Crew'
								placeholder='Enter Crew'
								variant='outlined'
								size='small'
								fullWidth
								name='crew'
								value={vehicleForm.crew || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Passengers'
								placeholder='Enter Passengers'
								variant='outlined'
								size='small'
								fullWidth
								name='passengers'
								value={vehicleForm.passengers || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Cargo Capacity'
								placeholder='Enter Cargo Capacity'
								variant='outlined'
								size='small'
								fullWidth
								name='cargo_capacity'
								value={vehicleForm.cargo_capacity || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Consumables'
								placeholder='Enter Consumables'
								variant='outlined'
								size='small'
								fullWidth
								name='consumables'
								value={vehicleForm.consumables || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='vehicle Class'
								placeholder='Enter vehicle Class'
								variant='outlined'
								size='small'
								fullWidth
								name='vehicle_class'
								value={vehicleForm.vehicle_class || ''}
								onChange={handleInputChange}
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
								{(vehicleForm.manufacturer || []).map((_man, index) => (
									<div key={index} className='manufacturer'>
										<TextField
											variant='outlined'
											size='small'
											value={vehicleForm.manufacturer[index]}
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
								{(vehicleForm.pilots || []).map((_cyb, index) => (
									<div key={index} className='pilots'>
										<TextField
											variant='outlined'
											size='small'
											value={vehicleForm.pilots[index]}
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
								{(vehicleForm.films || []).map((_aff, index) => (
									<div key={index} className='films'>
										<TextField
											variant='outlined'
											size='small'
											value={vehicleForm.films[index]}
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
						<Link to='/admin/vehicleList'>CANCEL</Link>
					</Typography>
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default VehicleEdit;
