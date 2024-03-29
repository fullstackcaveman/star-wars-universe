import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import AddIcon from '@mui/icons-material/Add';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import {
	listStarships,
	deleteStarship,
	createStarship,
} from '../../actions/starshipActions';
import { STARSHIP_CREATE_RESET } from '../../constants/starshipConstants';

const StarshipList = ({ history, match }) => {
	document.title = 'Star Wars | Starship List';
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const starshipList = useSelector((state) => state.starshipList);
	const { loading, error, starships } = starshipList;

	const starshipDelete = useSelector((state) => state.starshipDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = starshipDelete;

	const starshipCreate = useSelector((state) => state.starshipCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		starship: createdStarship,
	} = starshipCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: STARSHIP_CREATE_RESET });

		if (!userInfo.isAdmin) {
			navigate('/users/login');
		}

		if (successCreate) {
			navigate(`/admin/starship/${createdStarship._id}/edit`);
		} else {
			dispatch(listStarships());
		}
	}, [
		dispatch,
		navigate,
		userInfo,
		successDelete,
		successCreate,
		createdStarship,
	]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteStarship(id));
		}
	};

	const createStarshipHandler = () => {
		dispatch(createStarship());
	};

	return (
		<div className='edit-table'>
			<Button
				style={{ marginBottom: '10px' }}
				variant='contained'
				color='primary'
				onClick={createStarshipHandler}
			>
				<AddIcon /> Create Starship
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
							{starships.map((starship) => {
								return (
									<TableRow key={starship._id}>
										<TableCell align='center'>{starship.name}</TableCell>
										<TableCell align='center'>
											{starship.starship_class}
										</TableCell>
										<TableCell align='center'>
											{starship.manufacturer.map((manufacturer) => (
												<p key={manufacturer}>{manufacturer}</p>
											))}
										</TableCell>
										<TableCell align='center'>
											<NavLink to={`/starships/info/${starship.pretty_url}`}>
												<Button variant='contained' size='small'>
													<OpenInBrowserIcon />
												</Button>
											</NavLink>

											<NavLink to={`/admin/starship/${starship._id}/edit`}>
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
												onClick={() => deleteHandler(starship._id)}
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

export default StarshipList;
