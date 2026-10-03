import mongoose from "mongoose";



const connectDB = async () => {


    try {

        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }

        const uri = await mongoose.connect(mongoURI);
        console.log(`MongoDB connected: ${uri.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }

}

export default connectDB;