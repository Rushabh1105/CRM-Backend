const UserService = require('../Serviece/User.Serviece');
const pinServiece = require('../Serviece/ResetPin.Serviece');
const emailHelper = require('../Utils/emailHelper');
const {createAccessJWT,createRefreshJWT} = require('../Utils/jwt.helper');


const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const response = await UserService.createUser(req.body);
        

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

const signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email){
            return res.status(400).json({
                message: "Email is required",
            })
        }

        if(!password){
            return res.status(400).json({
                message: "Password is required",
            })
        }
        const response = await UserService.validateUser(email, password);

        const id = response.id;
        const accessJWT = await createAccessJWT({response});
        const refreshJWT = await createRefreshJWT({response});

        return res.status(201).json({accessJWT, refreshJWT});

        

    } catch (error) {
        return res.status(401).json({
            err: error.message,
        })
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.userId;

        const response = await UserService.getUser(userId);

        return res.json({
            message: 'hello world',
            data: response,
        })
    } catch (error) {
        return res.status(401).json({
            err: error.message,
        })
    }
}

const resetPassword = async(req, res) => {
    const {email} = req.body;
    try {
        const user = await UserService.getUserByEmail(email);
        // console.log(response)

        if(user && user._id){
            const response = await pinServiece.setUserPin(email);
            const result = await emailHelper.emailProcessor(email, response.pin);
            console.log(result);
            

            return res.status(200).json({
                message: 'If email is exist in databse otp will be sent soon',
            })

        }

        return res.status(401).json({
            message: 'user not found',
        })

    } catch (error) {
        return res.status(401).json({
            err: error.message,
        })
    }
}


const updateResetPassword = async(req, res ) => {
    try {
        const {email, pin, password} = req.body;
        const response = await pinServiece.getPin(email, pin);

        if(response._id){
            // let createdAt = response.createdAt;
            let expDate = response.expDate;
            console.log(expDate);
            let today = new Date();
            console.log(today);

            if(expDate > today){
                const data = await UserService.updatePassword(email, password);
                const deletePin = await pinServiece.deletePin(response._id)

                return res.json({
                    message: 'user password updated successfully',
                    success: true
                })
            }
            // console.log(createdAt)
        }


        return res.json({
            message: 'Invalid Pin',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
        })
    }
}

const logout = async (req, res) => {
    try {
        const id = req.userId;
        const {auth_token} = req.headers;
        const response = await UserService.deleteTokens(id, auth_token);

        return res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
        })
    }
}


module.exports = {
    createUser,
    signin,
    getUser,
    resetPassword,
    updateResetPassword,
    logout,
}