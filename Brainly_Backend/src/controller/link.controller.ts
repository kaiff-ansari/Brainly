import type { Request, Response } from "express";
import { linkModel } from "../models/link.model.js";

export const generateLink = async (req: Request<{hash:string}>, res: Response) => {

    const { hash} = req.body;

    if (!req.userId){
        return res.status(403).json({
            message: "Unathorized"
        })
    }

    try {
        const newLink = await linkModel.create({
           hash,
           userId: req.userId
        });
        res.status(201).json(newLink);
    } catch (error) {
        res.status(500).json({ message: "Error generating link", error });
    }
}

export const getLink = async (req: Request<{hash:string}>, res: Response) => {

    const { hash } = req.params;

    try{


        const link = await linkModel.findOne({ hash });

        if(!link){
            return res.status(404).json({ message: "Link not found" });
        }
        res.status(200).json(link);
    } catch (error) {
        res.status(500).json({ message: "Error fetching link", error });
    }
}

export const getAllLinks = async (req: Request, res: Response) => {

    try {
        const links = await linkModel.find();
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({ message: "Error fetching links", error });
    }
}

export const deleteLink = async (req: Request<{hash:string}>, res: Response) => {
    const { hash } = req.params;

    try {
        const deletedLink = await linkModel.findOneAndDelete({ hash });

        if (!deletedLink) {
            return res.status(404).json({
                message: "Link not found"
            });
        }

        res.status(200).json({
            message: "Link deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting link",
            error
        });
    }
};

export const updateLink = async (req: Request<{hash:string}>, res: Response) => {

    const {hash} = req.params;

    try{

        const updatedLink = await linkModel.findOneAndUpdate({ hash }, req.body, { new: true });

        if(!updatedLink){
            return res.status(404).json({ message: "Link not found" });
        }

        res.status(200).json(updatedLink);
    } catch (error) {
        res.status(500).json({ message: "Error updating link", error });
    }
}




