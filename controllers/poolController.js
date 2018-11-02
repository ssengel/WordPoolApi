let PoolDBO = require('../dbOperations/poolDBO');
let badRequest = require("../helpers/badRequestError");
let to = require('../helpers/to');


exports.createPool = (req, res, next) => {

    const mPool = req.body;

    if(!mPool.name){
        return next(badRequest("Havuz ismi tanimsiz .."));
    }

    PoolDBO.createPool(mPool)
        .then(pool => {
            res.status(200).send(pool);
        })
        .catch(err =>{
            next(err);
        })
}

exports.getAllPools = async  (req, res, next) => {
 
    [err, pools] = await to(PoolDBO.getAllPools());

    if(err) next(err);

    res.status(200).send(pools);
}