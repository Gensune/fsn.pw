require('dotenv').config();

const monk = require('monk');
const uri = process.env.MONGODB_URI;

const db = monk(uri);

module.exports = db;