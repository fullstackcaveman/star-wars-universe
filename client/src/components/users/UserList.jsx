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
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { listUsers, deleteUser } from '../../actions/userActions';

const UserList = ({ history }) => {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push('/users/login');
		}
	}, [dispatch, history, userInfo, successDelete]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<div className='edit-table'>
			<h2>Users</h2>
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<TableContainer component={Paper}>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell align='center'>ID</TableCell>
								<TableCell align='center'>NAME</TableCell>
								<TableCell align='center'>EMAIL</TableCell>
								<TableCell align='center'>ADMIN</TableCell>
								<TableCell align='center'></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) => {
								return (
									<TableRow key={user._id}>
										<TableCell align='center'>{user._id}</TableCell>
										<TableCell align='center'>{user.name}</TableCell>
										<TableCell align='center'>
											<a href={`mailto:${user.email}`}>{user.email}</a>
										</TableCell>
										<TableCell align='center'>
											{user.isAdmin ? <CheckIcon /> : <ClearIcon />}
										</TableCell>
										<TableCell align='center'>
											<NavLink to={`/admin/user/${user._id}/edit`}>
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
												onClick={() => deleteHandler(user._id)}
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

export default UserList;
