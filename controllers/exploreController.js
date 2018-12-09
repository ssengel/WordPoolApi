let ExploreDBO = require('../dbOperations/exploreDBO');
let to = require('../helpers/to')


exports.getUserInfo = async (req, res, next)=>{

    const userId = req.params.userId;

    [err, data] = await to(ExploreDBO.getUserInfo(userId))
    if (err) next(err);
    res.status(200).send(data);
}

exports.getAllPools = async (req, res, next) =>{
    const userId = req.user._id;

    [err, data] = await to(ExploreDBO.getAllPools(userId));
    if(err) next(err);
    res.status(200).send(data);
}

exports.getWordsByPoolId = async (req, res, next) => {
    const poolId = req.params.poolId;
  
    [err, data] = await to(ExploreDBO.getWordsByPoolId(poolId));
    if(err) next(err)
    res.status(200).send(data);
  
}

exports.getExampleWordByPoolId = async (req, res, next)=> {
    const poolId = req.params.poolId;
  
    [err, data] = await to(ExploreDBO.getExampleWordByPoolId(poolId));
    if (err) {
      return next(err);
    }
    res.status(200).send(data);
}

exports.copyPool = async (req, res, next) =>{
    const userId = req.user._id;
    const poolId = req.params.poolId;

    [err, data] = await to(ExploreDBO.copyPool(userId, poolId));
    if (err) return next(err);
    res.status(200).send(data);
}