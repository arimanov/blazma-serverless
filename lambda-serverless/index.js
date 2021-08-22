const { getCredentialsFromEnv, getLogger, Driver } = require('ydb-sdk');
const { IP_HEADER } = require('./constant');
const { errResponse } = require('./utils');
const { errors: { DRIVER_INIT_ERROR, BODY_PARSE_ERROR }, DRIVER_INIT_TIMEOUT, ENDPOINT_NOT_FOUND } = require('./constant');
const Routes = require('./Routes');

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
        return errResponse(BODY_PARSE_ERROR.code, BODY_PARSE_ERROR.message);
    }

    for (const { method, resource, service } of Routes) {
        if (httpMethod === method && path === resource) {

            const driver = new Driver(entryPoint, dbName, authService);

            if (!await driver.ready(DRIVER_INIT_TIMEOUT)) {
                logger.fatal(`Driver has not become ready in 10 seconds!`);
                return errResponse(DRIVER_INIT_ERROR.code, DRIVER_INIT_ERROR.message);
            }

            try {
                const { statusCode, data } = await service(driver, logger, { parsedBody, ip: headers[IP_HEADER] });
                return {
                    statusCode: statusCode,
                    body: JSON.stringify(data),
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
            break;
        }
    }

    return errResponse(ENDPOINT_NOT_FOUND.code, ENDPOINT_NOT_FOUND.message);
};
