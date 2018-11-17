let PWordDBO = require('../dbOperations/pWordDBO');
let badRequest = require("../helpers/badRequestError");
let to = require("../helpers/to")

exports.getAllPWords = (req, res, next) => {
    
    PWordDBO.getAllPWords()
        .then(pWords => {
            res.status(200).send(pWords);
        })
        .catch(err =>{
            next(err);
        })
}

exports.createPWord = (req, res, next) => {

    const mPWord = req.body;
    const mPoolId = req.params.poolId;

    if(!mPWord.eng || !mPWord.tr || !mPWord.sentence){
        return next(badRequest("kelime bilgileri eksik .."));
    }

    PWordDBO.createPWord(mPWord,mPoolId)
        .then(pWord => {
            res.status(200).send(pWord);
        })
        .catch(err =>{
            next(err);
        })
}

exports.getPWordsByPoolId = (req, res, next) => {
    
    const poolId = req.params.poolId;

    PWordDBO.getPWordsByPoolId(poolId)
        .then(pWords => {
            res.status(200).send(pWords);
        })
        .catch(err =>{
            next(err);
        })
}

exports.deletePWord = async (req, res, next) => {
    const poolId = req.params.poolId;
    const pWordId = req.params.pWordId;

    [err, data] = await to(PWordDBO.deletePWord(poolId, pWordId));
    if(err){
        return next(err);
    }

    res.status(200).send(data);
}

exports.updatePWord = async (req, res, next) => {
    const poolId = req.params.poolId;
    const pWordId = req.params.pWordId;
    const pWord = req.body;
    [err, data] = await to(PWordDBO.updatePWord(poolId, pWordId, pWord));
    if(err){
        return next(err);
    }
    res.status(200).send(data);
}