jest.mock('ydb-sdk');
const { Driver, TypedData, getLogger } = require('ydb-sdk');
const { handler } = require('../index');

['SA_JSON_FILE', 'ENTRY_POINT', 'DB_NAME'].map((v) => process.env[v] = '');

TypedData.createNativeObjects = jest.fn().mockImplementation((d) => d);

getLogger.mockImplementation(() => ({ fatal: (m) => console.log(`⛔️ Logger fatal message: ${m}`) }));

const stubSQLResult = (cases) => {
    Driver.mockImplementation(() => {
        return {
            ready: () => Promise.resolve(true),
            destroy: () => jest.fn(),
            tableClient: {
                withSession: (cb) => cb({
                    executeQuery: async (query) => {
                        const dataSuit = cases.find((c) => c.query === query);
                        return { resultSets: [dataSuit.result] }
                    },
                    prepareQuery: (q) => q,
                })
            }
        };
    });
};

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
            {
                query: `SELECT COUNT(*) AS userExist FROM user WHERE token = '${userToken}'`,
                result: [{ userExist: 1 }]
            },
            {
                query: 'SELECT COUNT(*) as number FROM user WHERE token IS NOT NULL',
                result: [{ number: 10 }]
            }
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
            {
                query: `SELECT COUNT(*) AS userExist FROM user WHERE token = '${userToken}'`,
                result: [{ userExist: 0 }]
            },
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