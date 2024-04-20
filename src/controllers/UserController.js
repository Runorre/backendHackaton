import { UserModel } from "../models/index.js";

export default {
    modifyUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email } = req.body;

            if (!name || !email || !id) {
                return res.status(400).json({
                    success: false,
                    message: "Missing fields",
                });
            }
            const user = await UserModel.findById(id).select({password: 0});;
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            user.name = name;
            user.email = email;
            await user.save();
            return res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            console.error("modifyUser", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    modifyUserHimself: async (req, res) => {
        try {
            const id = res.locals.decoded._id;
            const { name, email } = req.body;

            if (!name || !email || !id) {
                return res.status(400).json({
                    success: false,
                    message: "Missing fields",
                });
            }
            const user = await UserModel.findById(id).select({password: 0});;
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            user.name = name;
            user.email = email;
            await user.save();
            return res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            console.error("modifyUser", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Missing fields",
                });
            }
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            await user.remove();
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
            });
        } catch (error) {
            console.error("deleteUser", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    getAllUser : async (req, res) => {
        try {
            const users = await UserModel.find().select({password: 0});;
            return res.status(200).json({
                success: true,
                data: users,
            });
        } catch (error) {
            console.error("getAllUser", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await UserModel.findById(res.locals.decoded._id).select({password: 0});;
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            console.error("getUser", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    changeToAdmin : async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserModel.findById(id).select({password: 0});
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            user.role = "ADMIN";
            await user.save();
            return res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            console.error("changeToAdmin", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}
