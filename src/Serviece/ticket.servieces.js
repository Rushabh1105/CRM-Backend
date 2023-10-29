const Ticket = require('../Models/Ticket.Schema');


const createTicket = async(ticketData) => {
    try {
        
        const ticket = {
            clientId: ticketData.userId,
            subject: ticketData.subject,
            conversation: [{
                sender: ticketData.sender,
                message: ticketData.message,
            }]
        }
        const data = await new Ticket(ticket).save();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllTickets = async(userId) => {
    try {
        const data = await Ticket.find({clientId: userId});
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const getTicket = async(ticketId) => {
    try {
        const data = await Ticket.findById(ticketId);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getTicketById = async(_id, clientId) => {
    try {
        const data = await Ticket.findById({_id, clientId});
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateClientReply = async({ticketId, message, sender}) => {
    try {
        const data = await Ticket.findById(ticketId);
        data.status = 'updated response';
        const msg = {
            sender: sender,
            message: message,
        }

        data.conversation.push(msg);
        await data.save();
        return true;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const closeTicket = async(_id, clientId) => {
    try {
        const data = await Ticket.findById({_id});
        if(data.clientId == clientId) {
            data.status = 'ticket closed';
            await data.save();
            return true;
        }

        throw new Error('Invalid client');
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteTicket = async(_id, clientId) => {
    try {
        const data = await Ticket.findById({_id});
        if(data.clientId == clientId) {
            const response = await Ticket.findByIdAndDelete({_id});
            return response;
        }

        throw new Error('Invalid client');
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = {
    createTicket,
    getAllTickets,
    getTicket,
    getTicketById,
    updateClientReply,
    closeTicket,
    deleteTicket,
}