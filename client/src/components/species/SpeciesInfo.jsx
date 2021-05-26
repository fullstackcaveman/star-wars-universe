import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Typography,
	Card,
	CardMedia,
	CardContent,
	Button,
} from '@material-ui/core';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Background from '../elements/Background';

import {
	listSpeciesInfo,
	listSpeciesInfoByName,
} from '../../actions/speciesActions';
import { NavLink } from 'react-router-dom';
import { useLinkBuilder } from '../../hooks/useLinkBuilder';
import InfoArrayContainer from '../elements/InfoArrayContainer';
import RelatedItems from '../elements/RelatedItems';

const SpeciesInfo = ({ match, history }) => {
	const [loading, setLoading] = useState();
	const dispatch = useDispatch();

	useEffect(() => {
		if (match.params.id) {
			dispatch(listSpeciesInfo(match.params.id));
		} else {
			dispatch(listSpeciesInfoByName(match.params.pretty_url));
		}
		setTimeout(() => setLoading(speciesLoader), 1000);
		// eslint-disable-next-line
	}, [match, dispatch]);

	const checked = useSelector((state) => state.adminShowEditBtn);
	const { adminShowEditBtn } = checked;

	const speciesInfo = useSelector((state) => state.speciesInfo);
	const { loading: speciesLoader, error, species } = speciesInfo;

	const allCharacters = useSelector((state) => state.characterList);
	const { characters } = allCharacters;

	const allFilms = useSelector((state) => state.filmList);
	const { films: filmography } = allFilms;

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

	// eslint-disable-next-line
	const [value, handleBuildLink, handleInfoClick] = useLinkBuilder();

	const infoClick = (e) => {
		const model = e.target.attributes.model.value;
		const query = e.target.attributes.query.value;
		handleInfoClick(model, query);
	};

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
											{classification === undefined ||
											classification.length === 0 ? null : (
												<Typography component='h3'>
													{`Classification: ${classification}`}
												</Typography>
											)}

											{designation === undefined ||
											designation.length === 0 ? null : (
												<Typography component='h3'>
													{`Designation: ${designation}`}
												</Typography>
											)}

											{language === undefined || language === 0 ? null : (
												<Typography component='h3'>
													{`Language: ${language}`}
												</Typography>
											)}

											{homeworld === undefined ||
											homeworld.length === 0 ? null : (
												<Typography component='h3'>
													Homeworld(s):{' '}
													<span
														model='planets'
														query={homeworld}
														onClick={infoClick}
													>
														{homeworld}
													</span>
												</Typography>
											)}

											{average_lifespan === undefined ||
											average_lifespan.length === 0 ? null : (
												<Typography component='h3'>
													{`Avg Lifespan: ${average_lifespan}`}
													<span className='small-text'>years</span>
												</Typography>
											)}

											{average_height === undefined ||
											average_height.length === 0 ? null : (
												<Typography component='h3'>
													{`Avg Height: ${average_height}`}
													<span className='small-text'>cm</span>
												</Typography>
											)}
										</div>

										<div className='right-info'>
											{hair_colors === undefined ||
											hair_colors.length === 0 ? null : (
												<div className='info-array-container'>
													<InfoArrayContainer
														addClass='info-array no-links'
														model={'Hair Color'}
														arr={hair_colors}
													/>
												</div>
											)}

											{skin_colors === undefined ||
											skin_colors.length === 0 ? null : (
												<div className='info-array-container'>
													<InfoArrayContainer
														addClass='info-array no-links'
														model={'Skin Color'}
														arr={skin_colors}
													/>
												</div>
											)}

											{eye_colors === undefined ||
											eye_colors.length === 0 ? null : (
												<div className='info-array-container'>
													<InfoArrayContainer
														addClass='info-array no-links'
														model={'Eye Color'}
														arr={eye_colors}
													/>
												</div>
											)}
										</div>
									</div>

									{adminShowEditBtn ? (
										<NavLink to={`/admin/species/${species._id}/edit`}>
											<Button
												variant='contained'
												color='secondary'
												size='small'
												style={{ width: '50px' }}
											>
												EDIT
											</Button>
										</NavLink>
									) : null}
								</CardContent>
							</div>
						</Card>
						<div className='flex'>
							{films === undefined || films.length === 0 ? null : (
								<div className='flex'>
									<RelatedItems
										items={films}
										related={filmography}
										model='Films'
										handleInfoClick={handleInfoClick}
									/>
								</div>
							)}

							{people === undefined || people.length === 0 ? null : (
								<div className='flex'>
									<RelatedItems
										items={people}
										related={characters}
										model='Characters'
										handleInfoClick={handleInfoClick}
									/>
								</div>
							)}
						</div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default SpeciesInfo;
