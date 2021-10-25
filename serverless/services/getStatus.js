const { TypedData } = require('ydb-sdk');
const { CustomError } = require('../utils');
const { errors: { GET_USER_NUMBER_ERROR } } = require('../constant');

const getUsersNumber = async (session, logger) => {
    let users;
    try {
        const query = `SELECT COUNT(*) as number FROM user WHERE token IS NOT NULL`;
        const prepareQuery = await session.prepareQuery(query);
        const { resultSets } = await session.executeQuery(prepareQuery);
        users = TypedData.createNativeObjects(resultSets[0])[0].number;

    }
    catch (e) {
        logger.fatal(e);
        throw new CustomError(GET_USER_NUMBER_ERROR);
    }
    return users;
};

module.exports = async (driver, logger) => {
    let serviceStatus = { users: 0 };

    await driver.tableClient.withSession(async (session) => {
        serviceStatus.users = await getUsersNumber(session, logger);
    });

    return { statusCode: 200, data: serviceStatus };
};
