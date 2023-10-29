const ticketServiece = require('../Serviece/ticket.servieces')


const createTicket = async(req, res) => {
    try {
        const {subject, sender, message} = req.body;
        const userId = req.userId;
        const response = await ticketServiece.createTicket({subject, sender, message, userId});

        return res.status(201).json({
            status: 'success',
            message: 'New Ticket has been raised'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong Please try again later',
        })
    }
}



const getAllTickets = async (req, res) => {
    try {
        const result = await ticketServiece.getAllTickets(req.userId);
        return res.status(200).json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong Please try again later',
        })
    }
}


const getTicket = async(req, res) => {
    try {
        const response = await ticketServiece.getTicketById(req.params.id, req.userId);
        return res.status(200).json({
            success: true,
            data: response,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong Please try again later',
        })
    }
}

const updateTicketMessage = async (req, res) => {
    try {
        const {message, sender} = req.body;
        const ticketId = req.params.id;
        // const clientId = req.userId;

        const response = await ticketServiece.updateClientReply({ticketId, message, sender});

        return res.status(201).json({
            status: 'success',
            message: 'Ticket is updated successfully',
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong Please try again later',
        })
    }
}

const closeTicket = async(req, res) => {
    try {
        const clientId = req.userId;
        await ticketServiece.closeTicket(req.params.id, clientId);
        return res.status(201).json({
            status: 'success',
            message: 'Ticket is closed successfully',
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error,
        })
    }
}

const deleteTicket = async (req, res) => {
    try {
        const clientId = req.userId;
        await ticketServiece.deleteTicket(req.params.id, clientId);
        return res.status(201).json({
            status: 'success',
            message: 'Ticket is closed successfully',
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error,
        })
    }
}

module.exports = {
    createTicket,
    getAllTickets,
    getTicket,
    updateTicketMessage,
    closeTicket,
    deleteTicket,
}