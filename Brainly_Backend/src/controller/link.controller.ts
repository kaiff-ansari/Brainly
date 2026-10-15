import type { Request, Response } from "express";
import { linkModel } from "../models/link.model.js";
import { contentModel } from "../models/content.model.js";
import { userModel } from "../models/user.model.js";
import { random } from "../utils.js";

export const generateLink = async (req: Request, res: Response) => {

    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const share = req.body.share

        if (share) {

            const existingLink = await linkModel.findOne({
                userId
            })

            if (existingLink) {
                return res.json({
                    hash: existingLink.hash
                })

            }
            const hash = random(10);
            await linkModel.create({
                userId,
                hash: hash
            })

            return res.json({
                message: hash
            })
        }

        else {

            await linkModel.deleteOne({ userId })
        }

        return res.json({
            message: "updated shareble link"
        })


    } catch (error) {
        res.status(500).json({ message: "Error generating link", error });
    }





}

export const getLink = async (req: Request<{ hash: string }>, res: Response) => {

    const { hash } = req.params;

    try {


        const link = await linkModel.findOne({ hash });

        if (!link) {
            return res.status(411).json({ message: "Link not found" });
        }

        const content = await contentModel.findOne({
            userId: link.userId
        })

        const user = await userModel.findOne({
            _id: link.userId
        })

        if (!user) {
            return res.status(411).json({ message: "User not found" });
        }
        return res.status(200).json({

            username: user.username,
            content: content

        });

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

export const deleteLink = async (req: Request<{ hash: string }>, res: Response) => {
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

export const updateLink = async (req: Request<{ hash: string }>, res: Response) => {

    const { hash } = req.params;

    try {

        const updatedLink = await linkModel.findOneAndUpdate({ hash }, req.body, { new: true });

        if (!updatedLink) {
            return res.status(404).json({ message: "Link not found" });
        }

        res.status(200).json(updatedLink);
    } catch (error) {
        res.status(500).json({ message: "Error updating link", error });
    }
}




