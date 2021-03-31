import mongoose from 'mongoose';

const speciesSchema = mongoose.Schema(
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
		image: String,
		classification: String,
		designation: String,
		average_height: String,
		average_lifespan: String,
		homeworld: String,
		language: String,
		skin_colors: Array,
		hair_colors: Array,
		eye_colors: Array,
		people: Array,
		films: Array,
	},
	{
		timestamps: true,
	}
);

const Species = mongoose.model('Species', speciesSchema);

export default Species;
