import express from 'express';
import mysql from 'mysql2/promise';

const pool = mysql.CreatePool({
    host: 'localhost',
    user:   'root',
    password: 'password',
    database: 'dog_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const app = express();

app.get('/api/dogs', (req, res) => {
    Pool.query(` SELECT Dogs.name AS dog_name FROM Dogs
                 JOIN Users ON Users.user_id = Dogs_owner.id`)
})