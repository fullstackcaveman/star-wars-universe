import RelatedItem from './RelatedItem';

// items is an array of related item names
const RelatedItems = ({ items, related, model, handleInfoClick }) => {
	return (
		<div className='relatedItems-container'>
			<div className='item-title'>
				<h2>{`Related ${model}`}</h2>
			</div>
			<div className='items'>
				{(items || []).map((item) => {
					return (
						<RelatedItem
							key={item}
							item={item}
							related={related}
							model={model}
							handleInfoClick={handleInfoClick}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default RelatedItems;
