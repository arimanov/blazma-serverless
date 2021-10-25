const { TypedData } = require('ydb-sdk');

const { CustomError } = require('../utils');

const { errors: { BODY_PARSE_ERROR, USER_CHECK_ERROR, USER_NOT_FOUND, USER_UPDATE_ERROR } } = require('../constant');


const getUserId = async (session, logger, name, token) => {
    let userId
    try {
        const prepareQuery = await session.prepareQuery(`SELECT id FROM user WHERE name = '${name}' AND token = '${token}'`);
        const { resultSets } = await session.executeQuery(prepareQuery);
        userId = TypedData.createNativeObjects(resultSets[0]);
    }
    catch (e) {
        logger.fatal(e);
        throw new CustomError(USER_CHECK_ERROR);
    }

    if (userId.length !== 1) {
        throw new CustomError(USER_NOT_FOUND);
    }

    return userId[0].id;
};

const removeUserToken = async (session, logger, userId) => {
    try {
        const prepareQuery = await session.prepareQuery(`UPDATE user SET token = null WHERE id = ${userId}`);
        await session.executeQuery(prepareQuery);
    }
    catch (e) {
        logger.fatal(e);
        throw new CustomError(USER_UPDATE_ERROR);
    }
};

module.exports = async (driver, logger, data) => {

    const { parsedBody: { name, token } } = data;

    if (!name || !token) {
        throw new CustomError(BODY_PARSE_ERROR);
    }

    await driver.tableClient.withSession(async (session) => {
        const userId = await getUserId(session, logger, name, token);
        await removeUserToken(session, logger, userId);
    });

    return { statusCode: 200, data: {} };
};
