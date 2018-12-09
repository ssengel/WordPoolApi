let Pool = require('../models/Pool');
let Word = require('../models/Word');

exports.createPool = (data, userId) => {
    let pool = Pool(data);
    pool.userId = userId;
    return pool.save();
}

exports.getPools = async (userId) => {
    return Pool.find({ userId: userId});
}

exports.getPool = async (poolId) =>{
    return Pool.findOne({_id: poolId});
}

exports.deletePool = async (poolId) =>{
    return new Promise((resolve, reject) =>{
        let f1 = Pool.findOneAndDelete({_id: poolId});
        let f2 = Word.deleteMany({poolId: poolId});

        Promise.all([f1,f2])
            .then((res) => {
                resolve(res)
            })
            .catch((err) =>{
                reject(err)
            })
    })
    
}

exports.updatePool = async (poolId) =>{
    return Pool.findOneAndUpdate({_id: poolId});
}



