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


module.exports = {
    createUser,
}