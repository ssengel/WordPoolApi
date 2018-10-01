let express = require('express');
let app = express();
let db = require('./db')
let bodyParser = require('body-parser');
let morgan = require('morgan');//logger
let tokenController = require('./helpers/tokenController');
let cors = require('cors');
let path = require('path');
let routes = require('./routes/mainRoute');





//middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors())

app.use(tokenController);


//routes
routes.mainRoute(app);

// error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || "Beklenmedik bir hata.");
})

module.exports = app;
