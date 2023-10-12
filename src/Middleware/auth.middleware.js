const {verifyToken} = require('../Utils/jwt.helper');
const {getJWT, deleteJWT} = require('../Utils/redis.helper');

const userAuth  = async (req, res, next ) => {
    try {
        const {auth_token} = req.headers;

        let payload;
        try {
            payload = await verifyToken(auth_token);
        } catch (error) {
            deleteJWT(auth_token);
            return res.status(401).json({
                message: 'Login First',
            })
            
        }

        if(!payload.email){
            deleteJWT(auth_token);
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
        const {auth_token} = req.headers;
        deleteJWT(auth_token);
        res.status(401).json({
            message: 'Login Firsr',
        })
    }
}


module.exports = {
    userAuth,
}