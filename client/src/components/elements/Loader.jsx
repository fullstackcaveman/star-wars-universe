import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
	return (
		<div className='loader'>
			<CircularProgress className='progress' />
		</div>
	);
}
