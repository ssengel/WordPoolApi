let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let PoolSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    color: String,
    image: {
        path: {
            type: String,
            trim: true
        },
        originalname: {
            type: String
        }
    },
    createdAt: {type: Date, default:new Date()}
}, {versionKey: false});

module.exports = mongoose.model('Pool', PoolSchema);