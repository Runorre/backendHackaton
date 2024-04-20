import { SalleModel } from "../models/index.js";

export default {
    getAllrooms : async (req, res) => {
        try {
            let salles = await SalleModel.find().lean();
            return res.status(200).json({
                success: true,
                data: salles,
            });
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    },
    createRoom : async (req, res) => {
        try {
            let { name, capacity } = req.body;
            if (!name || !capacity) {
                return res.status(400).json({
                    success: false,
                    error: "Missing required fields",
                });
            }
            const newSalle = new SalleModel({
                name: name,
                capacity: capacity,
            });
            await newSalle.save();
            return res.status(200).json({
                success: true,
                data: newSalle,
            });
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    },
    modifyRoom : async (req, res) => {
        try {
            let { name, capacity, usable } = req.body;
            if (!name || !capacity || !usable) {
                return res.status(400).json({
                    success: false,
                    error: "Missing required fields",
                });
            }
            let salle = await SalleModel.findById(req.params.id);
            if (!salle) {
                return res.status(404).json({
                    success: false,
                    error: "Room not found",
                });
            }
            salle.name = name;
            salle.capacity = capacity;
            salle.usable = usable;
            await salle.save();
            return res.status(200).json({
                success: true,
                data: salle,
            });
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    },
    deleteRoom : async (req, res) => {
        try {
            let salle = await SalleModel.findById(req.params.id);
            if (!salle) {
                return res.status(404).json({
                    success: false,
                    error: "Room not found",
                });
            }
            await salle.delete();
            return res.status(200).json({
                success: true,
                data: salle,
            });
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    }
}