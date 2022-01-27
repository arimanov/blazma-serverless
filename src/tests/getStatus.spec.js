const { initTestGround, stubSQLResult } = require('./testGround');
const { handler } = require('../index');

initTestGround();

describe('Get status', () => {

    const testData = {
        path: '/v1/status',
        httpMethod: 'GET',
        body: {},
        queryStringParameters: {},
        headers: {}
    };

    test('User is exist', async () => {
        //given
        const userToken = '9ecceed9-10fc-4ec0-b0e1-22dbeabb2127'
        stubSQLResult([
            { numberOfQuery: 1, result: [{ userExist: 1 }] },
            { numberOfQuery: 2, result: [{ number: 10 }] }
        ]);

        const event = {
            ...testData,
            queryStringParameters: { token: userToken },
        };

        //when
        const { statusCode, body } = await handler(event,);

        //then
        expect(statusCode).toBe(200);
        expect(typeof JSON.parse(body).users).toBe('number');
    });

    test('User is not exist', async () => {
        //given
        const userToken = '00000000-0000-0000-0000-000000000000'
        stubSQLResult([
            { numberOfQuery: 1, result: [{ userExist: 0 }] },
        ]);
        const event = {
            ...testData,
            queryStringParameters: { token: userToken },
        };

        //when
        const { statusCode } = await handler(event,);

        //then
        expect(statusCode).toBe(403);
    });
});