import { Typography } from '@material-ui/core';

const InfoArrayContainer = (props) => {
	const { infoClick, arr, baseModel, model, addClass } = props;

	return (
		<Typography component='h3'>
			{model}(s):{' '}
			{(arr || []).map((item) => {
				return (
					<span
						className={addClass}
						key={item}
						model={baseModel}
						query={item}
						onClick={infoClick}
					>
						{item}
					</span>
				);
			})}
		</Typography>
	);
};

export default InfoArrayContainer;
