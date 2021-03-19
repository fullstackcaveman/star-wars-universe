import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { getUserDetails } from '../../actions/userActions';

const UserEdit = ({ match, history }) => {
	const userId = match.params.id;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	useEffect(() => {
		if (!user.name || user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user, userId, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
	};

	const paperStyle = {
		// backgroundColor: 'black',
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
			<Link to='/admin/userList'>Go Back</Link>
			<Grid className='add-user'>
				<Paper elevation={10} style={paperStyle}>
					<Grid align='center'>
						<Avatar style={avatarStyle} />
						<Typography variant='h5' id='add-user-h2'>
							Edit User
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
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Email'
								placeholder='Enter User Email'
								variant='outlined'
								size='small'
								fullWidth
								name='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<FormControlLabel
								control={
									<Checkbox
										checked={isAdmin}
										onchange={(e) => setIsAdmin(e.target.checked)}
										name='isAdmin'
										color='primary'
									/>
								}
								label='Is Admin?'
							/>

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
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default UserEdit;
