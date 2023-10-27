const express = require('express');
const userController = require('../Controller/user.controller');
const {userAuth} = require('../Middleware/auth.middleware');


const router = express.Router();



router.post('/', userController.createUser );
router.post('/login', userController.signin);
router.get('/', userAuth,userController.getUser);
router.post('/reset-password', userController.resetPassword);
router.patch('/reset-password', userController.updateResetPassword);


module.exports = router;