const { handler } = require('../index');

process.env['SA_JSON_FILE'] = './sa_name.json';
process.env['ENTRY_POINT'] = 'grpcs://ydb.serverless.yandexcloud.net:2135';
process.env['DB_NAME'] = '';

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
        const event = {
            ...testData,
            queryStringParameters: {token: '9ecceed9-10fc-4ec0-b0e1-22dbeabb2127'},
        };

        //when
        const { statusCode, body } = await handler(event,);

        //then
        expect(statusCode).toBe(200);
        expect(typeof JSON.parse(body).users).toBe('number');
    });

    test('User is not exist', async () => {
        //given
        const event = {
            ...testData,
            queryStringParameters: { token: '00000000-0000-0000-0000-000000000000' },
        };

        //when
        const { statusCode } = await handler(event,);

        //then
        expect(statusCode).toBe(403);
    });
});