import express from 'express';

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

app.listen(port, console.log('the app is listening on port', port));

export default app;