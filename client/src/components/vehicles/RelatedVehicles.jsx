import RelatedVehicle from './RelatedVehicle';

const RelatedVehicles = ({ vehicles, handleInfoClick }) => {
	return (
		<div className='relatedItems-container'>
			<div className='item-title'>
				<h2>Related Vehicles</h2>
			</div>
			<div className='items'>
				{(vehicles || []).map((vehicle) => {
					return (
						<RelatedVehicle
							key={vehicle}
							vehicle={vehicle}
							handleInfoClick={handleInfoClick}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default RelatedVehicles;
