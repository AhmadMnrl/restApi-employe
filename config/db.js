const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

module.exports = conn;