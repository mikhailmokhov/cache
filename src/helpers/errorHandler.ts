import * as httpStatus from 'http-status'

export const notFound = (req, res) => {
    res.status(httpStatus.NOT_FOUND)
    res.json({
        message: 'Requested Resource Not Found'
    })
    res.end()
}

export const internalServerError = (err, req, res) => {
    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR)
    res.json({
        message: err.message,
        extra: err.extra,
        errors: err
    })
    res.end()
}