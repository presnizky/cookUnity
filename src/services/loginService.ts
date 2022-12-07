import { getUsers } from '../data';
import { User } from '../entities/User';

export function login(email: string, password: string): User | undefined {
  const dbUsers: Array<User> = getUsers();

  if (email === '' || password === '') {
    throw new Error('Username and Password must not be empty.');
  }

  const user = dbUsers.find(u => u.email === email && u.password === password);
  return user;
}
