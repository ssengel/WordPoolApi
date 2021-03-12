let WordDBO = require("../dbOperations/wordDBO");
let badRequest = require("../helpers/badRequestError");
let to = require('../helpers/to');


exports.createWord = async (req, res, next) => {

  const userId = req.user._id;
  const poolId = req.body.poolId;
  let data = req.body;

  if (!data.eng || !data.tr || !data.poolId) {
    return next(badRequest("Kelimenin Bazi Bilgileri Eksik !!"));
  }

  [err, createdWord] = await to(WordDBO.createWord(data, userId, poolId));
  if (err) next(err);
  res.status(200).send(createdWord);

};

exports.getWords = async (req, res, next) => {

  const userId = req.user._id;
  [err, data] = await to(WordDBO.getWords(userId));
  
  if(err) next(err);
  res.status(200).send(data);
};

exports.getWordsByPoolId = async (req, res, next) => {

  const userId = req.user._id;
  const poolId = req.params.poolId;


  [err, data] = await to(WordDBO.getWordsByPoolId(userId, poolId));
  if(err) next(err)
  res.status(200).send(data);

};

exports.getWord = async (req, res, next) => {

  const userId = req.user._id;
  const wordId = req.params.wordId;

  [err, data] = await to(WordDBO.getWord(userId, wordId));
  if(err) next(err)
  res.status(200).send(data);


};

exports.deleteWord = async (req, res, next) => {

  const userId = req.user._id;
  const wordId = req.params.wordId;

  [err, data] = await to(WordDBO.deleteWord(userId, wordId));
  if(err) next(err)
  res.status(200).send(data);
  
};

exports.updateWord = async (req, res, next) => {
  console.log(req.body)
  const userId = req.user._id;
  const wordId = req.params.wordId;
  const mWord = req.body;

  if (!mWord.eng || !mWord.tr) {
    return next(badRequest("Kelimenin Bazi Bilgileri Eksik !!"));
  }

  [err, data] = await to(WordDBO.updateWord(userId, wordId, mWord));
  if(err) next(err)
  res.status(200).send(data);

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

exports.getWordsByName = async (req, res, next) => {
  const userId = req.user._id;
  const key = req.params.key;

  [err, data] = await to(WordDBO.getWordsByName(userId, key));
  if (err) {
    return next(err);
  }
  res.status(200).send(data);
}

exports.getRandomWords = async (req, res, next) => {

  const from = Number(req.params.from);
  const too = Number(req.params.to);

  [err, data] = await to(WordDBO.getRandomWords(from, too));
  if (err) {
    return next(err);
  }
  res.status(200).send(data);
}

exports.getTotalWordCount = async (req, res, next) =>{
  const userId = req.user._id;

  [err, data] = await to(WordDBO.getTotalWordCount(userId));
  if(err) return next(err)
  res.status(200).send({totalWordCount: data});
}



