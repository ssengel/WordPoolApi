module.exports = (message, code) =>{
    let err = new Error(message);
    err.code = code;
    return err;
}