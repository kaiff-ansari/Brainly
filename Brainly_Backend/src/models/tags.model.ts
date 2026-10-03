import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    }
})

export const tagModel = mongoose.model("Tag", tagSchema);