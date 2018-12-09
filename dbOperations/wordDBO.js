let Word = require('../models/Word')
let to = require('../helpers/to')

exports.createWord = (data, userId, poolId) => {
    let newWord = Word(data);
    newWord.userId = userId;
    newWord.poolId = poolId;

    return newWord.save();
}

exports.getWords = (userId) => {
    return Word.find({userId: userId})
}

exports.getWordsByPoolId = (userId, poolId) => {
    return Word.find({userId: userId, poolId:poolId});
}

exports.getWord = (userId, wordId) =>{
    return Word.findOne({userId: userId, _id: wordId});
}

exports.deleteWord = (userId, wordId) =>{
    return Word.findOneAndRemove({userId: userId, _id: wordId})
}

exports.updateWord = (userId, wordId, word) =>{
    return Word.findOneAndUpdate({userId: userId, _id: wordId}, word);
}

exports.getWordsFromTo = (userId, from, to) => {
    
    return new Promise((resolve, reject) =>{

        let f1 = Word.find({userId:userId}).skip(from).limit(to-from);
        let f2 = Word.countDocuments({userId: userId});

        Promise.all([f1, f2])
            .then(([words, wordCount]) => {
                resolve({totalWords: wordCount, words: words})
            })
            .catch((err) =>{
                reject(err)
            })
    })
}

exports.getWordsByName = (userId, key) =>{
    const regex = new RegExp(key);
    return Word.find({userId: userId, eng:{ $regex: regex, $options: 'i' }});
}

exports.getWordCountByPoolId = ( poolId) =>{
    return Word.countDocuments({poolId:poolId})
}


exports.getRandomWords = (from, to) => {
    // return Word.find().sort({createdAt: -1}).skip(from).limit(to-from);    
    return Word.find().sort({createdAt: -1}).limit(to-from); 
}


