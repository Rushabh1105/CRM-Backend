const nodemailer = require('nodemailer');

  
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maverick42@ethereal.email',
        pass: 'eywbgr7tujYPYCxWFk'
    }
});




const send = async (info) => {
    

    try {
        const response = await transporter.sendMail(info);
        console.log("Message sent: %s", info.messageId);

        return response;
    } catch (error) {
        console.log(error);
        throw {error};
    }
    
}


const emailProcessor = async (email, pin) => {
    const info = {
        from: '"CRM Company 👻" <maverick42@ethereal.email>',
        to: email,
        subject: "Reset Pin",
        text: `Here is Your Password reset pin : ${pin}`,
        html: `<p>Here is Your Password reset pin : <b>${pin}</b></p>`,
    }

    send(info)
}


module.exports = {
    emailProcessor, 
}