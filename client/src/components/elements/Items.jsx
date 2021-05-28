import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import Loader from './Loader';

const Items = ({ items, model, loading }) => {
	document.title = `Star Wars ${model}`;

	if (loading) {
		return <Loader />;
	}

	return (
		<div className='characters-wrapper'>
			{items.map((item) => {
				return (
					<Link to={`/${model}/info/${item.pretty_url}`} key={item._id}>
						<ItemCard item={item} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Items;
