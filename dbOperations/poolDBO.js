let Pool = require('../models/Pool');

exports.createPool = (pool) => {
    
    let mPool = Pool(pool);
    return new Promise((resolve, reject) => {
        mPool.save()
            .then(pool => {
                resolve(pool);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getAllPools = async () => {
    return new Promise((resolve, reject) => {
        Pool.find({})
            .then(pools => {
                resolve(pools);
            })
            .catch(err => {
                reject(err);
            })
    })
}