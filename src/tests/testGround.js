jest.mock('ydb-sdk');
const { Driver, TypedData, getLogger } = require('ydb-sdk');

exports.initTestGround = () => {
    TypedData.createNativeObjects = jest.fn().mockImplementation((d) => d);
    getLogger.mockImplementation(() => ({ fatal: (m) => console.log(`⛔️ Logger fatal message: ${m}`) }));
};

exports.stubSQLResult = (cases) => {
    let reqCounter = 0;
    Driver.mockImplementation(() => {
        return {
            ready: () => Promise.resolve(true),
            destroy: () => jest.fn(),
            tableClient: {
                withSession: (cb) => cb({
                    executeQuery: async () => {
                        reqCounter += 1;
                        const dataSuit = cases.find((c) => c.numberOfQuery === reqCounter);
                        return { resultSets: [dataSuit.result] }
                    },
                    prepareQuery: (q) => q,
                })
            }
        };
    });
};
