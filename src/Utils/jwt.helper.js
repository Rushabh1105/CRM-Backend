const jwt = require('jsonwebtoken');
const {SECRET_KEY, REFRESH_SECRET} = require('../Config/config');
const {getJWT, setJWT} = require('./redis.helper');
const {storeToken} = require('../Serviece/User.Serviece')

const createAccessJWT = async (payload) => {
    const email = payload.response.email;
    const accessToken = jwt.sign({email}, SECRET_KEY, {
        expiresIn: '1h',
    });

    await setJWT(accessToken, payload.response._id)
    return accessToken;
}

const createRefreshJWT =async (payload) => {
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: '30d',
    });

    const result = await storeToken(payload.response._id, refreshToken);
    console.log(result);
    return refreshToken;
}

module.exports = {
    createAccessJWT,
    createRefreshJWT,
}