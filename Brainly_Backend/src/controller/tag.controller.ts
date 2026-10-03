import type { Request, Response } from "express";
import { tagModel } from "../models/tags.model.js";


export const createTag = async (req: Request, res:Response) =>{


    const {title} = req.body;

    try{

        const newTag = await tagModel.create({
            title,
            
        })

        res.status(201).json(newTag);
    }
    catch(error){
        res.status(500).json({ message: "Error creating tag", error });
    }
} 

export const getAllTags = async (req: Request, res: Response) => {

    try {

        const tags = await tagModel.find();
        res.status(200).json(tags);

    }

    catch(error){
        res.status(500).json({ message: "Error fetching tags", error });
    }

}

export const getTagById = async (req: Request, res: Response) => {

    const {id} = req.params;

    try{

        const tag = await tagModel.findById(id);

        if(!tag){
            return res.status(404).json({ message: "Tag not found" });
        }

        return res.status(200).json(tag);
    }
    catch(error){
        res.status(500).json({ message: "Error fetching tag", error });
    }
}

export const deleteTag = async (req:Request, res: Response) => {


    const {id} = req.params;

    try {

        const deletedTag = await tagModel.findByIdAndDelete(id);

        if(!deletedTag){
            return res.status(404).json({ message: "Tag not found" });
        }

        res.status(200).json({ message: "Tag deleted successfully" });
    }

    catch(error){
        res.status(500).json({ message: "Error deleting tag", error });
    }
}