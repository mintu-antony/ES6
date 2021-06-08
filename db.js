const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const config = require('./configurations/config');

const mongoDbUrl = 'mongodb://localhost:27017'
let mongodb;
let dbs;

function connect(callback) {
    mongoClient.connect(mongoDbUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            res.json({ status: 1, message: err.message });
        }
        dbs = db;
        mongodb = db.db(config.database.db_name);
        callback();
    });
}
function get() {
    return mongodb;
}

function disconnect() {
    dbs.close();
}

module.exports = {
    connect,
    get,
    disconnect
};