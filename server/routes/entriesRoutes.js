import express from 'express';
import entriesController from '../controllers/entriesControllers';
const router = express.Router();

router.post('/', entriesController.createEntry);

router.get('/', entriesController.viewEntries);

export default router;