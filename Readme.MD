Database diagram: https://drive.google.com/file/d/1ztgE4uo7aIMVJXehTfVZb997fVAdjliQ/view?usp=sharing

The database diagram shows a similar implementation using a database.  It takes advantage of table relationships, while in the provided solution, there are no such primary keys.

#######################
Technologies Used
#######################
The project is a REST API built with NodeJS, ExpressJS and using Typescript as the scripting language.  Some additional packages used:
- Jest (tests)
- ESLint (code structure validation)
- Prettier (code formatting)

#######################
Installation
#######################
- Clone the following repository: https://github.com/presnizky/cookUnity.git
- Run `npm install` to install all the required dependencies
- Run `npm run start` to start the application.  It will start it on port 3000.
- To run the tests, run `npm run test`.

#######################
Available endpoints
#######################
- /api/login: POST message that sends the following body: 
    {
        email: string, 
        password: string
    }
It returns a User object.

- /api/meals: GET message that returns the whole list of meals
- /api/meals/:chefName : GET message that returns the list of meals of the provided chef
- /api/meals/rate: POST message that rates a meal.  It takes the following body:
{
    username: string,
    mealToRate: {
        chefName: string,
        meal: string
    },
    rating: integer between 1 and 5
}
- /api/chefs/:chefName : GET message that returns the list of meals for the provided chef
- /api/chefs/createMeal : POST message that creates a meal.  It takes the following body:
{
    chefName: string,
    meal: string
}

#######################
Notes
#######################
The current implementation does not have data integrity, since it works with an in-memory dataset with fixed data.  It does not enforce user permissions, or check if a chef exists before creating a meal.

Those issues could be easily solved using a database approach, which I understand is not really required for this assignment.
There are a few things that could be improved, like folder aliases, or error handling, but I didn't focus on that due to time constraints.