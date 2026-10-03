import express from 'express';
import {generateLink, getLink, updateLink, deleteLink} from '../controller/link.controller.js';

const router = express.Router();

router.post('/generate', generateLink);
router.get('/:hash', getLink);
router.put('/:hash', updateLink);
router.delete('/:hash', deleteLink);

export default router;