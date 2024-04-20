import { Schema, Types, model } from 'mongoose';

export const UserSchema = new Schema({
	name: {
		first: {
			type: String,
			trim: true,
			minLength: [3],
			maxLength: [50],
			required: [true],
		},
		last: {
			type: String,
			trim: true,
			minLength: [3],
			maxLength: [50],
			required: [true],
		}
	},
	role: {
		type: String,
		default: "USER",
	},
	email: {address : {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true,
	}},
	password: {
		type: String,
		minLength: [8],
		required: [true]
	}
}, {
	collection: 'users',
	timestamps: true,
});

const User = model('User', UserSchema);

export default User;