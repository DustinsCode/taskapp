import './lib/environments.mjs';
import express from 'express';
import tasks from './public/api/routes/tasks.mjs';
import users from './public/api/routes/users.mjs';
import path from 'path';

const app = express();

app.use(express.json());

app.use('/api/tasks', tasks);
app.use('/api/users', users);

app.use(express.static('src/public/client/dist/'))
app.use((req,res) => {
    res.sendFile(path.resolve('src/public/client/dist/index.html'));
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

