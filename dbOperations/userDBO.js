let User = require('../models/User');


exports.getUserInfo = (userId) =>{
    return User.findOne({_id: userId});
}