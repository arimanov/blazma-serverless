const { TypedData } = require('ydb-sdk');
const { CustomError } = require('../utils');
const { errors: { GET_USER_NUMBER_ERROR, ACCESS_DENIED, DRIVER_INIT_ERROR } } = require('../constant');

const getUsersNumber = async (session, logger, token) => {
    let users;
    let userIsExist;

    try {
        const queryCheckUser = `SELECT COUNT(*) AS userExist FROM user WHERE token = '${token}'`;
        const { resultSets: checkUserResultSets } = await session.executeQuery(queryCheckUser);
        userIsExist = !!TypedData.createNativeObjects(checkUserResultSets[0])[0].userExist;
    } catch (e) {
        logger.fatal(e);
        throw new CustomError(DRIVER_INIT_ERROR);
    }

    if (!userIsExist) {
        throw new CustomError(ACCESS_DENIED);
    }

    try {
        const query = `SELECT COUNT(*) as number FROM user WHERE token IS NOT NULL`;
        const prepareQuery = await session.prepareQuery(query);
        const { resultSets } = await session.executeQuery(prepareQuery);
        users = TypedData.createNativeObjects(resultSets[0])[0].number;
    } catch (e) {
        logger.fatal(e);
        throw new CustomError(GET_USER_NUMBER_ERROR);
    }
    return users;
};

module.exports = async (driver, logger, data) => {
    const { queryParameters: { token } } = data;
    let serviceStatus = { users: 0 };

    await driver.tableClient.withSession(async (session) => {
        serviceStatus.users = await getUsersNumber(session, logger, token);
    });

    return { statusCode: 200, data: serviceStatus };
};
