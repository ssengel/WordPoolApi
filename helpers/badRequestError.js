module.exports = (message) =>{
    let error = new Error();
    error.status = 400;
    error.code = 400;
    error.message = message;
    return error;
}