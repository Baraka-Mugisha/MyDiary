import express from 'express';
import authRoutes from './routes/authenticationRoutes';
import entriesRoutes from './routes/entriesRoutes';

import dotenv from 'dotenv';

import bodyParser from 'body-parser';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send({ message: "Welcome to MyDiary" })
});

app.use('/auth', authRoutes);
app.use('/entries', entriesRoutes);

app.listen(port, console.log('the app is listening on port', port));

export default app;