import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		model: String,
		maunfacturer: Array,
		cost_in_credits: String,
		length: String,
		max_atmosphering_speed: String,
		crew: String,
		passengers: String,
		cargo_capacity: String,
		consumables: String,
		vehicle_class: String,
		pilots: Array,
		films: Array,
		url: String,
	},
	{
		timestamps: true,
	}
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;