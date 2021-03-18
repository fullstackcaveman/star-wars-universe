import { Alert } from '@material-ui/lab';

const Message = ({ severity, message }) => {
	return (
		<Alert variant='filled' severity={severity} message={message}>
			{message}
		</Alert>
	);
};

Message.defaultProps = {
	severity: 'info',
	message: 'Alert',
};

export default Message;
