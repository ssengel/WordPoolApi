let express = require('express');
let app = express();
let db = require('./db')
let bodyParser = require('body-parser');
let morgan = require('morgan');//logger
let tokenController = require('./helpers/tokenController');
let cors = require('cors');
let path = require('path');
let routes = require('./routes/mainRoute');
let {AssertionError} = require('assert');//error handler ile ayni yerde olmali
let {MongoError} = require('mongodb');
let mongoose = require('mongoose')


//middleware
app.use("/publicImages", express.static(path.resolve(__dirname, 'publicImages')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors())
app.use(tokenController);


//routes
routes.mainRoute(app);



// error handling
app.use((err, req, res, next) => {

    console.log("Message:", err.message);
    console.log("Reason:", err.reason);
    
    if(err instanceof MongoError){
        return res.status(502).send({type: "Database Error", message: err.message});
    }

    if(err instanceof mongoose.Error){
        return res.status(503).send({type: "Mongoose Error", message: err.message})
    }

    if(err.code === 400){
       return res.status(400).send({type: "Client Error", message: err.message || "Client Error"});
    }

    res.status(err.code || 500).send({type: "Unknow", message: err.message || "UnExpected Error"});
})

module.exports = app;
