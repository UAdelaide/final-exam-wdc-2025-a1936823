const express = require('express');
const router = express.Router();
const db = require('../models/db');
const session = require('express-session');

router.get('/mine')