let auth = require('../controllers/authController');
let word = require('../controllers/wordController');

exports.mainRoute = (app) => {

    //auth
    app.post('/login', auth.login)
        .post('/register', auth.register)

    //word
    app.get('/word', word.getWords)
        .post('/word', word.createWord)

}