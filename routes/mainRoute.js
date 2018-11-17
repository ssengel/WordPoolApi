let auth = require('../controllers/authController');
let word = require('../controllers/wordController');
let pool =require('../controllers/poolController');
let pWord = require('../controllers/pWordController');
let operation = require('../controllers/operationController');

exports.mainRoute = (app) => {

    //auth
    app.post('/login', auth.login)
        .post('/register', auth.register)

    //word
    app.get('/allWords', word.getAllWords)
        .post('/word', word.createWord)
        .get('/word/from/:from/to/:to',word.getWordsFromTo)
        .get('/word', word.getWords)
        .get('/word/:wordId', word.getWord)
        .get('/word/search/:key', word.getWordsByName)
        .delete('/word/:wordId', word.deleteWord)
        .put('/word/:wordId', word.updateWord)

    //pool, pword
    app.get('/pool', pool.getAllPools)
        .post('/pool', pool.createPool)
        .get('/pool/:poolId/pword', pWord.getPWordsByPoolId)
        .post('/pool/:poolId/pword', pWord.createPWord)
        .delete('/pool/:poolId/pword/:pWordId', pWord.deletePWord)
        .put('/pool/:poolId/pword/:pWordId', pWord.updatePWord)
        .get('/pword',pWord.getAllPWords)//test

    //operations
    app.get('/allOperations', operation.getAllOperations) // test 
        .get('/operation', operation.getOperations)
        .delete('/operation',operation.deleteOperations)
        .delete('/operation/:operationId', operation.deleteOperation)
        // .delete('/operation/word:wordId', operation.deleteOperationsByWordId)
}