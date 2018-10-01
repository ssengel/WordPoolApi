let auth = require('../controllers/authController');
let word = require('../controllers/wordController');

exports.mainRoute = (app) => {

    //auth
    app.post('/login', auth.login)
        .post('/register', auth.register)

    //word
    app.get('/word', word.getAllWords)
        .post('/user/:id/word', word.createWord)
        .get('/user/:id/word', word.getWords)
        .get('/user/:userId/word/:wordId', word.getWord)
        .delete('/user/:userId/word/:wordId', word.deleteWord)
        .put('/user/:userId/word/:wordId', word.updateWord)
}