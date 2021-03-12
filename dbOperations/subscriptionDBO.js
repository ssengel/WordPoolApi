let Subscription = require('../models/Subscription')

exports.getSubscriptionCount = (userId) =>{
    return Subscription.countDocuments({subscribedUserId: userId}).exec()
}