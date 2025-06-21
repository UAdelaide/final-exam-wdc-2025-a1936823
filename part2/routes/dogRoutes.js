const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/mine', async(req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not logged in;'});
    }

    const ownerID = req.session.user.id;

    try{
        const [rows] =
    }

module.exports = router;
