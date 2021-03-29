import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
	Avatar,
	Button,
	Divider,
	Typography,
	Drawer,
	List,
	ListItem,
	makeStyles,
} from '@material-ui/core';

import clsx from 'clsx';

import { logout } from '../../actions/userActions';

const useStyles = makeStyles({
	list: {
		width: 200,
		backgroundColor: 'black',
	},
	fullList: {
		width: 'auto',
	},
});

const buttonStyles = {
	padding: 0,
	color: 'white',
};

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
		} else if (route === 'films') {
			history.push('/admin/films');
		} else if (route === 'planets') {
			history.push('/admin/planetlist');
		} else if (route === 'species') {
			history.push('/admin/specieslist');
		} else if (route === 'starships') {
			history.push('/admin/starshipslist');
		} else if (route === 'vehicles') {
			history.push('/admin/vehicleslist');
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
			<List className='menu-list'>
				<ListItem>
					{/* <HomeIcon /> */}
					<Button
						style={buttonStyles}
						fullWidth
						onClick={() => handleClick('home')}
					>
						<Typography>Home</Typography>
					</Button>
				</ListItem>

				<ListItem>
					{/* <PersonIcon /> */}
					<Button
						style={buttonStyles}
						fullWidth
						onClick={() => handleClick('profile')}
					>
						<Typography>Profile</Typography>
					</Button>
				</ListItem>
				<Divider style={{ backgroundColor: 'white' }} />

				{userInfo && userInfo.isAdmin ? (
					<>
						<Typography
							style={{
								marginTop: '5px',
								padding: '3px',
								color: '#ffee58',
							}}
						>
							-- ADMIN --
						</Typography>

						<ListItem>
							<Button
								style={buttonStyles}
								fullWidth
								onClick={() => handleClick('characters')}
							>
								<Typography>Characters</Typography>
							</Button>
						</ListItem>

						<ListItem>
							{/* <LocalMoviesIcon /> */}
							<Button
								style={buttonStyles}
								fullWidth
								onClick={() => handleClick('films')}
							>
								<Typography>Films</Typography>
							</Button>
						</ListItem>

						<ListItem>
							{/* <LanguageIcon /> */}
							<Button
								style={buttonStyles}
								fullWidth
								onClick={() => handleClick('planets')}
							>
								<Typography>Planets</Typography>
							</Button>
						</ListItem>

						<ListItem>
							<Button
								style={buttonStyles}
								fullWidth
								onClick={() => handleClick('species')}
							>
								<Typography>Species</Typography>
							</Button>
						</ListItem>

						<ListItem>
							<Button
								style={buttonStyles}
								fullWidth
								onClick={() => handleClick('starships')}
							>
								<Typography>Starships</Typography>
							</Button>
						</ListItem>

						<ListItem>
							{/* <PeopleIcon /> */}
							<Button
								style={buttonStyles}
								fullWidth
								onClick={() => handleClick('users')}
							>
								<Typography>Users</Typography>
							</Button>
						</ListItem>

						<ListItem>
							<Button
								style={buttonStyles}
								fullWidth
								onClick={() => handleClick('vehicles')}
							>
								<Typography>Vehicles</Typography>
							</Button>
						</ListItem>
					</>
				) : null}

				<Divider style={{ backgroundColor: 'white' }} />

				<ListItem>
					<Button style={buttonStyles} fullWidth onClick={logoutHandler}>
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

	const loginStyle = {
		color: '#ffee58',
		border: '1px solid #ffee58',
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
						<Button style={loginStyle} size='small'>
							Login
						</Button>
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
