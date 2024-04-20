import { Schema, Types, model } from 'mongoose';


export const TokenSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true]
    },
    token: {
        type: String,
        required: [true]
    }
}, {
    collection: 'tokens',
    timestamps: true
});

export default TokenSchema;