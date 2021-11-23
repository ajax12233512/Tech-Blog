const path = require('path')
const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 9000;

const sess = {
    secret: 'secret',
    
    cookie: {
        maxAge: 86400000,
        sameSite: true
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false}).then(()=>{
    app.listen(PORT, () => console.log('Now listening'));
});

