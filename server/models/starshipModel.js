import mongoose from 'mongoose';

const starshipSchema = mongoose.Schema(
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
		starship_model: String,
		image: String,
		cost_in_credits: String,
		length: String,
		max_atmosphering_speed: String,
		crew: String,
		passengers: String,
		cargo_capacity: String,
		consumables: String,
		hyperdrive_rating: String,
		MGLT: String,
		starship_class: String,
		manufacturer: Array,
		pilots: Array,
		relatedFilms: Array,
		designer: Array,
		roles: Array,
		affiliation: Array,
		classification: String,
		height_depth: String,
		max_acceleration: String,
		hyperdrive_system: String,
		shielding: String,
		hull: String,
		sensor_systems: String,
		navigation_system: String,
		armament: Array,
		complement: Array,
		docking_bays: String,
		other_systems: Array,
	},
	{
		timestamps: true,
	}
);

const Starship = mongoose.model('Starship', starshipSchema);

export default Starship;
