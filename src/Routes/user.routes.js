const express = require('express');
const userController = require('../Controller/user.controller');


const router = express.Router();



router.post('/', userController.createUser );

module.exports = router;