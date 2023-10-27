const express = require('express');
const userController = require('../Controller/user.controller');
const {userAuth} = require('../Middleware/auth.middleware');
const {resetPasswordReqValidation, updatePasswordReqValidation} = require('../Middleware/formValidation.Helper')


const router = express.Router();



router.post('/', userController.createUser );
router.post('/login', userController.signin);
router.get('/', userAuth,userController.getUser);
router.post('/reset-password', resetPasswordReqValidation, userController.resetPassword);
router.patch('/reset-password', updatePasswordReqValidation, userController.updateResetPassword);

router.delete('/logout', userAuth, userController.logout)


module.exports = router;