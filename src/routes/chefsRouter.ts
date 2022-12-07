import { Router } from 'express';
import { createMeal } from '../../src/services/chefService';
import { getAllMeals, getMeal } from '../../src/services/customerService';

const chefsRouter = Router();

chefsRouter.get('/:chefName', (req, res) => {
  const { chefName } = req.params;
  const meals = getAllMeals(chefName);

  if (meals.length > 0) {
    res.json({
      meals: meals,
    });
  } else {
    res.json({
      Error: 'No meals found for the requested chef.',
    });
  }
});

chefsRouter.post('/createMeal', (req, res, next) => {
  const { chefName, meal } = req.body;
  try {
    createMeal(chefName, meal);
    const createdMeal = getMeal(chefName, meal);

    if (createdMeal !== undefined) {
      res.json({
        message: 'You just created this meal:',
        meal: createdMeal,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default chefsRouter;
