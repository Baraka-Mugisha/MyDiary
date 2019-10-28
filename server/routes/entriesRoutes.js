import express from 'express';
import entriesController from '../controllers/entriesControllers';
const router = express.Router();

router.post('/', entriesController.createEntry);

export default router;