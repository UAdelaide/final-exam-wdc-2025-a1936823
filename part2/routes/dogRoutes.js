const express = require('express');
const router = express.Router();
const db = require('../models/db');
const session = require('express-session');

router.get('/mine', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'owner')
        return res.status(401).json({ error: 'Not authorized' });

    db.query(
        'SELECT dog_id AS id, name FROM Dogs WHERE owner_id = ?',
        [req.session.user.id]
    )
})