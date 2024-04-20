import { SalleModel, EventModel } from "../models/index.js";

export default {
    bookRoom : async (req, res) => {
        try {
            const {name, roomId, description, dateStart, dateEnd} = req.body;
            if (!name || !roomId || !description || !dateStart || !dateEnd) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                });
            }
            const room = await SalleModel.findById(roomId);
            if (!room) {
                return res.status(404).json({
                    success: false,
                    error: 'Room not found',
                });
            }
            const newEvent = new EventModel({
                name,
                description,
                room: room._id,
                createdBy: res.locals.decoded._id,
                dateStart,
                dateEnd,
            });
            await newEvent.save();
            return res.status(200).json({
                success: true,
                data: newEvent,
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    },
    bookPeriodicalRoom : async (req, res) => {
        try {
            const {name, roomId, description, dateStart, dateEnd, period, nbrTime} = req.body;
            if (!name || !roomId || !description || !dateStart || !dateEnd || !period || !nbrTime) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                });
            }
            const room = await SalleModel.findById(roomId);
            if (!room) {
                return res.status(404).json({
                    success: false,
                    error: 'Room not found',
                });
            }
            const dateConvertStart = new Date(dateStart);
            const dateConvertEnd = new Date(dateEnd);
            let arrayEvent = [];
            for (let i = 0; i < nbrTime; i++) {
                let dateStartNew = new Date(dateConvertStart.getTime());
                dateStartNew.setDate(dateStartNew.getDate() + i * period);
                let dateEndNew = new Date(dateConvertEnd.getTime());
                dateEndNew.setDate(dateEndNew.getDate() + i * period);
                const newEvent = new EventModel({
                    name,
                    description,
                    room: room._id,
                    createdBy: res.locals.decoded._id,
                    dateStart: dateStartNew,
                    dateEnd: dateEndNew,
                });
                await newEvent.save();
                arrayEvent.push(newEvent);
            }
            return res.status(200).json({
                success: true,
                data: arrayEvent,
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    },
    removeEventAdmin : async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                });
            }
            const event = await EventModel.findById(id);
            if (!event) {
                return res.status(404).json({
                    success: false,
                    error: 'Not found',
                });
            }
            await EventModel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                error: 'Event removed',
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    },
    removeEvent : async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                })
            }
            const event = await EventModel.findById(id);
            if (!event) {
                return res.status(404).json({
                    success: false,
                    error: 'Not found',
                })
            }
            if (event.createdBy.toString() != res.locals.decoded._id.toString()) {
                return res.status(401).json({
                    success: false,
                    error: 'Unauthorized',
                })
            }
            await EventModel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                error: 'Event removed',
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    },
    confirmEvent : async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                });
            }
            const event = await EventModel.findById(id);
            if (!event) {
                return res.status(404).json({
                    success: false,
                    error: 'Not found',
                });
            }
            event.eventValidated = true;
            await event.save();
            return res.status(200).json({
                success: true,
                error: 'Event confirmed',
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    },
    getConfirmedEvents : async (req, res) => {
        try {
            const events = await EventModel.find({eventValidated: true});
            return res.status(200).json({
                success: true,
                data: events,
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    },
    modifyAdminEvent : async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, dateStart, dateEnd } = req.body;
            if (!id || !name || !description || !dateStart || !dateEnd) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                });
            }
            const event = await EventModel.findById(id);
            if (!event) {
                return res.status(404).json({
                    success: false,
                    error: 'Event not found',
                });
            }
            event.name = name;
            event.description = description;
            event.dateStart = dateStart;
            event.dateEnd = dateEnd;
            await event.save();
            return res.status(200).json({
                success: true,
                error: 'Event modified',
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    },
    modifyUserEvent : async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, dateStart, dateEnd } = req.body;
            if (!id || !name || !description || !dateStart || !dateEnd) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                });
            }
            const event = await EventModel.findById(id);
            if (!event) {
                return res.status(404).json({
                    success: false,
                    error: 'Event not found',
                });
            }
            if (event.createdBy.toString() != res.locals.decoded._id.toString()) {
                return res.status(401).json({
                    success: false,
                    error: 'Unauthorized',
                });
            }
            event.name = name;
            event.description = description;
            event.dateStart = dateStart;
            event.dateEnd = dateEnd;
            await event.save();
            return res.status(200).json({
                success: true,
                error: 'Event modified',
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    },
    registerEvent : async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                });
            }
            const event = await EventModel.findById(id);
            if (!event) {
                return res.status(404).json({
                    success: false,
                    error: 'Event not found',
                });
            }
            const user = await UserModel.findById(res.locals.decoded._id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found',
                });
            }
            event.listSigned.push({
                user: user._id,
                signed: true,
            });
            await event.save();
            return res.status(200).json({
                success: true,
                error: 'User registered',
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    },
    inviteEvent : async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            if (!id || !userId) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                });
            }
            const event = await EventModel.findById(id);
            if (!event) {
                return res.status(404).json({
                    success: false,
                    error: 'Event not found',
                });
            }
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found',
                });
            }
            event.listSigned.push({
                user: user._id,
                signed: true,
            });
            await event.save();
            return res.status(200).json({
                success: true,
                error: 'User invited',
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    },
    inviteEventAdmin : async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            if (!id || !userId) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                });
            }
            const event = await EventModel.findById(id);
            if (!event) {
                return res.status(404).json({
                    success: false,
                    error: 'Event not found',
                });
            }
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found',
                });
            }
            event.listSigned.push({
                user: user._id,
                signed: true,
            });
            await event.save();
            return res.status(200).json({
                success: true,
                error: 'User invited',
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    }
};