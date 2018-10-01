let Word = require('../models/Word')

exports.createWord = (word, userId) => {
    console.log("hello DBO");
    
    let mWord = Word(word);
    mWord.userId = userId;

    return new Promise((resolve, reject) => {
        mWord.save()
            .then(word => {
                resolve(word);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getAllWords = () => {
    return new Promise((resolve, reject) => {
        Word.find({})
            .then(words => {
                resolve(words);
            })
            .catch(err => {
                reject(err);
            })

    })
}

exports.getWords = (userId) => {
    return new Promise((resolve, reject) => {
        Word.find({userId: userId})
            .then(words => {
                resolve(words);
            })
            .catch(err => {
                reject(err);
            })

    })
}

exports.getWord = (userId, wordId) =>{
    return new Promise((resolve, reject) =>{
        Word.findOne({userId: userId, _id: wordId})
            .then(word =>{
                resolve(word)
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.deleteWord = (userId, wordId) =>{
    return new Promise((resolve, reject) =>{
        Word.findOneAndRemove({userId: userId, _id: wordId})
            .then(word =>{
                resolve(word)
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.updateWord = (userId, wordId, word) =>{
    return new Promise((resolve, reject) =>{
        Word.findOneAndUpdate({userId: userId, _id: wordId}, word)
            .then(wordU =>{
                resolve(wordU)
            })
            .catch(err => {
                reject(err);
            })
    })
}
