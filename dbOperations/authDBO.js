

//eksik

let User = require('../models/User');

exports.register = (userData) =>{

    return new Promise((resolve, reject) => {

        let hashedPassword = bcrypt.hashSync(req.body.password, 8); //  model de yapilmali..

        let mUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: "normal"
        })

        mUser.save()
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            })

    })
    
}
