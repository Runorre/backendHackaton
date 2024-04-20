import { Schema, Types, model } from 'mongoose';

export const SalleSchema = new Schema({
    name : {
        type: String,
        minLenght: [3],
        required: [true]
    },
    capacity: {
        type: Number,
        required: [true]
    },
    usable: {
        type: Boolean,
        default: false
    }
} , {
    collection: 'salles',
    timestamps: true
});

const Salle = model('Salle', SalleSchema);

export default Salle;