import type { Request, Response } from "express";
import "dotenv/config";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const registerUser = async (req: Request, res: Response) => {

    const { username, email, password } = req.body;


    try {

        const existingUser = await userModel.findOne({ email });


        if (existingUser) {

            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role: "user"
        })

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT secret is not defined" });
        }

        const token = jwt.sign(
            { id: newUser._id.toString() },
            jwtSecret,
            { expiresIn: "1h" }
        );
        res.status(201).json({
            newUser,
            token,
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }



}


export const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const user = await userModel.findOne({ email });

        if (!user) {

            return res.status(400).json({ message: "Invalid email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {

            return res.status(403).json({ message: "Invalid password" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT secret is not defined" });
        }

        const token = jwt.sign(
            { id: user._id.toString() },
            jwtSecret,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token,
            message: "Login successful"
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
}