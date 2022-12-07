import { getMeals } from "../data";

export function mealExists (chefName: string, meal: string): boolean {
    const meals = getMeals();
    return meals.find(m => m.chefName === chefName && m.meal === meal) === undefined ? false : true;
}

export function createMeal(chefName: string, meal: string) {
    const meals = getMeals();

    if(!mealExists(chefName, meal)){
        // meal does not exist, add a new one
        meals.push({
            chefName,
            meal,
            rating: 0
        });
    }else {
        throw new Error('The supplied meal already exists')
    }
}

export function getChefMeals(chefName: string) {
    const meals = getMeals();
    return chefName!== '' ?  meals.filter(m => m.chefName === chefName) : meals;
}