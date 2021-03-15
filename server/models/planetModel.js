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
			// required: true,
			unique: true,
		},
		rotation_period: String,
		orbital_period: String,
		diameter: String,
		climate: Array,
		gravity: Array,
		terrain: Array,
		surface_water: String,
		population: String,
		residents: Array,
		films: Array,
		url: String,
	},
	{
		timestamps: true,
	}
);

const Planet = mongoose.model('Planet', planetSchema);

export default Planet;
