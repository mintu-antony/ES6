var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
const db = require('./db');
require('dotenv').config();
const app = express();

app.use(bodyParser.json())
app.use(cors());

const route = require('./routes/es6Router');
app.use('/user', route);

const HOST = "localhost"
const PORT = process.env.PORT || 8080;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'POST', 'DELETE');
    next();

});
db.connect(() => {
    app.listen(PORT, HOST, function () {
        console.log(`Listening in ${HOST}:${PORT}`);
    });

});