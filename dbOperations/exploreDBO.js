let Pool = require('../models/Pool');
let User = require('../models/User');
let Word = require('../models/Word');
let Op = require('../models/Op');
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

exports.copyPool = async (userId,poolId) =>{

        getPool = Pool.findById(poolId);
        getWords = Word.find({poolId: poolId});

        [err, [oldPool, oldWords]] = await to(Promise.all([getPool,getWords]))
        if(err) throw err;
        
        [err,newPool] = await to(Pool.create({userId: userId, name: oldPool.name, color: oldPool.color }))
        if(err) throw err;
        
        let newWords = oldWords.slice(0)

        // for (let i = 0; i < newWords.length; i++) {
        //     let w = newWords[i];
        //     w.userId = userId;
        //     w.poolId = newPool._id;
        //     w._id = undefined;
        //     let x;
        //     [err, x] = await to(Word.collection.insertOne(w));
        //     if(err) throw err;
        // }

        // newWords.forEach(async w => {
        //     w.userId = userId;
        //     w.poolId = newPool._id;
        //     w._id = undefined;
        //     const word = new Word(w)
        //     try {
        //         await Word.collection.insertOne(word);
        //     } catch (err) {
        //         return Promise.reject(err)          
        //     }
        // });

        //array.map kullanilabilirmiydi  ?
        for (let i = 0; i < newWords.length; i++) {
            newWords[i].userId = userId;
            newWords[i].poolId = newPool._id;
            newWords[i]._id = undefined;
        }
        let x;
        [err, x] = await to(Word.collection.insertMany(newWords));
        if(err) throw err;

        [err, x] = await to(Op.create({userId: userId, poolId:poolId}));
        
        return Promise.resolve({result: "ok"})


}


