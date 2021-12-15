const { TypedData } = require('ydb-sdk');
const { CustomError } = require('../utils');

const { errors: { MESSAGE_READ_ERROR, ACCESS_DENIED, USER_CHECK_ERROR }, RESPONSE_MAX_MESSAGES } = require('../constant');

const readMessages = async (session, logger) => {
    let messages;
    try {
        const query = `SELECT m.message AS message, m.id AS id, m.created_at AS created_at, u.name as userName
                        FROM message AS m LEFT JOIN user AS u ON m.user_id = u.id ORDER BY created_at DESC LIMIT ${RESPONSE_MAX_MESSAGES}`
        const prepareQuery = await session.prepareQuery(query);
        const { resultSets } = await session.executeQuery(prepareQuery);
        messages = TypedData.createNativeObjects(resultSets[0]);
    }
    catch (e) {
        logger.fatal(e);
        throw new CustomError(MESSAGE_READ_ERROR);
    }
    return messages;
};

const checkUserAccess = async (session, logger, token) => {
    let tokenFoundNumber = 0;
    try {
        const query = `SELECT COUNT(*) AS tfn FROM user WHERE token = '${token}'`;
        const prepareQuery = await session.prepareQuery(query);
        const { resultSets } = await session.executeQuery(prepareQuery);
        tokenFoundNumber = TypedData.createNativeObjects(resultSets[0])[0].tfn;
    }
    catch (e) {
        logger.fatal(e);
        throw new CustomError(USER_CHECK_ERROR);
    }
    if (tokenFoundNumber !== 1) {
        throw new CustomError(ACCESS_DENIED);
    }
};

const messageFilter = async (messages, lastReadMessageId) => {

    const lastMessageIndex = messages.reduce((lastInd, message, i) =>
        message.id === lastReadMessageId ? i : lastInd, RESPONSE_MAX_MESSAGES);

    return messages.reduce((result, message, i) => {
        if (i < lastMessageIndex) {
            result.push(message);
        }
        return result;
    }, []);
};

module.exports = async (driver, logger, data) => {
    const { queryParameters: { after, token } } = data;

    let filteredMessage = [];

    await driver.tableClient.withSession(async (session) => {
        await checkUserAccess(session, logger, token);

        const allMessages = await readMessages(session, logger);
        filteredMessage = await messageFilter(allMessages, after)
    });

    return { statusCode: 200, data: filteredMessage };
};
