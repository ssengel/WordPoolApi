const OperationDBO = require('../dbOperations/operationDBO');


exports.getAllOperations = (req, res, next) => {
    OperationDBO.getAllOperations()
        .then(ops =>{
            res.status(200).send(ops);
        })
        .catch(err =>{
            next(err);
        })
}

exports.getOperations = (req, res, next) => {
    
    const userId = req.user._id;

    OperationDBO.getOperations(userId)
        .then(ops => {
            res.status(200).send(ops);
        })
        .catch(err =>{
            next(err);
        })
}


exports.deleteOperation = (req, res, next) => {
    
    const userId = req.user._id;
    const opId = req.params.operationId;
    
    OperationDBO.deleteOperation(userId, opId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err =>{
            next(err);
        })
}

exports.deleteOperations = (req, res, next) => {
    
    const userId = req.user._id;

    OperationDBO.deleteOperations(userId)
        .then(ops => {
            res.status(200).send(ops);
        })
        .catch(err =>{
            next(err);
        })
}

exports.deleteOperationsByWordId = (req, res, next) => {
    
    const userId = req.user._id;
    const wordId = req.params.wordId;

    OperationDBO.deleteOperationsByWordId(userId, wordId)
        .then(ops => {
            res.status(200).send(ops);
        })
        .catch(err =>{
            next(err);
        })
}

