let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let OperationSchema = new Schema({
    userId: String,
    wordId: String,
    type: String,
    createdAt: {type: Date, default:new Date()}
}, {versionKey: false});

module.exports = mongoose.model('Operation', OperationSchema);