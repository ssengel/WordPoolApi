let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let OperationSchema = new Schema({
    userId: String,
    poolId: String,
    createdAt: {type: Date, default:new Date()}
}, {versionKey: false});

module.exports = mongoose.model('Op', OperationSchema);