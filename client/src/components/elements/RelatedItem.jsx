import { NavLink } from 'react-router-dom';

const RelatedItem = ({ related, item, model, handleInfoClick }) => {
	const itemInfo = related.filter(
		(thing) => thing.title === item || thing.name === item
	);

	const modelLower = model.toLowerCase();

	if (itemInfo.length) {
		return (
			<NavLink to={`/${modelLower}/info/${itemInfo[0].pretty_url}`}>
				<div id={model} className='relatedItem-container'>
					<img src={itemInfo[0].image} alt={item} />
					<h2>{item}</h2>
				</div>
			</NavLink>
		);
	}
};

export default RelatedItem;
