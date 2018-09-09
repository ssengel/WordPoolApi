let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    createdAt: {type: String, default:new Date().toString()}
}, { versionKey: false });


module.exports = mongoose.model('User', UserSchema);
