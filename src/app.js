const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override');
const cookies = require('cookie-parser');
const session = require('express-session');

const mainRouter = require('./routes/main');
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware');


app.use(session({
	secret: "Secret secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(express.static('public'));

app.use(cookies());
app.use(userLoggedMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

app.use('/', mainRouter);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
