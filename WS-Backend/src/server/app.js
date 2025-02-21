const express = require('express');
const path = require('path');
const webRouter = require('./routes/index');
const dotenv = require('dotenv');
const session = require('express-session');
const errorHandler = require('./middleware/errorHandler');
var cors = require('cors');
dotenv.config({ path: path.join(__dirname, '../config/.env') });

global.BASEPATH = path.join(__dirname, '../../');
global.NODE_ENV = process.env.NODE_ENV;

const app = express();

const corsOptions = {
	origin: '*', 
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	allowedHeaders: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));

app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
		maxAge: 60 * 1000 * 60 * 24,
	})
);

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.json());
app.use('/', webRouter);

app.use(errorHandler);

module.exports = app;
