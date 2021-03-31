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
			history.push('/users/login');
		}

		if (successCreate) {
			history.push(`/admin/species/${createdSpecies._id}/edit`);
		} else {
			dispatch(listSpecies());
		}
	}, [
		dispatch,
		history,
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
		<>
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
										{/* <TableCell align='center'>{species._id}</TableCell> */}
										<TableCell align='center'>{species.name}</TableCell>
										<TableCell align='center'>{species.homeworld}</TableCell>
										<TableCell align='center'>{species.language}</TableCell>

										<TableCell align='center'>
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
		</>
	);
};

export default SpeciesList;
