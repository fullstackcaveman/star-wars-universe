import mongoose from 'mongoose';

const filmSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		pretty_url: {
			type: String,
			// required: true,
			unique: true,
		},
		episode_id: String,
		opening_crawl: String,
		director: String,
		producer: Array,
		release_date: String,
		characters: Array,
		planets: Array,
		starships: Array,
		vehicles: Array,
		species: Array,
		url: String,
	},
	{
		timestamps: true,
	}
);

const Film = mongoose.model('Film', filmSchema);

export default Film;
