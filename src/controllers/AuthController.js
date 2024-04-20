import { TokenModel, UserModel } from "../models/index.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default {
    login: async (req, res) => {
        try {
            let { email, password } = req.body;
            let user = await UserModel.findOne({ email: email }).lean();
            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: "Invalid credentials",
                });
            }
            let isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({
                    success: false,
                    error: "Invalid credentials",
                });
            } else {
                let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                const newToken = new TokenModel({ token: token , user: user._id });
                await newToken.save();
                return res.status(200).json({
                    success: true,
                    token: token,
                    id : user._id,
                });
            
            }
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    },
    register: async (req, res) => {
        try {
            let { email, password, firstname, lastname } = req.body;
            if (!email || !password || !firstname || !lastname) {
                return res.status(400).json({
                    success: false,
                    error: "Missing required fields",
                });
            }
            let user = await UserModel.findOne({ email: email }).lean();
            if (user) {
                return res.status(409).json({
                    success: false,
                    error: "Email already in use",
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                email: email,
                password: hashedPassword,
                name: {first: firstname, last: lastname},
            });
            await newUser.save();
            return res.status(201).json({
                success: true,
                message: "User created",
            });
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    },
}