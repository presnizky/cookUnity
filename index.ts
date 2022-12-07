import express from 'express';
import apiRouter from './src/routes/routes';

  const app = express();
  app.use(express.json());
  
  // Import the routes
  app.use('/api', apiRouter);

    const { PORT } = process.env;

  const SERVER_PORT = PORT || 3000;

  app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
  });
  
