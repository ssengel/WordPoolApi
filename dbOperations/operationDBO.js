let Operation = require('../models/Operation');

exports.getAllOperations = () => {
    return new Promise((resolve, reject) => {
        Operation.find({})
            .then(operations => {
                resolve(operations);
            })
            .catch(err =>{
                reject(err)
            })
    })
}

exports.getOperations = (userId) =>{
    return new Promise((resolve, reject) => {
        Operation.find({userId: userId})
            .then(ops => {
                resolve(ops);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.createOperation = (userId, wordId, type) => {
    return new Promise((resolve, reject) => {

        Operation.create({
            userId: userId,
            wordId: wordId,
            type: type
        })
        .then(op => {
            resolve(op);
        })
        .catch(err => {
            reject(err);
        })
    })
}

exports.deleteOperation = (userId, opId) => {
    return new Promise((resolve, reject) => {
        Operation.findOneAndDelete({userId: userId,_id: opId})
            .then(op => {
                resolve(op);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.deleteOperations = (userId) => {
    return new Promise((resolve, reject) => {
        Operation.deleteMany({userId: userId})
            .then(ops => {
                resolve(ops);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.deleteOperationsByWordId = (userId, wordId) => {
    return new Promise((resolve, reject) => {
        Operation.deleteMany({userId: userId, wordId: wordId})
            .then(ops => {
                resolve(ops);
            })
            .catch(err => {
                reject(err);
            })
    })
}

