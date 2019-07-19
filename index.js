require('dotenv').config();
// console.log(process.env);

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

var shortid = require('shortid');
var db = require('./db');

// Demo use express.Route()
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;

// config to use req.body // passing for all middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

// config to use static file such as images, css
app.use(express.static('public'));

// settting for template engine
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
	res.render('index', { name: 'Coders Tokyo' });
});
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log('Server listen on ' + port));
