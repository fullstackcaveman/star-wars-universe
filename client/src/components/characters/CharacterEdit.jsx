import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { listCharacterInfo } from '../../actions/characterActions';

const CharacterEdit = ({ match, history }) => {
	const characterId = match.params.id;

	const [name, setName] = useState('');
	const [pretty_url, setPretty_url] = useState('');
	const [height, setHeight] = useState('');
	const [mass, setMass] = useState('');
	const [gender, setGender] = useState('');
	const [homeworld, setHomeworld] = useState([]);
	const [wiki, setWiki] = useState('');
	const [image, setImage] = useState('');
	const [born, setBorn] = useState('');
	const [bornLocation, setBornLocation] = useState('');
	const [died, setDied] = useState('');
	const [diedLocation, setDiedLocation] = useState('');
	const [species, setSpecies] = useState('');
	const [hairColor, setHairColor] = useState('');
	const [eyeColor, setEyeColor] = useState('');
	const [skinColor, setSkinColor] = useState('');
	const [cybernetics, setCybernetics] = useState([]);
	const [affiliations, setAffiliations] = useState([]);
	const [masters, setMasters] = useState([]);
	const [apprentices, setApprentices] = useState([]);
	const [formerAffiliations, setFormerAffiliations] = useState([]);
	const [relatedPlanets, setRelatedPlanets] = useState([]);
	const [relatedStarships, setRelatedStarships] = useState([]);
	const [relatedVehicles, setRelatedVehicles] = useState([]);
	const [relatedFilms, setRelatedFilms] = useState([]);

	// const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const characterInfo = useSelector((state) => state.characterInfo);
	const { loading, error, character } = characterInfo;

	useEffect(() => {
		if (!character.name || character._id !== characterId) {
			dispatch(listCharacterInfo(characterId));
		} else {
			setName(character.name);
			setPretty_url(character.pretty_url);
			setHeight(character.height);
			setMass(character.mass);
			setGender(character.gender);
			setHomeworld(character.homeworld);
			setWiki(character.wiki);
			setImage(character.image);
			setBorn(character.born);
			setBornLocation(character.bornLocation);
			setDied(character.died);
			setDiedLocation(character.diedLocation);
			setSpecies(character.species);
			setHairColor(character.hairColor);
			setEyeColor(character.eyeColor);
			setSkinColor(character.skinColor);
			setCybernetics(character.cybernetics);
			setAffiliations(character.affiliations);
			setMasters(character.masters);
			setApprentices(character.apprentices);
			setFormerAffiliations(character.formerAffiliations);
			setRelatedPlanets(character.relatedPlanets);
			setRelatedStarships(character.relatedStarships);
			setRelatedVehicles(character.relatedVehicles);
			setRelatedFilms(character.relatedFilms);
		}
	}, [character, characterId, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		// Update Character
	};

	const paperStyle = {
		// backgroundColor: 'black',
		padding: 20,
		height: 'auto',
		width: 250,
		margin: '20px auto',
	};

	const avatarStyle = { backgroundColor: '#ffee58', marginBottom: 10 };

	const inputStyle = {
		margin: '5px auto',
	};

	const submitBtnStyle = {
		marginTop: '10px',
		marginBottom: '20px',
		backgroundColor: '#ffee58',

		color: 'rgb(3, 53, 50)',
		fontFamily: 'Impact, sans-serif',
		fontSize: '1rem',
	};

	return (
		<>
			<Grid className='add-user'>
				<Paper elevation={10} style={paperStyle}>
					<Grid align='center'>
						<Avatar style={avatarStyle} />
						<Typography variant='h5' id='add-user-h2'>
							{`Edit ${character.name}`}
						</Typography>
					</Grid>
					{loading ? (
						<Loader />
					) : error ? (
						<Message severity='error' message={error} />
					) : (
						<form onSubmit={submitHandler}>
							<TextField
								style={inputStyle}
								label='Name'
								placeholder='Enter User Name'
								variant='outlined'
								size='small'
								fullWidth
								name='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Pretty URL'
								placeholder='Enter Pretty URL'
								variant='outlined'
								size='small'
								fullWidth
								name='pretty_url'
								value={pretty_url}
								onChange={(e) => setPretty_url(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Height'
								placeholder='Enter Height'
								variant='outlined'
								size='small'
								fullWidth
								name='height'
								value={height}
								onChange={(e) => setHeight(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Mass'
								placeholder='Enter Mass'
								variant='outlined'
								size='small'
								fullWidth
								name='mass'
								value={mass}
								onChange={(e) => setMass(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Gender'
								placeholder='Enter Gender'
								variant='outlined'
								size='small'
								fullWidth
								name='gender'
								value={gender}
								onChange={(e) => setGender(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Homeworld'
								placeholder='Enter Homeworld'
								variant='outlined'
								size='small'
								fullWidth
								name='homeworld'
								value={homeworld}
								onChange={(e) => setHomeworld(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Wiki'
								placeholder='Enter Wiki'
								variant='outlined'
								size='small'
								fullWidth
								name='wiki'
								value={wiki}
								onChange={(e) => setWiki(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Image'
								placeholder='Enter Image'
								variant='outlined'
								size='small'
								fullWidth
								name='image'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Born'
								placeholder='Enter Born Year'
								variant='outlined'
								size='small'
								fullWidth
								name='born'
								value={born}
								onChange={(e) => setBorn(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Born Location'
								placeholder='Enter Born Location'
								variant='outlined'
								size='small'
								fullWidth
								name='bornLocation'
								value={bornLocation}
								onChange={(e) => setBornLocation(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Died'
								placeholder='Enter Died Year'
								variant='outlined'
								size='small'
								fullWidth
								name='died'
								value={died}
								onChange={(e) => setDied(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Died Location'
								placeholder='Enter Died Location'
								variant='outlined'
								size='small'
								fullWidth
								name='diedLocation'
								value={diedLocation}
								onChange={(e) => setDiedLocation(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Species'
								placeholder='Enter Species'
								variant='outlined'
								size='small'
								fullWidth
								name='species'
								value={species}
								onChange={(e) => setSpecies(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Hair Color'
								placeholder='Enter Hair Color'
								variant='outlined'
								size='small'
								fullWidth
								name='hairColor'
								value={hairColor}
								onChange={(e) => setHairColor(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Eye Color'
								placeholder='Enter Eye Color'
								variant='outlined'
								size='small'
								fullWidth
								name='eyeColor'
								value={eyeColor}
								onChange={(e) => setEyeColor(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Skin Color'
								placeholder='Enter Skin Color'
								variant='outlined'
								size='small'
								fullWidth
								name='skinColor'
								value={skinColor}
								onChange={(e) => setSkinColor(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Cybernetics'
								placeholder='Enter Cybernetics'
								variant='outlined'
								size='small'
								fullWidth
								name='cybernetics'
								value={cybernetics}
								onChange={(e) => setCybernetics(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Affiliations'
								placeholder='Enter Affiliations'
								variant='outlined'
								size='small'
								fullWidth
								name='affiliations'
								value={affiliations}
								onChange={(e) => setAffiliations(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Masters'
								placeholder='Enter Masters'
								variant='outlined'
								size='small'
								fullWidth
								name='masters'
								value={masters}
								onChange={(e) => setMasters(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Apprentices'
								placeholder='Enter Apprentices'
								variant='outlined'
								size='small'
								fullWidth
								name='apprentices'
								value={apprentices}
								onChange={(e) => setApprentices(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Former Affiliations'
								placeholder='Enter Former Affiliations'
								variant='outlined'
								size='small'
								fullWidth
								name='formerAffiliations'
								value={formerAffiliations}
								onChange={(e) => setFormerAffiliations(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Related Planets'
								placeholder='Enter Related Planets'
								variant='outlined'
								size='small'
								fullWidth
								name='relatedPlanets'
								value={relatedPlanets}
								onChange={(e) => setRelatedPlanets(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Related Starships'
								placeholder='Enter Related Starships'
								variant='outlined'
								size='small'
								fullWidth
								name='relatedStarships'
								value={relatedStarships}
								onChange={(e) => setRelatedStarships(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Related Vehicles'
								placeholder='Enter Related Vehicles'
								variant='outlined'
								size='small'
								fullWidth
								name='relatedVehicles'
								value={relatedVehicles}
								onChange={(e) => setRelatedVehicles(e.target.value)}
							/>

							<TextField
								style={inputStyle}
								label='Related Films'
								placeholder='Enter Related Films'
								variant='outlined'
								size='small'
								fullWidth
								name='relatedFilms'
								value={relatedFilms}
								onChange={(e) => setRelatedFilms(e.target.value)}
							/>

							<Button
								style={submitBtnStyle}
								type='submit'
								color='primary'
								variant='contained'
								fullWidth
							>
								Update
							</Button>
						</form>
					)}
					<Typography variant='body2'>
						<Link to='/admin/characterList'>CANCEL</Link>
					</Typography>
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default CharacterEdit;
