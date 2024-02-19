const successResponseHandler = (res, data) => {
    const statusCode = 200

    res.status(statusCode).json(data)
}

const errorResponseHandler = (res, error) => {
    const statusCode = 500

    res.status(statusCode).json(error)
}

const authErrorHandler = (res, error) => {
    const statusCode = 401

    res.status(statusCode).json(error)
}

module.exports = {
    successResponseHandler,
    errorResponseHandler,
    authErrorHandler
}