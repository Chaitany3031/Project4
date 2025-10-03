const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const chatControllers = require('../controllers/chat.controllers')

const router = express.Router();

router.post('/',authMiddleware.authUser,chatControllers.createChat)



module.exports = router;