import dotenv from 'dotenv';

dotenv.config();

export default {
    appSecret: process.env.APP_SECRET,
    tokenExpiration: 60*60*24, // for now, tokens expire in 24 hours
    port: process.env.APP_PORT || 3000,
    mongoDsn: process.env.MONGO_DSN || 'mongodb://localhost:27017/pelotonPlanner'
};
