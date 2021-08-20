const { TypedData } = require('ydb-sdk');
const { currentDateTime, CustomError } = require('../utils');
// noinspection SpellCheckingInspection
const { v4: uuidv4 } = require('uuid');

const {
    MAX_USERNAME_LENGTH,
    errors: { USER_IS_EXIST, INCORRECT_NAME, USER_CREATE_ERROR, USER_CHECK_ERROR, BODY_PARSE_ERROR }
} = require('../constant');


const checkUserExist = async (session, logger, name) => {
    let existUser;
    try {
        const prepExistName = await session.prepareQuery(`SELECT COUNT(*) AS amount FROM user WHERE name = '${name}'`);
        const { resultSets } = await session.executeQuery(prepExistName);
        existUser = TypedData.createNativeObjects(resultSets[0])[0].amount;
    }
    catch (e) {
        logger.fatal(e);
        throw new CustomError(USER_CHECK_ERROR);
    }
    if (existUser > 0) {
        throw new CustomError(USER_IS_EXIST);
    }
};

const getLastUserId = async (session, logger) => {
    let id;
    try {
        const prepLastId = await session.prepareQuery('SELECT id FROM user ORDER BY id DESC LiMIT 1');
        const { resultSets } = await session.executeQuery(prepLastId);
        id = (TypedData.createNativeObjects(resultSets[0])[0].id) + 1;
    }
    catch (e) {
        logger.fatal(e);
        throw new CustomError(USER_CHECK_ERROR);
    }
    return id;
};

const createNewUser = async (session, logger, name, lastId, ip, token) => {

    const query = `INSERT INTO user (id, name, last_ip, created_at, token) VALUES (${lastId}, '${name}', '${ip}', Datetime("${currentDateTime()}"), '${token}')`;

    try {
        const preparedQueryIns = await session.prepareQuery(query);
        await session.executeQuery(preparedQueryIns);
    }
    catch (e) {
        logger.fatal(e);
        throw new CustomError(USER_CREATE_ERROR);
    }
};

module.exports.signIn = async (driver, logger, data) => {

    const token = uuidv4();

    const { parsedBody, ip } = data;
    const { name } = parsedBody;

    if (!name) {
        throw new CustomError(BODY_PARSE_ERROR);
    }

    if (name.length > MAX_USERNAME_LENGTH) {
        throw new CustomError(INCORRECT_NAME);
    }

    let lastFreeId;

    await driver.tableClient.withSession(async (session) => {

        await checkUserExist(session, logger, name);

        lastFreeId = await getLastUserId(session, logger);

        await createNewUser(session, logger, name, lastFreeId, ip, token);
    });

    return { userId: lastFreeId, token };
}
