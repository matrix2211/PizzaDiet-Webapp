const mongoose = require('mongoose');

const gtn = new mongoose.Schema({
    guild: String,
    channel: String,
    number: String,
});

module.exports = new mongoose.model('gtn', gtn)