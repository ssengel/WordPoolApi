let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let PoolSchema = new Schema({
    name: String,
    img: String,
    createdAt: {type: Date, default:new Date()}
}, {versionKey: false});

module.exports = mongoose.model('Pool', PoolSchema);