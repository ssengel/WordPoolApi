let Word = require('../models/Word')


exports.createWord = (word) => {

    let mWord = Word(word);

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

exports.getWords = () => {
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