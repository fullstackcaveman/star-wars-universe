import mongoose from 'mongoose';

const planetSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		pretty_url: {
			type: String,
			unique: true,
		},
		image: String,
		rotation_period: String,
		orbital_period: String,
		diameter: String,
		surface_water: String,
		population: String,
		distance_from_core: String,
		classification: String,
		atmosphere: String,
		region: String,
		sector: String,
		system: String,
		grid_coords: String,
		suns: Array,
		moons: Array,
		trade_routes: Array,
		points_of_interest: Array,
		flora: Array,
		fauna: Array,
		native_species: Array,
		immigrated_species: Array,
		primary_languages: Array,
		major_cities: Array,
		major_imports: Array,
		major_exports: Array,
		affiliations: Array,
		climate: Array,
		gravity: Array,
		terrain: Array,
		residents: Array,
		relatedFilms: Array,
		suns: Array,
	},
	{
		timestamps: true,
	}
);

const Planet = mongoose.model('Planet', planetSchema);

export default Planet;
