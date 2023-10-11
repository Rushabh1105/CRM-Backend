const mongoose = require('mongoose');
const {DB_URL} = require('./config');

const connect  = () => {
    console.log('MongoDB Connection requested');

    return mongoose.connect(DB_URL);
}

module.exports = {
    connect,
}