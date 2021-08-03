const { Driver, getCredentialsFromEnv, getLogger, TypedData } = require('ydb-sdk');

module.exports.handler = async function (event, context) {

    const logger = getLogger({level: 'debug'});
    const entryPoint = '';
    const dbName = '';

    const authService = getCredentialsFromEnv(entryPoint, dbName, logger);

    const { path, httpMethod, body } = event;

    if (httpMethod === 'POST' && path === '/v1/signin') {

        const driver = new Driver(entryPoint, dbName, authService);

        if (!await driver.ready(10000)) {
            logger.fatal(`Driver has not become ready in 10 seconds!`);
            return { statusCode: 503 };
        }

        await driver.tableClient.withSession(async (session) => {
            const prepLastId = await session.prepareQuery('SELECT id FROM user ORDER BY id DESC LiMIT 1');
            const { resultSets } = await session.executeQuery(prepLastId);
            const lastId = (TypedData.createNativeObjects(resultSets[0])[0].id) + 1;
            const preparedQueryIns = await session.prepareQuery(`INSERT INTO user (id, name) VALUES (${lastId}, 'bobo2')`);
            try {
                await session.executeQuery(preparedQueryIns);
                return { statusCode: 200, body: 'Test' };
            }
            catch (e) {
                logger.fatal('Error! Reason: ', e.message)
            }
            await driver.destroy();
        });
    }

    return {
        statusCode: 200,
        body: [event, context],
    };
};