const { initTestGround, stubSQLResult } = require('./testGround');
const { handler } = require('../index');
const { IP_HEADER } = require('../constant');

initTestGround();

describe('SignIn', () => {

    const testData = {
        path: '/v1/signin',
        httpMethod: 'POST',
        body: JSON.stringify({ name: 'Petrovich' }),
        queryStringParameters: {},
        headers: {
            [IP_HEADER]: '0.0.0.0'
        }
    };

    test('Create new user', async () => {
        //given
        stubSQLResult([
            { numberOfQuery: 1, result: [{ amount: 0 }] },
            { numberOfQuery: 2, result: [{ id: 1 }] },
            { numberOfQuery: 3, result: [{}] }
        ]);

        //when
        const { statusCode, body } = await handler(testData,);

        //then
        expect(statusCode).toBe(201);
        expect(JSON.parse(body).userId).toBe(2);
        expect(JSON.parse(body).token.length).toBe(36);
    });

    test('User with the same name is exist', async () => {
        //given
        stubSQLResult([
            { numberOfQuery: 1, result: [{ amount: 1 }] }
        ]);

        //when
        const { statusCode } = await handler(testData,);

        //then
        expect(statusCode).toBe(409);
    });
});