const ItemCard = ({ item }) => {
	return (
		<li
			key={item._id}
			className='col-span-1 flex flex-col divide-y rounded-lg text-center border-solid border-yellow-300 border-2 h-64 w-48'
		>
			<div className='flex flex-1 flex-col p-4'>
				<img
					className='mx-auto h-32 w-32 flex-shrink-0 rounded-full'
					src={item.image}
					alt={item.name}
				/>
				<h3 className='mt-6 text-lg font-medium text-yellow-300'>
					{item.name}
				</h3>
			</div>
		</li>
	);
};

export default ItemCard;
