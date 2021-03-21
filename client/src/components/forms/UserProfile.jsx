import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';

const UserProfile = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	useEffect(() => {
		if (!userInfo) {
			history.push('/users/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(user.name);
				setEmail(user.email);
				setPassword(user.password);
				setConfirmPassword(user.confirmPassword);
			}
		}
	}, [history, userInfo, dispatch, user]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
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

	return (
		<>
			<Grid className='add-user'>
				<Paper elevation={10} style={paperStyle}>
					<Grid align='center'>
						<Avatar style={avatarStyle} />
						<Typography variant='h5' id='add-user-h2'>
							User Profile
						</Typography>
					</Grid>
					{message && <Message severity='error' message={message} />}
					{error && <Message severity='error' message={error} />}
					{success && <Message severity='info' message='Profile Updated' />}
					{loading && <Loader />}
					<form onSubmit={submitHandler}>
						<TextField
							style={inputStyle}
							label='Name'
							placeholder='Enter User Name'
							variant='outlined'
							size='small'
							fullWidth
							name='name'
							value={name || ''}
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
							value={email || ''}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<TextField
							style={inputStyle}
							label='Password'
							placeholder='Enter Password'
							variant='outlined'
							size='small'
							fullWidth
							name='password'
							type='password'
							value={password || ''}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<TextField
							style={inputStyle}
							label='Confirm Password'
							placeholder='Confirm Password'
							variant='outlined'
							size='small'
							fullWidth
							name='confirmPassword'
							type='password'
							value={confirmPassword || ''}
							onChange={(e) => setConfirmPassword(e.target.value)}
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
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default UserProfile;
