let PoolDBO = require('../dbOperations/poolDBO');
let WordDBO = require('../dbOperations/wordDBO');
let badRequest = require("../helpers/badRequestError");
let to = require('../helpers/to');


exports.createPool = async (req, res, next) => {
    const userId = req.user._id;
    let data = req.body;

    [err, data] = await to(PoolDBO.createPool(data, userId));
    if(err) next(err)
    res.status(200).send(data);
}

exports.getPools = async  (req, res, next) => {
    const userId = req.user._id;
 
    [err, data] = await to(PoolDBO.getPools(userId));
    if(err) next(err);
    res.status(200).send(data);
}

exports.getPool = async  (req, res, next) => {
    const poolId = req.params.poolId;
 
    [err, data] = await to(PoolDBO.getPool(poolId));
    if(err) next(err);
    res.status(200).send(data);
}

exports.deletePool = async  (req, res, next) => {
    const poolId = req.params.poolId;
 
    [err, data] = await to(PoolDBO.deletePool(poolId));
    if(err) next(err);
    res.status(200).send(data);
}

exports.updatePool = async  (req, res, next) => {
    const poolId = req.params.poolId;
 
    [err, data] = await to(PoolDBO.updatePool(poolId));
    if(err) next(err);
    res.status(200).send(data);
}

exports.getWordCount = async (req, res, next) =>{

    //simulation
    // const waitTill = new Date(new Date().getTime() + 1 * 400);
    // while(waitTill > new Date()){}
    
    const poolId = req.params.poolId;

    [err, data] = await to(WordDBO.getWordCountByPoolId(poolId));
    if(err) next(err);
    res.status(200).send({poolId: poolId, wordCount: data});
}

