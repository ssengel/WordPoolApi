let WordDBO = require("../dbOperations/wordDBO");
let badRequest = require("../helpers/badRequestError");

exports.createWord = (req, res, next) => {
  let mWord = req.body;
  let mUserId = req.params.id;

  if (!mWord.eng || !mWord.tr) {
    return next(badRequest("Kelimenin Bazi Bilgileri Eksik !!"));
    // return res.status(400).send('Kelimenin bazi bilgileri eksik');
  }

  WordDBO.createWord(mWord, mUserId)
    .then(word => {
      res.status(200).send(word);
    })
    .catch(err => {
      next(err);
    });
};

exports.getAllWords = (req, res, next) => {
  //simulation delay
  var waitTill = new Date(new Date().getTime() + 1 * 1000);
  while (waitTill > new Date()) {}
  WordDBO.getAllWords()
    .then(words => {
      res.status(200).send(words);
    })
    .catch(err => {
      next(err);
    });
};

exports.getWords = (req, res, next) => {
  let userId = req.params.id;

  WordDBO.getWords(userId)
    .then(words => {
      res.status(200).send(words);
    })
    .catch(err => {
      next(err);
    });
};

exports.getWord = (req, res, next) => {
  let userId = req.params.userId;
  let wordId = req.params.wordId;

  WordDBO.getWord(userId, wordId)
    .then(word => {
      res.status(200).send(word);
    })
    .catch(err => {
      next(err);
    });
};

exports.updateWord = (req, res, next) => {

  let userId = req.params.userId;
  let wordId = req.params.wordId;
  let mWord = req.body;

  if (!mWord.eng || !mWord.tr) {
    return next(badRequest("Kelimenin Bazi Bilgileri Eksik !!"));
  }
  
  WordDBO.updateWord(userId, wordId, mWord)
    .then(word => {
      res.status(200).send(word);
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteWord = (req, res, next) => {
  let userId = req.params.userId;
  let wordId = req.params.wordId;

  WordDBO.deleteWord(userId, wordId)
    .then(word => {
      res.status(200).send(word);
    })
    .catch(err => {
      next(err);
    });
};
