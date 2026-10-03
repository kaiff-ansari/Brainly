import express from "express";
import { createContent, getContent, deleteContent } from "../controller/content.controller.js";
import { userMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/content", userMiddleware,createContent);
router.get("/content", userMiddleware, getContent);
router.delete("/content", userMiddleware, deleteContent);

export default router;
