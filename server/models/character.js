import mongoose from 'mongoose';

const characterSchema = mongoose.Schema(
	{
		_id: {
			type: String,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			unique: true,
		},
		height: {
			type: Number,
			required: true,
		},
		mass: {
			type: Number,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		homeworld: {
			type: String,
			required: true,
		},
		wiki: String,
		image: String,
		born: {
			type: String,
			required: true,
		},
		bornLocation: {
			type: String,
			require: true,
		},
		died: {
			type: String,
			required: true,
		},
		diedLocation: {
			type: String,
			required: true,
		},
		species: {
			type: String,
			required: true,
		},
		hairColor: String,
		eyeColor: String,
		skinColor: String,
		cybernetics: String,
		affiliations: [],
		masters: [],
		apprentices: [],
		formerAffiliations: [],
	},
	{
		timestamps: true,
	}
);

const Character = mongoose.model('Character', characterSchema);

export default Character;
