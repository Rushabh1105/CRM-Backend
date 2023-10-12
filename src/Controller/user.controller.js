const UserService = require('../Serviece/User.Serviece');
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
        
    }
}

module.exports = {
    createUser,
    signin,
    getUser,
}