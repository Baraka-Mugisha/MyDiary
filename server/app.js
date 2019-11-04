import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './v1/routes/authenticationRoutes';
import entriesRoutes from './v1/routes/entriesRoutes';
import authRoutes2 from './v2/routes/authenticationRoutes';
dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send({ status: 200, message: 'Welcome to MyDiary' });
});

app.use('/v1/auth', authRoutes);
app.use('/v1/entries', entriesRoutes);
app.use('/v2/auth', authRoutes2);

app.use((req, res, _next) => res.status(404).send({ status: 404, error: `Route ${req.url} Not found.` }));
// 500 - Any server error
app.use((err, req, res, next) => res.status(500).send({ status: 500, error: err }));

app.listen(port, console.log('the app is listening on port', port));

export default app;
