import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
	list: {
		width: 200,
	},
	fullList: {
		width: 'auto',
	},
});

const Header = () => {
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
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<header id='header' className='header'>
			<div className='header-left'>{/* <h1>HEADER</h1> */}</div>
			<div className='nav-btn'>
				<Link to='/'>
					<button>Home</button>
				</Link>
				{userInfo ? (
					<div key={anchor}>
						<div>
							<Avatar
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
						<button>Login</button>
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
