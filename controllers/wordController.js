let WordDBO = require("../dbOperations/wordDBO");
let badRequest = require("../helpers/badRequestError");
let OperationDBO = require('../dbOperations/operationDBO');
let to = require('../helpers/to');


exports.createWord = async (req, res, next) => {

  const userId = req.user._id;
  let mWord = req.body;

  if (!mWord.eng || !mWord.tr) {
    return next(badRequest("Kelimenin Bazi Bilgileri Eksik !!"));
  }

  [err, word] = await to(WordDBO.createWord(mWord, userId));
  if (err) next(err);

  if (req.headers['device'] === 'angular') {
    [err, op] = await to(OperationDBO.createOperation(userId, word._id, "insert"));
    if (err) next(err);
  }

  res.status(200).send(word);

};

exports.getAllWords = (req, res, next) => {
  WordDBO.getAllWords()
    .then(words => {
      res.status(200).send(words);
    })
    .catch(err => {
      next(err);
    });
};

exports.getWords = (req, res, next) => {

  const userId = req.user._id;

  WordDBO.getWords(userId)
    .then(words => {
      res.status(200).send(words);
    })
    .catch(err => {
      next(err);
    });
};

exports.getWord = (req, res, next) => {

  const userId = req.user._id;
  const wordId = req.params.wordId;

  WordDBO.getWord(userId, wordId)
    .then(word => {
      res.status(200).send(word);
    })
    .catch(err => {
      next(err);
    });
};

exports.updateWord = (req, res, next) => {

  const userId = req.user._id;
  const wordId = req.params.wordId;
  const mWord = req.body;

  if (!mWord.eng || !mWord.tr) {
    return next(badRequest("Kelimenin Bazi Bilgileri Eksik !!"));
  }

  WordDBO.updateWord(userId, wordId, mWord)
    .then(word => {
      if (req.headers['device'] === 'angular') {
        OperationDBO.createOperation(userId, word._id, "update")
      }
      res.status(200).send(word);
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteWord = (req, res, next) => {

  const userId = req.user._id;
  const wordId = req.params.wordId;

  WordDBO.deleteWord(userId, wordId)
    .then(word => {
      OperationDBO.deleteOperationsByWordId(userId, wordId)
        .then(op => {
          if (req.headers['device'] === 'angular') {
            OperationDBO.createOperation(userId, word._id, "delete")
          }
          res.status(200).send(word);
        })
    })
    .catch(err => {
      next(err);
    });
};

exports.getWordsFromTo = async (req, res, next) => {
  
  const userId = req.user._id;
  const from = Number(req.params.from);
  const too = Number(req.params.to);

  [err, data] = await to(WordDBO.getWordsFromTo(userId, from, too));
  if (err) {
    return next(err);
  }
  res.status(200).send(data);
}

exports.getWordsByName = async (req, res, next)=>{
  const userId = req.user._id;
  const key = req.params.key;

  [err, data] = await to (WordDBO.getWordsByName(userId,key));
  if (err) {
    return next(err);
  }  
  res.status(200).send(data);
}