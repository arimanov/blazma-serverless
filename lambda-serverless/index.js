const { Driver, getCredentialsFromEnv, getLogger, TypedData } = require('ydb-sdk');
const { signIn } = require('./services/signIn');

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
        return { statusCode: 400, errorMessage: 'Request data is incorrect' };
    }


    console.log(parsedBody);

    if (httpMethod === 'POST' && path === '/v1/signin') {

        const driver = new Driver(entryPoint, dbName, authService);

        if (!await driver.ready(10000)) {
            logger.fatal(`Driver has not become ready in 10 seconds!`);
            return { statusCode: 503 };
        }

        try {
            await signIn(driver, logger, { parsedBody, ip: headers['X-Envoy-External-Address'] });
            await driver.destroy();
            return { statusCode: 200, data: { userId: -1 } }
        }
        catch (e) {
            logger.fatal(e);
            await driver.destroy();
            return { statusCode: 503, errorMessage: e.message };
        }
    }

    return { statusCode: 400 };
};
