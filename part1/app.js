import express from 'express';
import mysql from 'mysql2/promise';
import { Pool } from 'undici-types';

const app = express();

app.get('/api/dogs', (req, res) => {
    Pool.query(` SELECT Dogs.name AS dog_name FROM Dogs
                 JOIN Users ON Users.user_id = Owners.id`)
})