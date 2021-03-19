import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Button, Divider, Typography } from '@material-ui/core';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { logout } from '../../actions/userActions';

const useStyles = makeStyles({
	list: {
		width: 200,
	},
	fullList: {
		width: 'auto',
	},
});

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const anchor = 'right';

	const toggleDrawer = (openState) => (e) => {
		if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
			return;
		}

		setOpen(openState);
	};

	const history = useHistory();

	const handleClick = (route) => {
		if (route === 'home') {
			history.push('/');
		} else if (route === 'profile') {
			history.push('/users/profile');
		} else if (route === 'users') {
			history.push('/admin/userlist');
		} else if (route === 'characters') {
			history.push('/admin/characterlist');
		}
	};

	const logoutHandler = () => {
		dispatch(logout());
	};

	const list = () => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role='presentation'
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				<ListItem>
					<Button
						fullWidth
						variant='contained'
						onClick={() => handleClick('home')}
					>
						<Typography>Home</Typography>
					</Button>
				</ListItem>

				<ListItem>
					<Button
						fullWidth
						variant='contained'
						onClick={() => handleClick('profile')}
					>
						<Typography>Profile</Typography>
					</Button>
				</ListItem>

				{userInfo && userInfo.isAdmin ? (
					<>
						<Divider />
						<Typography>ADMIN</Typography>
						<ListItem>
							<Button
								fullWidth
								variant='contained'
								onClick={() => handleClick('users')}
							>
								<Typography>Users</Typography>
							</Button>
						</ListItem>

						<ListItem>
							<Button
								fullWidth
								variant='contained'
								onClick={() => handleClick('characters')}
							>
								<Typography>Characters</Typography>
							</Button>
						</ListItem>

						<ListItem>
							<Button
								fullWidth
								variant='contained'
								onClick={() => handleClick('films')}
							>
								<Typography>Films</Typography>
							</Button>
						</ListItem>

						<ListItem>
							<Button
								fullWidth
								variant='contained'
								onClick={() => handleClick('planets')}
							>
								<Typography>Planets</Typography>
							</Button>
						</ListItem>
					</>
				) : null}

				<Divider />

				<ListItem>
					<Button fullWidth variant='contained' onClick={logoutHandler}>
						<Typography>Log Out</Typography>
					</Button>
				</ListItem>
			</List>
		</div>
	);

	const avatarStyle = {
		backgroundColor: '#ffee58',
		marginBottom: 10,
		color: 'black',
		height: '30px',
		width: '30px',
		cursor: 'pointer',
	};

	return (
		<header id='header' className='header'>
			<div className='header-left'>{/* <h1>HEADER</h1> */}</div>
			<div className='nav-btn'>
				{userInfo ? (
					<div key={anchor}>
						<div>
							<Avatar
								style={avatarStyle}
								alt={userInfo.name}
								src='../images/DarthVader.jpg'
								id='user-avatar'
								onClick={toggleDrawer(true)}
							></Avatar>
							<Drawer anchor={anchor} open={open} onClose={toggleDrawer(false)}>
								{list('right')}
							</Drawer>
						</div>
					</div>
				) : (
					<Link to='/users/login'>
						<Button variant='contained' size='small'>
							Login
						</Button>
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
