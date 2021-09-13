const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    user: String,
    senha: String,
});

const users = mongoose.model('Users', DataSchema);

module.exports = users;