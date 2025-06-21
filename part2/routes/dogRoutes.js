const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/mine', async(req, res) => {
    console.log(' session', req.session.user);
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not logged in'});
    }

    const ownerId = req.session.user.id;

    try{
        const [rows] = await db.query(
            'SELECT dog_id, name, size FROM Dogs WHERE owner_id = ?', [ownerId]);
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch dogs'});
        }
    });

module.exports = router;

