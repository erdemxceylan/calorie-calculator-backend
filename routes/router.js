import { Router } from 'express';
import {
   getNutrientList,
   getDataSettings,
   updateSettings,
   updateNutrient,
   addNutrient,
   deleteNutrient
} from '../controllers/controllers.js';

const router = Router();
router.get('/nutrients', getNutrientList);
router.get('/settings', getDataSettings);
router.put('/update-nutrient', updateNutrient);
router.put('/update-settings', updateSettings);
router.post('/add-nutrient', addNutrient);
router.delete('/delete-nutrient', deleteNutrient);

export default router;
