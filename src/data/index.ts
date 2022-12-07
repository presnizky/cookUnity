import { Meal } from '../entities/Meal';
import { Rating } from '../entities/Rating';
import { User } from '../entities/User';

const meals: Array<Meal> = [
  {
    chefName: 'John',
    meal: 'EggplantParmesan',
    rating: 5,
  },
  {
    chefName: 'Tom',
    meal: 'NoodleSoup',
    rating: 4,
  },
  {
    chefName: 'Tom',
    meal: 'EggplantParmesan',
    rating: 4,
  },
  {
    chefName: 'John',
    meal: 'ChickpeaSalad',
    rating: 3,
  },
];

const users: Array<User> = [
  {
    name: 'Pablo',
    email: 'pablo@cookunity.com',
    password: '1234',
    type: 'consumer',
  },
  {
    name: 'George',
    email: 'george@cookunity.com',
    password: '1234',
    type: 'consumer',
  },
  {
    name: 'John',
    email: 'john@cookunity.com',
    password: '1234',
    type: 'chef',
  },
  {
    name: 'Tom',
    email: 'tom@cookunity.com',
    password: '1234',
    type: 'chef',
  },
];

const ratings: Array<Rating> = [
  {
    username: 'pablo@cookunity.com',
    meal: {
      chefName: 'John',
      meal: 'EggplantParmesan',
      rating: 1,
    },
  },
  {
    username: 'pablo@cookunity.com',
    meal: {
      chefName: 'Tom',
      meal: 'NoodleSoup',
      rating: 3,
    },
  },
  {
    username: 'george@cookunity.com',
    meal: {
      chefName: 'John',
      meal: 'EggplantParmesan',
      rating: 4,
    },
  },
  {
    username: 'george@cookunity.com',
    meal: {
      chefName: 'Tom',
      meal: 'EggplantParmesan',
      rating: 3,
    },
  },
];

export const getMeals = () => meals;
export const getUsers = () => users;
export const getRatings = () => ratings;
