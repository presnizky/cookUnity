import { Router } from 'express';
import { User } from '../../src/entities/User';
import { login } from '../../src/services/loginService';

const loginRouter = Router();

loginRouter.post('/', (req, res) => {
  const { email, password } = req.body;
  const user: User | undefined = login(email, password);

  if (user !== undefined) {
    res.json({ user: user });
  } else {
    res.json({ Error: 'User not found.' });
  }
});

export default loginRouter;
