let auth = require('../controllers/authController');
let word = require('../controllers/wordController');
let pool =require('../controllers/poolController');
let user = require('../controllers/userController');
let explore = require('../controllers/exploreController');

exports.mainRoute = (app) => {

    //auth
    app.post('/login', auth.login)
        .post('/register', auth.register)

    // user
    app.get('/user/userInfo', user.getUserInfo)
        .post('/user/updateImage', user.uploadImage)
        .get('/user/statistic', user.getStatistic)
        
    //word
    app.post('/word', word.createWord)
        .get('/word', word.getWords)
        .get('/word/totalWordCount', word.getTotalWordCount)
        .get('/word/:wordId', word.getWord)
        .get('/word/search/:key', word.getWordsByName)
        .get('/word/from/:from/to/:to',word.getWordsFromTo)
        .delete('/word/:wordId', word.deleteWord)
        .put('/word/:wordId', word.updateWord)
        .get('/word/random/:from/:to', word.getRandomWords)
        

    //pool
    app.post('/pool', pool.createPool)    
        .get('/pool', pool.getPools)
        .get('/pool/:poolId',pool.getPool)
        .get('/pool/:poolId/word',word.getWordsByPoolId)// ?
        .delete('/pool/:poolId', pool.deletePool)
        .put('/pool/:poolId', pool.updatePool)
        .get('/pool/:poolId/wordCount', pool.getWordCount)
        .get('/pool/exampleWords')

    //explore
    app.get('/explore', explore.getAllPools)
        .get('/explore/userInfo/:userId', explore.getUserInfo)
        .get('/explore/pool/:poolId/word', explore.getWordsByPoolId)
        .get('/explore/pool/:poolId/exampleWords', explore.getExampleWordByPoolId)
        .get('/explore/pool/:poolId/subscribe', explore.subscribe)
        .delete('/explore/pool/:poolId/unSubscribe', explore.unSubscribe)
        .get('/explore/pool/:poolId/checkSubscription', explore.checkSubscription)
        .get('/explore/getSubscribedPools', explore.getSubscribedPools)

    //explore mobile
    app.get('/mbl/explore', explore.mblGetAllPools)
        .get('/mbl/explore/subscription', explore.mblGetSubscriptions)
    
}