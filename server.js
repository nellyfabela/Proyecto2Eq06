const PORT = process.env.PORT || 3001;

/* import */ 
const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbs.create({ helpers });

const app = express();
const sess = {
    secret:'Super secret secret',
    cookie: {},
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
      })
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
