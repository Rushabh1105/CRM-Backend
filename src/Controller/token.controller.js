const {verifyRefreshToken, createAccessJWT} = require('../Utils/jwt.helper')
const {getUserByEmail} = require('../Serviece/User.Serviece');
const {REFREST_EXP_DATE} = require('../Config/config');



const refreshJWT = async(req, res) => {
    try {
        const {auth_token} = req.headers;
        const payload = await verifyRefreshToken(auth_token);
     

        if(!payload.email){
            return res.status(401).json({
                message: 'Invalid email address'
            })
        }

        const user = await getUserByEmail(payload.email);

        if(!user){
            return res.status(401).json({
                message: 'Invalid email address'
            })
        }
        
        let expDate = user.refreshJWT.addedAt;

        expDate = expDate.setDate(expDate.getDate()+ parseInt(REFREST_EXP_DATE));

        const today = new Date();
        if(expDate < today ){
            return res.status(401).json({
                message: 'please login again'
            })
        }
        
        
        const accessJWT = await createAccessJWT({user});
        console.log(accessJWT)

        return res.json({
            message: 'Email address',
            data: accessJWT
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}


module.exports = {
    refreshJWT,

}