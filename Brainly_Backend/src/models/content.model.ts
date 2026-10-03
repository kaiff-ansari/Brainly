import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },


     link: {
        type: String,
        required: true,
    },
   

    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
    }],

     type: {
        type: String,
        enum: ["image", "video", "article", "audio"],
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }


});

export const contentModel = mongoose.model("Content", contentSchema);