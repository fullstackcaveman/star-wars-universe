import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import Loader from './Loader';

const Items = ({ items, model, loading }) => {
	document.title = `Star Wars ${model}`;
	const modelLower = model.toLowerCase();

	if (loading) {
		return <Loader />;
	}

	return (
		<ul className='grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center'>
			{items.map((item) => {
				return (
					<Link to={`/${modelLower}/info/${item.pretty_url}`} key={item._id}>
						<ItemCard item={item} loading={loading} />
					</Link>
				);
			})}
		</ul>
	);
};

export default Items;
