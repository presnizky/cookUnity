import * as data from '../src/data';
import { Meal } from '../src/entities/Meal';
import { Rating } from '../src/entities/Rating';
import { User } from '../src/entities/User';
import {
  createMeal,
  getChefMeals,
  mealExists,
} from '../src/services/chefService';
import { rateMeal } from '../src/services/customerService';
import { login } from '../src/services/loginService';

const dbMeals = new Array<Meal>();
dbMeals.push({
  chefName: 'John',
  meal: 'EggplantParmesan',
  rating: 1,
});

dbMeals.push({
  chefName: 'Tom',
  meal: 'NoodleSoup',
  rating: 3,
});

const dbRatings = new Array<Rating>();

dbRatings.push({
  username: 'pablo@cookunity.com',
  meal: {
    chefName: 'John',
    meal: 'EggplantParmesan',
    rating: 1,
  },
});

dbRatings.push({
  username: 'pablo@cookunity.com',
  meal: {
    chefName: 'Tom',
    meal: 'NoodleSoup',
    rating: 3,
  },
});

const dbUsers = new Array<User>();
dbUsers.push({
  name: 'Pablo',
  email: 'pablo@cookunity.com',
  password: '1234',
  type: 'consumer',
});
dbUsers.push({
  name: 'George',
  email: 'george@cookunity.com',
  password: '1234',
  type: 'consumer',
});
dbUsers.push({
  name: 'John',
  email: 'john@cookunity.com',
  password: '1234',
  type: 'chef',
});

jest.spyOn(data, 'getMeals').mockReturnValue(dbMeals);
jest.spyOn(data, 'getRatings').mockReturnValue(dbRatings);

describe('Tests', () => {
  beforeEach(() => {
    dbMeals.splice(2, dbMeals.length);
    dbRatings.splice(2, dbRatings.length);
    dbUsers.splice(2, dbUsers.length);
    jest.resetModules();
  });

  describe('Get data', () => {
    it('Gets the meals', () => {
      expect(data.getMeals()).toBe(dbMeals);
    });

    it('Gets the ratings', () => {
      expect(data.getRatings()).toBe(dbRatings);
    });
  });

  describe('Rate Meals', () => {
    it('Adds a new rating', () => {
      const username = 'george@cookunity.com';
      const mealToRate = {
        chefName: 'John',
        meal: 'EggplantParmesan',
        rating: 1,
      };
      const rating = 3;
      const totalRatings = data.getRatings().length;

      rateMeal(username, mealToRate, rating);
      expect(data.getRatings().length).toBe(totalRatings + 1);
    });

    it('Tries to add a new rating but had already added one', () => {
      const username = 'pablo@cookunity.com';
      const mealToRate = {
        chefName: 'Tom',
        meal: 'NoodleSoup',
        rating: 1,
      };
      const rating = 3;

      expect(() => {
        rateMeal(username, mealToRate, rating);
      }).toThrow('User can rate the meal only once.');
    });

    it('Tries to add a new rating with a value greater than 5', () => {
      const username = 'george@cookunity.com';
      const mealToRate = {
        chefName: 'Paul',
        meal: 'EggplantParmesan',
        rating: 1,
      };
      const rating = 8;

      expect(() => {
        rateMeal(username, mealToRate, rating);
      }).toThrow('The rating value must be between 1 and 5.');
    });

    it('Tries to add a new rating with a value lower than 1', () => {
      const username = 'george@cookunity.com';
      const mealToRate = {
        chefName: 'Tom',
        meal: 'NoodleSoup',
        rating: 1,
      };
      const rating = 0;

      expect(() => {
        rateMeal(username, mealToRate, rating);
      }).toThrow('The rating value must be between 1 and 5.');
    });

    it('Adds a new rating and recalculates the average', () => {
      const username = 'tom@cookunity.com';
      const mealToRate = {
        chefName: 'John',
        meal: 'EggplantParmesan',
        rating: 1,
      };
      const rating = 3;

      rateMeal(username, mealToRate, rating);
      const currentRatingsAverage = 2;
      const ratedMeal = data
        .getMeals()
        .find(
          m => m.chefName === mealToRate.chefName && m.meal === mealToRate.meal,
        );

      expect(ratedMeal?.rating).toBe(currentRatingsAverage);
    });
  });

  describe('Chef Service', () => {
    it('Checks if meal exists and finds it', () => {
      const chefName = 'John';
      const meal = 'EggplantParmesan';
      const exists = mealExists(chefName, meal);
      expect(exists).toBeTruthy();
    });

    it('Checks if meal exists and does not find it', () => {
      const chefName = 'John';
      const meal = 'Noodles';
      const exists = mealExists(chefName, meal);
      expect(exists).toBeFalsy();
    });

    it('Creates a new meal', () => {
      const currentMeals = data.getMeals().length;
      const chefName = 'Paul';
      const meal = 'Barbecue';

      createMeal(chefName, meal);
      expect(data.getMeals().length).toBe(currentMeals + 1);
    });

    it('Tries to create an existing meal', () => {
      const chefName = 'John';
      const meal = 'EggplantParmesan';

      expect(() => {
        createMeal(chefName, meal);
      }).toThrow('The supplied meal already exists');
    });

    it('Gets meal by chef name', () => {
      // create a new meal
      const chefName = 'Paul';
      const meal = 'Fish';

      createMeal(chefName, meal);
      const chefMeals = getChefMeals(chefName);
      expect(chefMeals.length).toBe(1);
    });
  });

  describe('Validate User', () => {
    it('Validates correct user credentials', () => {
      const validUser = login('pablo@cookunity.com', '1234');
      expect(validUser).toBeInstanceOf(Object);
      expect(login('invalid-username', 'invalid-password')).toBe(undefined);
    });

    it('Validates incorrect user credentials', () => {
      expect(login('invalid-username', 'invalid-password')).toBe(undefined);
    });
  });
});
