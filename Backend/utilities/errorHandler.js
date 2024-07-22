const errorHandler = (statusCode, message) => {
    const error = new Error();
    // error.success = false;
    error.status = statusCode;
    error.message = message;

    return error;
};

module.exports = errorHandler;