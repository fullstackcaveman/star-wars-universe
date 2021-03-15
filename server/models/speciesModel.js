import mongoose from 'mongoose';

const speciesSchema = mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		classification: String,
		designation: String,
		average_height: String,
		skin_colors: Array,
		hair_colors: Array,
		eye_colors: Array,
		average_lifespan: String,
		homeworld: String,
		language: String,
		people: Array,
		films: Array,
		url: String,
	},
	{
		timestamps: true,
	}
);

const Species = mongoose.model('Species', speciesSchema);

export default Species;
