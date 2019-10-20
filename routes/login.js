const express = require('express');
const router = express.Router();

const ctrlLogin = require('../controllers/login');

router.get('login', ctrlLogin.get);

module.exports = router;
