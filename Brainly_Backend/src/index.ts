import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"; 
import contentRotes from "./routes/content.route.js";   
import connectDB from "./config/db.js";
dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1",contentRotes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
