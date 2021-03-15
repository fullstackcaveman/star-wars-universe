import { Alert } from '@material-ui/lab';

const Message = ({ severity, message }) => {
	return <Alert severity={severity}>{message}</Alert>;
};

Message.defaultProps = {
	severity: 'info',
};

export default Message;
