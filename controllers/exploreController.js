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

exports.subscribe = async (req, res, next) =>{
    const userId = req.user._id;
    const poolId = req.params.poolId;

    [err, data] = await to(ExploreDBO.subscribe(userId, poolId));
    if (err) return next(err);
    res.status(200).send(data);
}

exports.checkSubscription = async (req, res, next) =>{
    const userId = req.user._id;
    const poolId = req.params.poolId;

    [err, data] = await to(ExploreDBO.checkSubscription(userId, poolId));
    if (err) return next(err);
    res.status(200).send(data);
}

exports.unSubscribe = async (req, res, next) =>{
    const userId = req.user._id;
    const poolId = req.params.poolId;

    [err, data] = await to(ExploreDBO.unSubscribe(userId, poolId));
    if (err) return next(err);
    res.status(200).send(data);
}

exports.getSubscribedPools = async (req, res, next) =>{
    const userId = req.user._id;
    let pools = [];

    [err, data] = await to(ExploreDBO.getSubscribedPools(userId));
    if (err) return next(err);
    
    for (let i = 0; i < data.length; i++) {
        pools.push(data[i].poolId);
    }
    res.status(200).send(pools);
}

exports.mblGetAllPools = async (req, res, next) =>{
    const userId = req.user._id;
    
    [err, data] = await to(ExploreDBO.mblGetAllPools(userId));
    let result = JSON.parse(JSON.stringify(data));
    delete result[0].userId;

    console.log(result)
    if(err) next(err);
    res.status(200).send(data);
}

exports.mblGetSubscriptions = async (req, res, next) =>{
    const userId = req.user._id;

    [err, data] = await to(ExploreDBO.mblGetSubscriptions(userId));
    if(err) next(err);
    console.log(data)
    res.status(200).send(data);
}