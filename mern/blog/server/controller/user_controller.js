import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../model/user.js";
import Token from "../model/token.js";

dotenv.config();

export const signupUser = async (req, res) => {
    if (!req.body.fullname || !req.body.password || !req.body.password) {
        return res.status(400).send({
            message: "Fullname, Password and Email are required"
        });
    } if (req.body.password.length < 6) {
        return res.status(400).send({
            message: "Password must be at least 6 characters long"
        });
    } if (req.body.password.length > 20) {
        return res.status(400).send({
            message: "Password must be less than 20 characters long"
        });
    } if (await User.findOne({ username: req.body.username })) {
        return res.status(400).send({
            message: "Username already exists"
        });
    } if (await User.findOne({ email: req.body.email })) {
        return res.status(400).send({
            message: "Email already exists"
        });
    } ``
    try {
        const hashpswd = await bcrypt.hash(req.body.password, 8);
        const user = new User({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: hashpswd
        });
        const newUser = new User(user);

        await newUser.save();
        return res.status(200).json({
            message: "User created successfully"
        })
    }
    catch (e) {
        return res.status(500).json({
            message: "Error while creating user"
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({
                message: "User Not Found"
            })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: "1h" });
        const refreshToken = jwt.sign(user.toJSON(), process.env.REFRES_SECRET_KEY, { expiresIn: "15d" });
        const newToken = new Token({
            token: refreshToken,
        });
        await newToken.save();

        return res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            message: "User logged in successfully"
        })
    }
    catch (e) {
        return res.status(500).json({
            message: "Error while logging in user"
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(401).json({
                message: "User Not Found"
            })
        }
        return res.status(200).json({
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            message: "User found successfully"
        })
    }
    catch (e) {
        return res.status(500).json({
            message: "Error while getting user"
        })
    }
}

export const editProfile = async (req, res) => {
    try {
        const username = req.body.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({
                message: "User Not Found"
            })
        }

        if (req.body.password) {
            const hashpswd = await bcrypt.hash(req.body.password, 8);
            const update = await User.updateOne({ username: username }, { $set: { fullname: req.body.fullname, password: hashpswd } });
            return res.status(200).json({
                message: "User updated successfully"
            })
        } else {
            const update = await User.updateOne({ username: username }, { $set: { fullname: req.body.fullname } });
            return res.status(200).json({
                message: "User updated successfully"
            })
        }


    }
    catch (e) {
        return res.status(500).json({
            message: "Error while updating user"
        })
    }
}
