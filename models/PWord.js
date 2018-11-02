let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let PWordSchema = new Schema({
    poolId: {type: Schema.Types.ObjectId, ref: 'Pool'},
    eng: String,
    tr: String,
    sentence: String,
    createdAt: {type: Date, default:new Date()}
}, {versionKey: false});

module.exports = mongoose.model('PWord', PWordSchema);