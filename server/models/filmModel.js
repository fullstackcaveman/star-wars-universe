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
			unique: true,
		},
		episode_id: String,
		opening_crawl: String,
		director: String,
		release_date: String,
		image: String,
		characters: Array,
		producer: Array,
		planets: Array,
		starships: Array,
		vehicles: Array,
		species: Array,
	},
	{
		timestamps: true,
	}
);

const Film = mongoose.model('Film', filmSchema);

export default Film;
