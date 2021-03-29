import mongoose from 'mongoose';

const characterSchema = mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		pretty_url: {
			type: String,
			unique: true,
		},
		height: String,
		mass: String,
		gender: String,
		wiki: String,
		image: String,
		born: String,
		bornLocation: String,
		died: String,
		diedLocation: String,
		species: String,
		hairColor: String,
		eyeColor: String,
		skinColor: String,
		homeworld: Array,
		cybernetics: Array,
		affiliations: Array,
		masters: Array,
		apprentices: Array,
		formerAffiliations: Array,
		relatedPlanets: Array,
		relatedStarships: Array,
		relatedVehicles: Array,
		relatedFilms: Array,
	},
	{
		timestamps: true,
	}
);

const Character = mongoose.model('Character', characterSchema);

export default Character;
