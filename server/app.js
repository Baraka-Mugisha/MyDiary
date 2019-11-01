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
  res.status(200).send({ status: 200, message: "Welcome to MyDiary" })
});

app.use('/auth', authRoutes);
app.use('/entries', entriesRoutes);

app.use((req, res, _next) => {
  return res.status(404).send({ status: 404, error: 'Route' + req.url + ' Not found.' });
});
// 500 - Any server error
app.use((err, req, res, next) => {
  return res.status(500).send({ status: 500, error: err });
});

app.listen(port, console.log('the app is listening on port', port));

export default app;