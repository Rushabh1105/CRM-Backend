const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    REFRESH_SECRET: process.env.REFRESH_SECRET,
    REDIS_URL: process.env.REDIS_URL,
}