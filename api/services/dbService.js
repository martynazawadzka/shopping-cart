const DATA_BASE = require('../consts/consts');
const { MongoClient } = require('mongodb');

const dbAddress = DATA_BASE.ADDRESS;
const dbName = DATA_BASE.DB_NAME;
const mongoOptions = { useNewUrlParser : true };

let client;

module.exports = async () => {
    if (!client) {
        client = await MongoClient.connect(dbAddress, mongoOptions);
    }
    return client.db(dbName);
};
