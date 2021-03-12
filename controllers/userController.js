let to = require('../helpers/to');
let UserDBO = require('../dbOperations/userDBO');
let imageUpload = require('../helpers/imageUpload');
let User = require('../models/User')

let WordDBO = require('../dbOperations/wordDBO');
let PoolDBO = require('../dbOperations/poolDBO');
let SubscriptionDBO = require('../dbOperations/subscriptionDBO');

exports.getUserInfo = async (req, res, next) =>{
    const userId = req.user._id;

    [err, data] = await to(UserDBO.getUserInfo(userId));
    if(err) return next(err);
    res.status(200).send(data);
}

exports.uploadImage = (req, res, next) => {
    let file = {};
    imageUpload(req, res, (uploadError) => {
        if (uploadError)
            return res.status(422).send("resim yuklenirken hata meydana geldi !");
        else{
            file = req.file;
            User.findById(req.user._id,(err,user) =>{
                if(err) return res.status(433).send(err.message);
                user.image = {
                    originalname: file.originalname,
                    path: file.path
                } 
                user.save((err) =>{
                    if(err) return res.status(433).send(err)
                })
                return res.status(200).send(user);
            })
        }
    });
};

exports.getStatistic = async (req, res, next) =>{
    const userId = req.user._id;
    
    const task_1 = WordDBO.getTotalWordCount;
    const task_2 = PoolDBO.getTotalPoolCount;
    const task_3 = SubscriptionDBO.getSubscriptionCount;

    [err, [wordCount, poolcount, subCount]] = await to(Promise.all([
        task_1(userId),
        task_2(userId),
        task_3(userId)
    ]))

    if(err) return next(err);
    res.status(200).send({
        totalWordCount: wordCount,
        totalPoolCount: poolcount,
        totalSubscriptionCount: subCount
    })
    
}