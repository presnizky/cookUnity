import { getApp } from './server/index';

export function start() {
    const app = getApp();
    const {PORT} = process.env;

    const SERVER_PORT = PORT || 3000;

    const server = app.listen(SERVER_PORT, () => {
        console.log(`Server listening on port ${SERVER_PORT}`);
    });

    return server;
}
// import express from 'express';

// const app = express();
// app.use(express.json());

// const PORT = 3000;

// app.get('/ping', (_req, res) => {
//     console.log('someone pinged here!!')
//     res.send('pong!')
// });

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// })