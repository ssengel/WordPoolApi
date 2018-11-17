let PWord = require('../models/PWord');


exports.getAllPWords = () => {
    return new Promise((resolve, reject) => {
        PWord.find({})
            .then(pWords => {
                resolve(pWords);
            })
            .catch(err => {
                reject(err);
            })
    })
}
exports.createPWord = (pWord, poolId) => {
    console.log("hello pWordDBO => createPWord");
    
    let mPWord = PWord(pWord);
    mPWord.poolId = poolId;

    return new Promise((resolve, reject) => {
        mPWord.save()
            .then(pWord => {
                resolve(pWord);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getPWordsByPoolId = (poolId) => {
    return new Promise((resolve, reject) => {
        PWord.find({poolId: poolId})
            .then(pWords => {
                resolve(pWords);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.deletePWord = (poolId, pWordId) => {
    return PWord.findOneAndDelete({poolId: poolId, _id: pWordId});
}

exports.updatePWord = (poolId, pWordId, pWord) =>{
    return PWord.findOneAndUpdate({_id:pWordId, poolId:poolId}, pWord, { "new": true});
}

