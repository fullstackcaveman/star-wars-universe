const RelatedItem = ({ related, item, handleInfoClick }) => {
	const itemInfo = related.filter((thing) => thing.name === item);

	const handleClick = () => {
		handleInfoClick('starships', itemInfo[0].name);
	};

	return (
		<div className='relatedItem-container' onClick={handleClick}>
			<img src={itemInfo[0].image} alt={item} />
			<h2>{item}</h2>
		</div>
	);
};

export default RelatedItem;
