const ResetPin = require('../Models/UserResetPin.Schema');
const pinGenerator = require('../Utils/randomPinGenerator');

const setUserPin = async (email) => {
    try {

        const pin = pinGenerator.randomPinNumbre(6);
        const userPin = {
            email: email,
            pin: pin,
        }

        const response = await new ResetPin(userPin).save();
        return response;
    } catch (error) {
        console.log(error);
        throw {error};
    }
}




















module.exports = {
    setUserPin,
}