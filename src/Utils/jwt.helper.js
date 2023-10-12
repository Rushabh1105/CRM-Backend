const jwt = require('jsonwebtoken');
const {SECRET_KEY, REFRESH_SECRET} = require('../Config/config');
const {getJWT, setJWT} = require('./redis.helper');
const {storeToken} = require('../Serviece/User.Serviece')

const createAccessJWT = async (payload) => {
    try {

        let email;
        if( payload.response ){
            email = payload.response.email;
        }else{
            email = payload.user.email;
        }


        console.log(email)
        const accessToken = jwt.sign({email}, SECRET_KEY, {
            expiresIn: '1h',
        });

        let id;
        if(payload.response){
            id = payload.response._id;
        }else{
            id = payload.user._id;
        }

        console.log(id)
        await setJWT(accessToken, id)
        return accessToken;
    } catch (error) {
        console.log(error)
    }
}

const createRefreshJWT =async (payload) => {
    const email = payload.response.email;
    const refreshToken = jwt.sign({email}, REFRESH_SECRET, {
        expiresIn: '30d',
    });

    const result = await storeToken(payload.response._id, refreshToken);
    // console.log(result);

    return refreshToken;
}

const verifyToken = async (token) => {
    try {
        const payload = await jwt.verify(token, SECRET_KEY);
        return payload;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const verifyRefreshToken = async (token) => {
    try {
        const payload = await jwt.verify(token, REFRESH_SECRET);
        return payload;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createAccessJWT,
    createRefreshJWT,
    verifyToken,
    verifyRefreshToken,
}