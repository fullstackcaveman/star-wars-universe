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
		rotation_period: String,
		orbital_period: String,
		diameter: String,
		surface_water: String,
		population: String,
		climate: Array,
		gravity: Array,
		terrain: Array,
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
