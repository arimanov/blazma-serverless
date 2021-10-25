const signIn = require('./services/signIn');
const signOut = require('./services/signOut')
const addMessage = require('./services/addMessage');
const getMessage = require('./services/getMessage');
const getStatus = require('./services/getStatus');

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
    },
    {
        method: 'POST',
        resource: '/v1/messages',
        service: (driver, logger, data) => addMessage(driver, logger, data),
    },
    {
        method: 'GET',
        resource: '/v1/messages',
        service: (driver, logger, data) => getMessage(driver, logger, data),
    },
    {
        method: 'GET',
        resource: '/v1/status',
        service: (driver, logger,) => getStatus(driver, logger),
    },
];
