import express from 'express';
import {generateLink, getLink} from '../controller/link.controller.js';
import { userMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/brain/share', userMiddleware, generateLink);
router.get('/brain/:hash',getLink);


export default router;