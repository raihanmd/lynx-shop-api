export const customResponse = ({ statusCode, message, payload }, res) => {
    return res.status(statusCode).json({
        statusCode,
        payload,
        message,
    });
};
