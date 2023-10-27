const ResetPin = require('../Models/UserResetPin.Schema');
const pinGenerator = require('../Utils/randomPinGenerator');

const setUserPin = async (email) => {
    try {

        const pin = pinGenerator.randomPinNumbre(6);
        const userPin = {
            email: email,
            pin: pin,
            expDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        }

        const response = await new ResetPin(userPin).save();
        return response;
    } catch (error) {
        console.log(error);
        throw {error};
    }
}



const getPin = async(email, pin) => {
    try {
        const user = await ResetPin.findOne({email, pin});

        if(user) {
            return user;
        }

        throw new Error({message: 'Wrong pin'});
        
    } catch (error) {
        console.log(error);
        throw {error};
    }
}


const deletePin = async (id) => {
    try {
        const response = await ResetPin.findOneAndRemove({_id: id});
        return response;
    } catch (error) {
        console.log(error);
        throw {error};
    }
}


module.exports = {
    setUserPin,
    getPin,
    deletePin,
}