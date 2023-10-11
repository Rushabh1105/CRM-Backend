const User = require('../Models/User.Schema');

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

module.exports = {
    createUser,
    validateUser,
    storeToken,
}