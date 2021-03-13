const Character = (props) => {
	const { name, born, height, hairColor, eyeColor, gender, image } = props;

	const clickHandler = () => {
		const charWrapper = document.getElementById(`${name}`);
		const hide = document.getElementById(`${name}${born}`);
		charWrapper.classList.toggle('expand');
		hide.classList.toggle('hidden');
	};

	return (
		<div id={name} className='character-wrapper'>
			<div className='container'>
				<h2 className='name'>{name}</h2>
				<button
					className='btn btn-primary btn-character'
					onClick={clickHandler}
				>
					Character Info
				</button>
			</div>
			<div id={name + born} className='flex hidden'>
				<div className='row'>
					<img className='image' src={image} alt={name} />
					<div className='info'>
						{born ? (
							<p className='birth'>Birth Year: {born}BBY</p>
						) : (
							<p className='birth'>Birth Year: unknown</p>
						)}

						{height ? <p>Height: {height} m</p> : <p>Height: unknown</p>}

						{hairColor ? (
							<p>Hair Color: {hairColor}</p>
						) : (
							<p>Hair Color: n/a</p>
						)}
						<p>Eye Color: {eyeColor}</p>
						<p>Gender: {gender}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Character;
