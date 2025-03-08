// A reusable function to send a structured JSON response
const customResponse = (res, status, success, message, data, error) => {
    return res.status(status).json({
        success,
        message,
        data,
        error
    });
}

module.exports = customResponse;