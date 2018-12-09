let to = require('../helpers/to');
let UserDBO = require('../dbOperations/userDBO');

let imageUpload = require('../helpers/imageUpload');
let User = require('../models/User')

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