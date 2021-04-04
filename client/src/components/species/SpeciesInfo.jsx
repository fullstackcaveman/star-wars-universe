import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Background from '../elements/Background';
// import RelatedFilms from '../films/RelatedFilms';

import { listSpeciesInfo } from '../../actions/speciesActions';

const SpeciesInfo = ({ match }) => {
	const dispatch = useDispatch();

	const speciesInfo = useSelector((state) => state.speciesInfo);
	const { loading, error, species } = speciesInfo;

	const {
		name,
		image,
		classification,
		designation,
		average_height,
		average_lifespan,
		homeworld,
		language,
		skin_colors,
		hair_colors,
		eye_colors,
		people,
		films,
	} = species;

	document.title = `Star Wars | ${species.name}`;

	useEffect(() => {
		dispatch(listSpeciesInfo(match.params.id));
	}, [match, dispatch]);

	return (
		<>
			<div className='info-container'>
				{loading ? (
					<Loader />
				) : error ? (
					<Message severity='error' message={error} />
				) : (
					<>
						<Card className='info-card'>
							<div className='flex'>
								<CardMedia component='img' alt={name} image={image} />
								<CardContent className='card-data'>
									<div>
										<Typography component='h1'>{name}</Typography>
									</div>
									<div className='info-blocks'>
										<div className='left-info'>
											{!classification ? (
												<Typography component='h3'>
													Classification: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Classification: ${classification}`}</Typography>
											)}

											{!designation ? (
												<Typography component='h3'>
													Designation: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Designation: ${designation}`}</Typography>
											)}

											{!language ? (
												<Typography component='h3'>
													Language: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Language: ${language}`}</Typography>
											)}

											{!homeworld ? (
												<Typography component='h3'>
													Homeworld: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Homeworld: ${homeworld}`}</Typography>
											)}

											{!average_lifespan ? (
												<Typography component='h3'>
													Avg Lifespan: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Avg Lifespan: ${average_lifespan} years`}</Typography>
											)}

											{!average_height ? null : (
												<Typography component='h3'>{`Avg Height: ${average_height} cm`}</Typography>
											)}
										</div>

										<div className='right-info'>
											{hair_colors.length !== 0 ? (
												<div className='info-array-container'>
													<Typography component='h3'>Hair Color(s):</Typography>
													<Typography component='p' className='info-array'>
														{hair_colors.map((color) => (
															<span key={color}>{`${color}`}</span>
														))}
													</Typography>
												</div>
											) : null}

											{skin_colors.length !== 0 ? (
												<div className='info-array-container'>
													<Typography component='h3'>Skin Color(s):</Typography>
													<Typography component='p' className='info-array'>
														{skin_colors.map((color) => (
															<span key={color}>{`${color}`}</span>
														))}
													</Typography>
												</div>
											) : null}

											{eye_colors.length !== 0 ? (
												<div className='info-array-container'>
													<Typography component='h3'>Eye Color(s):</Typography>
													<Typography component='p' className='info-array'>
														{eye_colors.map((color) => (
															<span key={color}>{`${color}`}</span>
														))}
													</Typography>
												</div>
											) : null}
										</div>
									</div>
								</CardContent>
							</div>
						</Card>
						<div className='flex'>{/* <RelatedFilms /> */}</div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default SpeciesInfo;