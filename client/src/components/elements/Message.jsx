import { Alert } from '@mui/lab';

const Message = ({ severity, message }) => {
	return (
		<Alert variant='filled' severity={severity} message={message}>
			{message}
		</Alert>
	);
};

Message.defaultProps = {
	severity: 'error',
	message: 'Alert',
};

export default Message;
