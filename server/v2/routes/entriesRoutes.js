import express from 'express';
import entriesController from '../controllers/entriesControllers';
import validate from '../middlewares/validation';

const router = express.Router();

router.post('/', validate.ValidateCreateEntry, entriesController.createEntry);

router.get('/', entriesController.viewEntries);
router.get('/:entry_id', validate.ValidateSpecificEntry, entriesController.viewSpecificEntry);

// router.patch('/:entry_id', validate.ValidateModifyEntry, entriesController.modifyEntry);
// router.delete('/:entry_id', validate.ValidateDeleteEntry, entriesController.deleteEntry);
export default router;
