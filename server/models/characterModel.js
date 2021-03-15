import mongoose from 'mongoose';

const characterSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		pretty_url: {
			type: String,
			// required: true,
			unique: true,
		},
		height: {
			type: String,
			// required: true,
		},
		mass: {
			type: String,
			// required: true,
		},
		gender: {
			type: String,
			// required: true,
		},
		homeworld: {
			type: Array,
			// required: true,
		},
		wiki: String,
		image: String,
		born: {
			type: String,
			// required: true,
		},
		bornLocation: {
			type: String,
			require: true,
		},
		died: {
			type: String,
			// required: true,
		},
		diedLocation: {
			type: String,
			// required: true,
		},
		species: {
			type: String,
			// required: true,
		},
		hairColor: String,
		eyeColor: String,
		skinColor: String,
		cybernetics: Array,
		affiliations: Array,
		masters: Array,
		apprentices: Array,
		formerAffiliations: Array,
	},
	{
		timestamps: true,
	}
);

const Character = mongoose.model('Character', characterSchema);

export default Character;
