import mongoose from 'mongoose';

const starshipSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		model: String,
		maunfacturer: String,
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
		pilots: Array,
		films: Array,
		url: String,
	},
	{
		timestamps: true,
	}
);

const Starship = mongoose.model('Starship', starshipSchema);

export default Starship;
