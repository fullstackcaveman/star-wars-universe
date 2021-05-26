import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const InfoArrayContainer = (props) => {
	const { arr, baseModel, model, addClass } = props;

	return (
		<Typography component='h3'>
			{model}(s):{' '}
			{(arr || []).map((item) => {
				const lowerLink = item.toLowerCase();
				const interim = lowerLink.replace("'", '-');
				const route = interim.split(' ').join('-');

				return addClass === 'info-array' ? (
					<NavLink to={`/${baseModel}/info/${route}`} key={item}>
						<span className={addClass} model={baseModel} query={item}>
							{item}
						</span>
					</NavLink>
				) : (
					<span className={addClass} key={item} model={baseModel} query={item}>
						{item}
					</span>
				);
			})}
		</Typography>
	);
};

export default InfoArrayContainer;
