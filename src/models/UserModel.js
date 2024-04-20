import { Schema, Types, model } from 'mongoose';

export const UserSchema = new Schema({
	name: {
		first: {
			type: String,
			trim: true,
			minLength: [3],
			maxLength: [15],
			required: [true],
		},
		last: {
			type: String,
			trim: true,
			minLength: [3],
			maxLength: [15],
			required: [true],
		}
	},
	role: {
		type: String,
		default: "USER",
	},
	email: {
		address: {
            type: String,
            trim: true,
			lowercase: true,
			unique: true,
			required: false,
        },
		isVerified: {
            type: Boolean,
			default: false
        }
	},
	password: {
		type: String,
		minLength: [8],
		required: [true]
	}
}, {
	collection: 'users',
	timestamps: true,
});

export default UserSchema;