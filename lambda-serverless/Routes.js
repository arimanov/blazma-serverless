const signIn = require('./services/signIn');

module.exports = [
    {
        method: 'POST',
        resource: '/v1/signin',
        service: (driver, logger, data) => signIn(driver, logger, data),
    },
    {
        method: 'POST',
        resource: '/v1/signout',
    }
];
