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
		model: String,
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
		films: Array,
	},
	{
		timestamps: true,
	}
);

const Starship = mongoose.model('Starship', starshipSchema);

export default Starship;
