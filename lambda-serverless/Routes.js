const signIn = require('./services/signIn');
const signOut = require('./services/signOut')

module.exports = [
    {
        method: 'POST',
        resource: '/v1/signin',
        service: (driver, logger, data) => signIn(driver, logger, data),
    },
    {
        method: 'POST',
        resource: '/v1/signout',
        service: (driver, logger, data) => signOut(driver, logger, data),
    }
];
