const User = require('../Models/User.Schema');
const {deleteJWT} = require('../Utils/redis.helper')

const createUser = async (data) => {
    try {
        const newUser = {
            name: data.name,
            company: data.company,
            email: data.email,
            password: data.password,
        }

        if( data.phone ) {
            newUser.phone = data.phone;
        }

        if(data.address ){
            newUser.address = data.address;
        }

        const response = await new User(newUser).save();
        console.log(response);
        // const {password, ...otherData} = response;
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}


const validateUser = async (email, password) => {
    const user = await User.findOne({email: email});
    if( !user ){
        throw new Error("User not found");
    }

    const validate = await user.isValidPassword(password);
    if(!validate){
        throw new Error("Invalid password");
    }

    return user;

}

const storeToken = async(_id, token) => {
    try {
        const user = await User.findOneAndUpdate({_id}, {
            $set: {
                "refreshJWT.token": token,
                "refreshJWT.addedAt": Date.now(),
            }
        }, {new: true});

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUser = async(userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const getUserByEmail = async(email) => {
    try {
        const user = await User.findOne({email});
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updatePassword = async(email, newPassword) => {
    try {
        const user = await User.findOne({email});
        user.password = newPassword;

        const response = await user.save();
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteTokens = async (_id, accessJWT) => {
    try {
        await deleteJWT(accessJWT);

        const response = await storeToken(_id, '');
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createUser,
    validateUser,
    storeToken,
    getUser,
    getUserByEmail,
    updatePassword,
    deleteTokens,
}