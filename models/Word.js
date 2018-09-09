let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let WordSchema = new Schema({
    userId: String,
    eng: String,
    tr: String,
    sentence: String,
    createdAt: {type: String, default:new Date().toString()}
}, {versionKey: false});

module.exports = mongoose.model('Word', WordSchema);