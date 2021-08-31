const { v4: uuidv4 } = require('uuid');
const { CustomError } = require('../utils');
const { TypedData } = require('ydb-sdk');

const { errors: { BODY_PARSE_ERROR, MESSAGE_LENGTH_ERROR, MESSAGE_ADD_ERROR, USER_NOT_FOUND} } = require('../constant');

const writeNewMessage = async (session, logger, userId, message) => {
    const messageId = uuidv4();
    let createdAt;
    try {
        const query = `INSERT INTO message (id, created_at, message, user_id) VALUES ('${messageId}', CurrentUtcTimestamp(), '${message}', ${userId})`;
        const prepareQuery = await session.prepareQuery(query);
        await session.executeQuery(prepareQuery);

        const prepareInsertedDataQuery = await session.prepareQuery(`SELECT created_at FROM message WHERE id = '${messageId}'`);
        const { resultSets } = await session.executeQuery(prepareInsertedDataQuery);
        const messageData = TypedData.createNativeObjects(resultSets[0])[0];

        if (messageData) {
            createdAt = messageData.createdAt;
        }
    }
    catch (e) {
        logger.fatal(e);
        throw new CustomError(MESSAGE_ADD_ERROR);
    }
    return { id: messageId, createdAt };
};

const getUserIdByToken = async (session, logger, token) => {
    let user;
    try {
        const query = `SELECT * FROM user WHERE token = '${token}'`;
        const { resultSets } = await session.executeQuery(query);
        user = TypedData.createNativeObjects(resultSets[0]);
    }
    catch (e) {
        logger.fatal(e);
        throw new CustomError(MESSAGE_ADD_ERROR);
    }
    if (user.length !== 1) {
        throw new CustomError(USER_NOT_FOUND);
    }
    return user[0].id;
}

module.exports = async (driver, logger, data) => {
    const { parsedBody: { message, token } } = data;
    let messageData = {};

    if (!message || !token) {
        throw new CustomError(BODY_PARSE_ERROR);
    }

    if (message.length === 0 || message.length > 128) {
        throw new CustomError(MESSAGE_LENGTH_ERROR);
    }

    await driver.tableClient.withSession(async (session) => {
        const userId = await getUserIdByToken(session, logger, token);
        messageData = await writeNewMessage(session, logger, userId, message);
    });

    return { statusCode: 201, data: messageData };

};
