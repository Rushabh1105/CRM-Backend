const UserService = require('../Serviece/User.Serviece');


const createUser = async (req, res) => {
    try {
        const response = await UserService.createUser(req.body);
        
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}


module.exports = {
    createUser,
}