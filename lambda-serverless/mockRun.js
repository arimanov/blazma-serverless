const { handler } = require('./index.js');
const context = require('./test-data/mock_context.json')
const event = require('./test-data/mock_event.json');

process.env['SA_JSON_FILE'] = './sa_name.json';
process.env['ENTRY_POINT'] = 'grpcs://ydb.serverless.yandexcloud.net:2135';
process.env['DB_NAME'] = '';

(async () => {
    const output = await handler(event, context);
    console.log('📢 ', output);
})();
