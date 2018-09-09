let WordDBO = require('../dbOperations/wordDBO');
let badRequest = require('../helpers/badRequestError');


exports.createWord = (req, res, next) => {
    let mWord = req.body;

    if (!mWord.userId ||
        !mWord.eng ||
        !mWord.tr ||
        !mWord.sentence
    ) {
        return badRequest('Kelimenin Bazi Bilgileri Eksik !!');
    }

    WordDBO.createWord(mWord)
        .then(word => {
            res.status(200).send(word);
        })
        .catch(err => {
            next(err);
        })
}


exports.getWords = (req, res, next) => {

    WordDBO.getWords()
        .then(words => {
            res.status(200).send(words);
        })
        .catch(err => {
            next(err);
        })
}
