const {verifyToken} = require('../Utils/jwt.helper');
const {getJWT} = require('../Utils/redis.helper');

const userAuth  = async (req, res, next ) => {
    try {
        const {auth_token} = req.headers;

        const payload = await verifyToken(auth_token);
        // console.log(payload);

        if(!payload.email){
            res.status(401).json({
                message: 'Invalid email address'
            })
        }

        const userId = await getJWT(auth_token);

        if(!userId) {
            res.status(401).json({
                message: 'Invalid email address'
            })
        }
        req.userId = userId;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Login Firsr',
        })
    }
}


module.exports = {
    userAuth,
}