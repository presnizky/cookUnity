import { Router } from 'express';
import {
  getAllMeals,
  getMeal,
  rateMeal,
} from '../../src/services/customerService';

const mealsRouter = Router();

mealsRouter.get('/', (_req, res) => {
  res.json({ meals: getAllMeals() });
});

mealsRouter.get('/:chefName', (req, res) => {
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

mealsRouter.post('/rate', (req, res, next) => {
  const { username, meal, rating } = req.body;
  try {
    rateMeal(username, meal, rating);
    const ratedMeal = getMeal(meal.chefName, meal.meal);

    if (ratedMeal !== undefined) {
      res.json({
        message: 'You just rated this meal with a value of ' + rating,
        meal: ratedMeal,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default mealsRouter;
