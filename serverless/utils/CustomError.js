module.exports = class CustomError extends Error {
    constructor({ message, code }) {
        super(message);
        this.httpCode = code;
    }
}
