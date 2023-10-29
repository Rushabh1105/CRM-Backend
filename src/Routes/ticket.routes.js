const express = require('express');

const ticketController = require('../Controller/ticket.controller');
const ticketAuth = require('../Middleware/auth.middleware');
const formValidator = require('../Middleware/formValidation.Helper');
const router = express.Router();


router.post('/', ticketAuth.userAuth, formValidator.createNewTicketValidation, ticketController.createTicket);
router.get('/', ticketAuth.userAuth, ticketController.getAllTickets); 
router.get('/:id', ticketAuth.userAuth, ticketController.getTicket);
router.put('/:id', ticketAuth.userAuth, formValidator.replyMessageValidation, ticketController.updateTicketMessage);
router.patch('/close-ticket/:id', ticketAuth.userAuth, ticketController.closeTicket);
router.delete('/:id', ticketAuth.userAuth, ticketController.deleteTicket)

router.all('/');


module.exports = router;