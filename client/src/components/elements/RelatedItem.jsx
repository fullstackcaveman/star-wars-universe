const RelatedItem = ({ related, item, model, handleInfoClick }) => {
	const itemInfo = related.filter(
		(thing) => thing.title === item || thing.name === item
	);
	// const modelLower = model.toLowerCase();

	// const handleClick = () => {
	// 	handleInfoClick(modelLower, itemInfo[0].name);
	// };

	// console.log(itemInfo);

	return (
		<div className='relatedItem-container' /*onClick={handleClick}*/>
			<img src={itemInfo[0].image} alt={item} />
			<h2>{item}</h2>
		</div>
	);
};

export default RelatedItem;
