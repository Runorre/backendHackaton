import { Schema, Types, model } from 'mongoose';


const EventSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type :String,
        default : "",
    },
    room : {
        type : Types.ObjectId,
        ref : 'Room'
    },
    createdBy : {
        type : Types.ObjectId,
        ref : 'User'
    },
    eventValidated : {
        type : Boolean,
        default : false
    },
    listSigned : [{
        user : {
            type : Types.ObjectId,
            ref : 'User'
        },
        signed: {
            type : Boolean,
            default : false
        }
    }],
    dateStart : {
        type : Date,
        required : true
    },
    dateEnd : {
        type : Date,
        required : true
    },
}, {
    collection: 'Event',
    timestamps: true
});

const Event = model('Event', EventSchema);

export default Event;