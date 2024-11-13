const express = require('express');
const router = express.Router();

const { adduser,updateAdderss,showUserDetailsToUser } = require('../Controllers/userController.js');

router.post('/', adduser);
router.put('/updateAdderss', updateAdderss);
router.get('/', showUserDetailsToUser);

module.exports = router