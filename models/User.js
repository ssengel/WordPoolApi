let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    image: {
        path: {
            type: String,
            trim: true,
            default:"publicImages/profile.jpeg"
        },
        originalname: {
            type: String,
            default: "profile.jpeg"
        }
    },
    createdAt: {type: String, default:new Date().toString()}
}, { versionKey: false });


module.exports = mongoose.model('User', UserSchema);
