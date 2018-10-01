let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let WordSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    eng: String,
    tr: String,
    sentence: String,
    category: String,
    createdAt: {type: Date, default:new Date()}
}, {versionKey: false});

module.exports = mongoose.model('Word', WordSchema);