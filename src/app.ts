import 'dotenv/config'

import express, { Application } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import swaggerDocument from './swagger'

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import accountsRouter from './routes/accounts'

import mongoose from './config/mongoose';
const db = mongoose.connection;

// When successfully connected
db.on("connected", () => {
  console.log("Mongo DB connection open for DB");
});

const app: Application = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(helmet())
app.use(bodyParser.json());
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/accounts', accountsRouter);

app.listen(process.env.PORT || 2000, () => {
  console.log(`running on port ${process.env.PORT || '2000 '}🚀`)
});