import { TextField } from '@material-ui/core';

const inputStyle = {
	margin: '5px auto',
};

export const InputBuilder = (props) => {
	const { value, field, setInput } = props;
	const fieldLower = field.toLowerCase();

	const whatSent = (e) => {
		setInput(e.target);
	};

	return (
		<TextField
			style={inputStyle}
			label={`${field}`}
			placeholder={`Enter ${field}`}
			variant='outlined'
			size='small'
			fullWidth
			required
			name={`${fieldLower}`}
			value={value || ''}
			onChange={whatSent}
		/>
	);
};
