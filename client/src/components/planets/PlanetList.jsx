import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import {
	listPlanets,
	deletePlanet,
	createPlanet,
} from '../../actions/planetActions';
import { PLANET_CREATE_RESET } from '../../constants/planetConstants';

const PlanetList = ({ history, match }) => {
	document.title = 'Star Wars | Planet List';
	const dispatch = useDispatch();

	const planetList = useSelector((state) => state.planetList);
	const { loading, error, planets } = planetList;

	const planetDelete = useSelector((state) => state.planetDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = planetDelete;

	const planetCreate = useSelector((state) => state.planetCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		planet: createdPlanet,
	} = planetCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: PLANET_CREATE_RESET });

		if (!userInfo.isAdmin) {
			history.push('/users/login');
		}

		if (successCreate) {
			history.push(`/admin/planet/${createdPlanet._id}/edit`);
		} else {
			dispatch(listPlanets());
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdPlanet,
	]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deletePlanet(id));
		}
	};

	const createPlanetHandler = () => {
		dispatch(createPlanet());
	};

	return (
		<div className='edit-table'>
			<Button
				style={{ marginBottom: '10px' }}
				variant='contained'
				color='primary'
				onClick={createPlanetHandler}
			>
				<AddIcon /> Create Planet
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
								<TableCell align='center'>POPULATION</TableCell>
								<TableCell align='center'>TERRAIN</TableCell>
								<TableCell align='center'></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{planets.map((planet) => {
								return (
									<TableRow key={planet._id}>
										<TableCell align='center'>{planet.name}</TableCell>
										<TableCell align='center'>{planet.population}</TableCell>
										<TableCell align='center'>
											{planet.terrain.map((terra) => (
												<p key={terra}>{terra}</p>
											))}
										</TableCell>
										<TableCell align='center'>
											<NavLink to={`/planets/info/${planet.pretty_url}`}>
												<Button variant='contained' size='small'>
													<OpenInBrowserIcon />
												</Button>
											</NavLink>

											<NavLink to={`/admin/planet/${planet._id}/edit`}>
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
												onClick={() => deleteHandler(planet._id)}
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
		</div>
	);
};

export default PlanetList;
