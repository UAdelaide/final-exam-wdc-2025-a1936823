const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/mine', async(req, res) => {
    if (!req.session.user)
module.exports = router;
