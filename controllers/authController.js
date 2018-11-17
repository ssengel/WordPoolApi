
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config');

//veri tabani isleri dbo dosyasina tasinmali 
let User = require('../models/User');


//Login User
exports.login = (req, res, next) => {

    if(!req.body.email && !req.body.password){
        return res.status(400).send({ message: "Email ve Password Bos Gecilemez !"})
    }else if (!req.body.email){
        return res.status(400).send({ message: "Email Bos Gecilemez !"})
    }else if (!req.body.password){
        return res.status(400).send({ message: "Password Bos Gecilemez !"})
    }

    //simulation
    const waitTill = new Date(new Date().getTime() + 1 * 200);
    while(waitTill > new Date()){}
    
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Sunucuda bir hata var.\n' + err);
        if (!user) return res.status(401).send({ message: "Kullanici Bulunamadi !" });
        
        //Verify
        const result = bcrypt.compareSync(req.body.password, user.password);
        if (!result) return res.status(401).send({ message: "Sifre Dogrulanamadi !" });    
        
        //Create token
        const expire = 60*60*24*30;//30 day
        const token = jwt.sign(user.toJSON(), config.apiKey, { expiresIn: expire });
        
        res.status(200).send({ token: token, tokenExpire:expire, tokenCreatedAt:new Date().toString(), user: user});
    });
};



//Register User
exports.register = (req, res, next) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: "normal"
    }, (err, user) => {
        if (err) return res.status(500).send( err );
        res.status(200).send(user);
    });

};
