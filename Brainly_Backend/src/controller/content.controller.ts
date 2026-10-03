import type { Request, Response } from "express";
import { contentModel } from "../models/content.model.js";



export const createContent = async (req:Request, res:Response) =>{

    const {title, link, tags, type} = req.body;

    if (!req.userId) {
    return res.status(401).json({
        message: "Unauthorized"
    });
}

    try{

        const newContent = await contentModel.create({
            title,
            link,
            tags:[],
            type,
            userId: req.userId,
        })
        res.status(201).json(newContent);
    } catch (error) {
        res.status(500).json({ message: "Error creating content" });
    }
}

export const getContent = async (req: Request, res: Response) =>{

    if (!req.userId){
        return res.status(403).json({
            message: "Unauthorized"
        })
    }
    
    const content = await contentModel.find({
        userId: req.userId
    }).populate("userId", "username")

    res.json({
        content
    })
}

export const deleteContent = async (req: Request, res: Response) =>{

    const contentId = req.body.contentId;

    if (!req.userId) {
    return res.status(401).json({
        message: "Unauthorized"
    });
}

    await contentModel.deleteMany({
        contentId,
        userId: req.userId
    })

    res.json({
        message: "Deleted successfully"
    })

}