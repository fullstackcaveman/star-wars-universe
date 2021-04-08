import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema(
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
		image: String,
		model: String,
		cost_in_credits: String,
		length: String,
		max_atmosphering_speed: String,
		crew: String,
		passengers: String,
		cargo_capacity: String,
		consumables: String,
		vehicle_class: String,
		manufacturer: Array,
		pilots: Array,
		films: Array,
	},
	{
		timestamps: true,
	}
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
