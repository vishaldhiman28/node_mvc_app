const express       = require ('express');
const path          = require ('path');
const cookie_parser = require ('cookie-parser');
const session       = require ('express-session');
const body_parser   = require ('body-parser');
const index         = require ('./routes/index');
const signup        = require ('./routes/signup');
const login         = require ('./routes/login');
const landing_page  = require ('./routes/landing_page');
const logout        = require ('./routes/logout');
const db            = require ('./common/database_connection');

const app          = express ();

app.set ("views", path.join(__dirname, "views"));
app.set ("view engine", "pug");

app.use (cookie_parser());
app.use (body_parser.urlencoded( { extended : true } ));
app.use (session( {
    key               : 'user_id',
    secret            : 'TheRandomSecretKey',
    resave            : false,
    saveUninitialized : false,
    cookie            : {
        expires       : 600000
    }
}));

app.use ((req, res, next) => {
	if(req.cookies.user_id && !req.session.user) {
		res.clearCookie ('user_id');
	}
	next();
});

app.use ('/', index);
app.use ('/signup', signup);
app.use ('/login', login);
app.use ('/landing_page', landing_page);
app.use ('/logout', logout);

/*
app.use ((req, res, next) => {
        res.status(400).send ("404 Not Found");
});*/
/*
app.use (isSessionExist, () => {
        res.redirect ("login", { title: "Login"} );
});*/

db.db_connect((data, error) => {
	if (error) {
		console.error ('Mongo connection failed. Error : ' + error);
		process.exit (1);
	}

	app.listen (3000, () => {
		console.log ("Server is listening on port 3000");
	});
});
