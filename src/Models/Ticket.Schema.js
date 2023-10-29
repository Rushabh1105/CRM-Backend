
const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        
    },
    subject:{
        type: String,
        required: true,
        default: '',
    },
    openedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    status: {
        type: String,
        required: true,
        default: 'Pending Operator Response',
    },
    conversation: [
        {
            sender: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true,
                default: '',
            },
            messageAt: {
                type: Date,
                required: true,
                default: Date.now(),
            }
        }
    ]
}, {timestamps: true});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;