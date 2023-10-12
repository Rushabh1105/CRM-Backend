const express = require('express');

const tokenController = require('../Controller/token.controller');
const router = express.Router();

router.get('/', tokenController.refreshJWT);


module.exports = router;