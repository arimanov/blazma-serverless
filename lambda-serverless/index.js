const { Driver, getCredentialsFromEnv, getLogger, TypedData } = require('ydb-sdk');
const { signIn } = require('./services/signIn');
const { IP_HEADER } = require('./constant');
const { errResponse } = require('./utils')

module.exports.handler = async function (event, context) {

    const logger = getLogger({ level: 'debug' });

    const entryPoint = process.env.ENTRY_POINT;
    const dbName = process.env.DB_NAME;

    const authService = getCredentialsFromEnv(entryPoint, dbName, logger);

    const { path, httpMethod, body, headers } = event;

    let parsedBody;

    try {
        parsedBody = JSON.parse(body);
    }
    catch (e) {
        return errResponse(400, 'Request data is incorrect');
    }

    if (httpMethod === 'POST' && path === '/v1/signin') {

        const driver = new Driver(entryPoint, dbName, authService);

        if (!await driver.ready(10000)) {
            logger.fatal(`Driver has not become ready in 10 seconds!`);
            return errResponse(503, 'Database problems, please notify me');
        }

        try {
            const userData = await signIn(driver, logger, { parsedBody, ip: headers[IP_HEADER] });
            return {
                statusCode: 201,
                body: JSON.stringify(userData),
                headers: { 'Content-Type': 'application/json' },
            };
        }
        catch ({ httpCode, message }) {
            logger.fatal(message);
            return errResponse(httpCode, message);
        }
        finally {
            await driver.destroy();
        }
    }

    return errResponse(404, 'Unknown endpoint');
};
