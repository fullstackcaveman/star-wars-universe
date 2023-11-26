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
	listSpecies,
	deleteSpecies,
	createSpecies,
} from '../../actions/speciesActions';
import { SPECIES_CREATE_RESET } from '../../constants/speciesConstants';

const SpeciesList = ({ history, match }) => {
	document.title = 'Star Wars | Species List';
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const speciesList = useSelector((state) => state.speciesList);
	const { loading, error, species } = speciesList;

	const speciesDelete = useSelector((state) => state.speciesDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = speciesDelete;

	const speciesCreate = useSelector((state) => state.speciesCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		species: createdSpecies,
	} = speciesCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: SPECIES_CREATE_RESET });

		if (!userInfo.isAdmin) {
			navigate('/users/login');
		}

		if (successCreate) {
			navigate(`/admin/species/${createdSpecies._id}/edit`);
		} else {
			dispatch(listSpecies());
		}
	}, [
		dispatch,
		navigate,
		userInfo,
		successDelete,
		successCreate,
		createdSpecies,
	]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteSpecies(id));
		}
	};

	const createSpeciesHandler = () => {
		dispatch(createSpecies());
	};

	return (
		<div className='edit-table'>
			<Button
				style={{ marginBottom: '10px' }}
				variant='contained'
				color='primary'
				onClick={createSpeciesHandler}
			>
				<AddIcon /> Create Species
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
								<TableCell align='center'>SPECIES</TableCell>
								<TableCell align='center'>HOMEWORLD</TableCell>
								<TableCell align='center'>LANGUAGE</TableCell>
								<TableCell align='center'></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{species.map((species) => {
								return (
									<TableRow key={species._id}>
										<TableCell align='center'>{species.name}</TableCell>
										<TableCell align='center'>{species.homeworld}</TableCell>
										<TableCell align='center'>{species.language}</TableCell>

										<TableCell align='center'>
											<NavLink to={`/species/info/${species.pretty_url}`}>
												<Button variant='contained' size='small'>
													<OpenInBrowserIcon />
												</Button>
											</NavLink>
											<NavLink to={`/admin/species/${species._id}/edit`}>
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
												onClick={() => deleteHandler(species._id)}
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

export default SpeciesList;
