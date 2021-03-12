let Pool = require('../models/Pool');
let User = require('../models/User');
let Word = require('../models/Word');
let Subscription = require('../models/Subscription');
let to = require('../helpers/to');

exports.getAllPools = (userId) =>{
    return Pool.find({ userId: {$ne: userId}});
}

exports.getUserInfo = (userId) => {
    return User.findOne({_id: userId});
}

exports.getWordsByPoolId = (poolId) =>{
    return Word.find({poolId: poolId});
}

exports.getExampleWordByPoolId = (poolId) => {
    return Word.find({poolId: poolId}).limit(3);
}

exports.subscribe = async (userId,poolId) =>{

        // getPool = Pool.findById(poolId);
        // getWords = Word.find({poolId: poolId});

        // [err, [oldPool, oldWords]] = await to(Promise.all([getPool,getWords]))
        // if(err) throw err;
        
        // [err,newPool] = await to(Pool.create({userId: userId, name: oldPool.name, color: oldPool.color }))
        // if(err) throw err;
        
        // let newWords = oldWords.slice(0)

        // //array.map kullanilabilirmiydi  ?
        // for (let i = 0; i < newWords.length; i++) {
        //     newWords[i].userId = userId;
        //     newWords[i].poolId = newPool._id;
        //     newWords[i]._id = undefined;
        // }
        // let x;
        // [err, x] = await to(Word.collection.insertMany(newWords));
        // if(err) throw err;

        [err,pool] = await to(Pool.findById(poolId).exec());
        if(err) throw err;

        let data;
        [err, data] = await to(Subscription.create({userId: userId, poolId:poolId, subscribedUserId:pool.userId}));
        
        return Promise.resolve({result: "ok"})

}

exports.checkSubscription = async (userId,poolId) =>{
    let err, data;
    [err, data] = await to(Subscription.findOne({userId: userId, poolId:poolId}));
    if(err) throw err;
    return Promise.resolve({subscription: data});
}

exports.unSubscribe = async (userId, poolId) =>{
    let err, data;
    [err, data] = await to(Subscription.deleteOne({userId: userId, poolId: poolId}))
    if(err) throw err;
    return Promise.resolve({result: "ok"})
}

exports.getSubscribedPools = async (userId) =>{
    return Subscription.find({userId: userId})
                .populate('poolId')
                .exec()
}

exports.mblGetAllPools = (userId) =>{
    return Pool.find({ userId: {$ne: userId}})
                .populate('userId')
                .exec()
}

exports.mblGetSubscriptions = (userId) =>{
    return Subscription.find({userId: userId})
                        .populate('subscribedUserId')
                        .populate('poolId')
                        .exec();
}


