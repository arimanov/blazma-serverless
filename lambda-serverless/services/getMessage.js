const { TypedData } = require('ydb-sdk');
const { CustomError } = require('../utils');

const { errors: { MESSAGE_READ_ERROR }, RESPONSE_MAX_MESSAGES } = require('../constant');

const readMessages = async (session, logger) => {
    let messages;
    try {
        const query = `SELECT * FROM message ORDER BY created_at DESC LIMIT ${RESPONSE_MAX_MESSAGES}`;
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

const messageFilter = async (messages, lastReadMessageId) => {

    const lastMessageIndex = messages.reduce((lastInd, message, i) => message.id === lastReadMessageId ? i : lastInd);

    return messages.reduce((result, message, i) => {
        if (i < lastMessageIndex) {
            result.push(message);
        }
        return result;
    }, []);
};

module.exports = async (driver, logger, data) => {
    const { queryParameters: { after } } = data;
    let filteredMessage = [];

    await driver.tableClient.withSession(async (session) => {
        const allMessages = await readMessages(session, logger);
        console.log(allMessages);
        filteredMessage = await messageFilter(allMessages, after)
    });

    return { statusCode: 200, data: filteredMessage };
};
