const CustomError = require('./CustomError');

module.exports = {
    currentDateTime: () => {
        const d = new Date();
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}Z`;
    },
    errResponse: (code, message) => {
        return {
            statusCode: code,
            body: JSON.stringify({ message }),
            headers: { 'Content-Type': 'application/json' },
        };
    },
    CustomError,
};

