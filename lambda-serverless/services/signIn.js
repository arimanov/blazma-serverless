const { TypedData } = require('ydb-sdk');
const { currentDateTime } = require('../utils');
const { MAX_USERNAME_LENGTH } = require('../constant');

module.exports.signIn = async (driver, logger, data) => {

    const { parsedBody, ip } = data;

    const { name } = parsedBody;

    if (!name || name.length > MAX_USERNAME_LENGTH) {
        throw new Error(`Username is incorrect`);
    }
    console.log(name);

    await driver.tableClient.withSession(async (session) => {

        //TODO: check user name
        const prepExistName = await session.prepareQuery(`SELECT COUNT(*) FROM user WHERE name = '${name}'`);

        const prepLastId = await session.prepareQuery('SELECT id FROM user ORDER BY id DESC LiMIT 1');
        const { resultSets } = await session.executeQuery(prepLastId);
        const lastId = (TypedData.createNativeObjects(resultSets[0])[0].id) + 1;

        const query = `INSERT INTO user (id, name, last_ip, created_at) VALUES (${lastId}, '${name}', '${ip}', Datetime("${currentDateTime()}"))`;
        const preparedQueryIns = await session.prepareQuery(query);
        try {
            //await session.executeQuery(preparedQueryIns);
        }
        catch (e) {
            throw new Error(`Error! Reason: ${e.message}`);
        }
    });
}
