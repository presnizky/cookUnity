import express from 'express';

export function getApp() {
    const app = express();
    app.use(express.json());

    return app;
}


// const PORT = 3000;

// app.get('/ping', (_req, res) => {
//     console.log('someone pinged here!!')
//     res.send('pong!')
// });

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// })