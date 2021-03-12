let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let SubscriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    poolId: {type: Schema.Types.ObjectId, ref: 'Pool'},
    subscribedUserId:{ type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default:new Date()}
}, {versionKey: false});

module.exports = mongoose.model('Subscription', SubscriptionSchema);