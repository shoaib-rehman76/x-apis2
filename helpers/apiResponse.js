export const apiResponse = (status, message, data, res, statusCode) => {
    return res.status(statusCode).json({
        status,
        message,
        data,
    })
}