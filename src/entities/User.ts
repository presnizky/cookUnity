import { UserType } from '../../types';

export interface User {
  name: string;
  email: string;
  password: string;
  type: UserType;
}
