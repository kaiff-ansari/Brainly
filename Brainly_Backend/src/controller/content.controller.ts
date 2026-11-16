import type { Request, Response } from "express";
import { contentModel } from "../models/content.model.js";



export const createContent = async (req: Request, res: Response) => {
    const { title, link, tags, type } = req.body;

    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    if (!title || !link) {
        return res.status(400).json({
            message: "Title and link are required"
        });
    }

    try {
        const newContent = await contentModel.create({
            title,
            link,
            tags: Array.isArray(tags) ? tags : [],
            type: type || "youtube",
            userId: req.userId,
        });
        res.status(201).json(newContent);
    } catch (error) {
        console.error("Error creating content:", error);
        res.status(500).json({ message: "Error creating content" });
    }
};

export const getContent = async (req: Request, res: Response) => {
    if (!req.userId) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    try {
        const content = await contentModel.find({
            userId: req.userId
        }).populate("userId", "username");

        res.json({
            content
        });
    } catch (error) {
        console.error("Error fetching content:", error);
        res.status(500).json({ message: "Error fetching content" });
    }
};

export const deleteContent = async (req: Request, res: Response) => {
    const contentId = req.params.id || req.body.contentId || req.body.id;

    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    if (!contentId) {
        return res.status(400).json({
            message: "contentId is required"
        });
    }

    try {
        const result = await contentModel.deleteOne({
            _id: contentId,
            userId: req.userId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Content not found or unauthorized to delete"
            });
        }

        res.json({
            message: "Deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting content:", error);
        res.status(500).json({ message: "Error deleting content" });
    }
};