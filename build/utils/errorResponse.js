export const errorResponse = ({ statusCode, error }, res) => {
    return res.status(statusCode).json({
        statusCode,
        error,
    });
};
