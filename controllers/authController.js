
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config');

//veri tabani isleri dbo dosyasina tasinmali 
let User = require('../models/User');


//Login User
exports.login = (req, res, next) => {

    let waitTill = new Date(new Date().getTime() + 1 * 1000);
    while(waitTill > new Date()){}
    
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Sunucuda bir hata var.\n' + err);
        if (!user) return res.status(401).send({ auth: false, message: "Kullanici Bulunamadi !" });
        
        //Verify
        let result = bcrypt.compareSync(req.body.password, user.password);
        if (!result) return res.status(401).send({ auth: false, message: "Sifre Dogrulanamadi !" });    
        
        //Create token
        let expire = 60*20;//20dk
        let token = jwt.sign(user.toJSON(), config.apiKey, { expiresIn: expire });
        
        res.status(200).send({ token: token, tokenExpire:expire, tokenCreatedAt:new Date().toString(), user: user});

    });
};



//Register User
exports.register = (req, res, next) => {

    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: "normal"
    }, (err, user) => {
        if (err) return res.status(500).send({ auth: false, message: err.message });
        res.status(200).send(user);
    });

};
