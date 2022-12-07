import { Router } from 'express';
import chefsRouter from './chefsRouter';
import mealsRouter from './mealsRouter';
import loginRouter from './loginRouter';

const apiRouter = Router();

apiRouter.use('/login', loginRouter);
apiRouter.use('/meals', mealsRouter);
apiRouter.use('/chefs', chefsRouter);

export default apiRouter;
