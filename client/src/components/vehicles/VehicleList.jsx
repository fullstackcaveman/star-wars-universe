import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import {
	listVehicles,
	deleteVehicle,
	createVehicle,
} from '../../actions/vehicleActions';
import { VEHICLE_CREATE_RESET } from '../../constants/vehicleConstants';

const VehicleList = ({ history, match }) => {
	document.title = 'Star Wars | Vehicle List';
	const dispatch = useDispatch();

	const vehicleList = useSelector((state) => state.vehicleList);
	const { loading, error, vehicles } = vehicleList;

	const vehicleDelete = useSelector((state) => state.vehicleDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = vehicleDelete;

	const vehicleCreate = useSelector((state) => state.vehicleCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		vehicle: createdVehicle,
	} = vehicleCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: VEHICLE_CREATE_RESET });

		if (!userInfo.isAdmin) {
			history.push('/users/login');
		}

		if (successCreate) {
			history.push(`/admin/vehicle/${createdVehicle._id}/edit`);
		} else {
			dispatch(listVehicles());
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdVehicle,
	]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteVehicle(id));
		}
	};

	const createVehicleHandler = () => {
		dispatch(createVehicle());
	};

	return (
		<>
			<Button
				style={{ marginBottom: '10px' }}
				variant='contained'
				color='primary'
				onClick={createVehicleHandler}
			>
				<AddIcon /> Create Vehicle
			</Button>

			{loadingDelete && <Loader />}
			{errorDelete && <Message severity='error' message={errorDelete} />}
			{loadingCreate && <Loader />}
			{errorCreate && <Message severity='error' message={errorCreate} />}
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<TableContainer component={Paper}>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell align='center'>NAME</TableCell>
								<TableCell align='center'>CLASS</TableCell>
								<TableCell align='center'>MANUFACTURER(S)</TableCell>
								<TableCell align='center'></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{vehicles.map((vehicle) => {
								return (
									<TableRow key={vehicle._id}>
										<TableCell align='center'>{vehicle.name}</TableCell>
										<TableCell align='center'>
											{vehicle.vehicle_class}
										</TableCell>
										<TableCell align='center'>
											{vehicle.manufacturer.map((manufacturer) => (
												<p key={manufacturer}>{manufacturer}</p>
											))}
										</TableCell>
										<TableCell align='center'>
											<NavLink to={`/vehicles/info/${vehicle.pretty_url}`}>
												<Button variant='contained' size='small'>
													<OpenInBrowserIcon />
												</Button>
											</NavLink>

											<NavLink to={`/admin/vehicle/${vehicle._id}/edit`}>
												<Button
													variant='contained'
													size='small'
													color='primary'
												>
													<EditIcon />
												</Button>
											</NavLink>
											<Button
												variant='contained'
												color='secondary'
												size='small'
												onClick={() => deleteHandler(vehicle._id)}
											>
												<DeleteForeverIcon />
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			<Background />
		</>
	);
};

export default VehicleList;
