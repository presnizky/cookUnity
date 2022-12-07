
import { getMeals, getRatings} from "../data";
import { Meal } from "../entities/Meal";

export function getAllMeals(chefName?: string) {
    const meals = getMeals();
    return chefName!=='' ? meals : meals.filter(m => m.chefName === chefName);
}

export function recalculateRatings (mealToUpdate: Meal) {
    const meals = getMeals();
    const ratings = getRatings();

    const chefName = mealToUpdate.chefName;
    const meal = mealToUpdate.meal;

    // Find the meal in the list of meals
    const chefMeal = meals.find(m => m.chefName === chefName && m.meal === meal);
    if (chefMeal === undefined) return; // Meal not found

    // Calculate the average rating
    const mealRatings = ratings.filter(r => r.meal.chefName === chefName && r.meal.meal === meal);
    let totalRating = 0;
    let numRatings = 0;
    console.log('mealRatings: ', mealRatings)
    mealRatings.forEach(r => {
        if (r.meal.rating !== undefined) {
            totalRating += r.meal.rating;
            numRatings++;
        }
    });
    chefMeal.rating = totalRating / numRatings;
}


export function rateMeal(username: string, mealToRate: Meal, rating: number) {
    if(rating < 1 || rating > 5) {
        throw new Error('The rating value must be between 1 and 5.')
    }

    const ratings = getRatings();
    const foundRating = ratings.find(r => (r.username === username && r.meal.chefName === mealToRate.chefName && r.meal.meal=== mealToRate.meal));

    console.log('foundRating: ', foundRating)
    if(foundRating === undefined){
        mealToRate.rating = rating;
        ratings.push({username, meal: mealToRate});
        console.log('mealToRate: ', mealToRate)
        recalculateRatings(mealToRate);
    } else {
        throw new Error('User can rate the meal only once.')
    }
}