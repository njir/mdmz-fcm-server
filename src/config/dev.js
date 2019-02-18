const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_NAME || 'meeting-app';

module.exports = {
    server: {
        port: 9000
    },
    database: {
        url: `mongodb://${host}/${database}`,
        properties: {
            useMongoClient: true
        }
    },
    key: {
        privateKey: '37LvDSm4XvjYOh9Y',
        tokenExpireInMinutes: 1440
    },
    pagination: {
        defaultPage: 1,
        defaultLimit: 10
    }
};
