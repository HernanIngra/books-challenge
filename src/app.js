const express = require('express');
const mainRouter = require('./routes/main');

const app = express();
const methodOverride =  require('method-override');/* agregado para usar put */
const cookies = require('cookie-parser');
const session = require('express-session');
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware');

app.use(session({
	secret: "Secret secret",
	resave: false,
	saveUninitialized: false,
}));
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(methodOverride('_method'));/* agregado para usar put */
app.use('/', mainRouter);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
