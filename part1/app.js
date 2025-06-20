import express from 'express';
import mysql from 'mysql2/promise';

const pool = mysql.CreatePool({ /* host, user, password, database */ });
const app = express();

app.get('/api/dogs', (req, res) => {
    Pool.query(` SELECT Dogs.name AS dog_name FROM Dogs
                 JOIN Users ON Users.user_id = Dogs_owner.id`);
});


app.get('/api/walkrequests/open', (req, res) => {
    pool.query(` SELECT WalkRequests.request_id, Dogs.name AS dong_name, Requests.request_time, Requests.duration_minutes, Requests.location, Users.name AS owner_username
                FROM WalkRequests Requests JOIN Dogs Dogs ON Dogs.dog_id = Requests.dog_id
                WHERE Requests.status = 'open'
                OREDER BY Resquests.requested_time;`);
});

app.get('/api/walkers/summary', (req, res) => {
    pool.query(`SELECT walkers.username AS walker_username,
                COUNT(ratings.rating_id) AS total_ratings,
            ROUND (AVG())
        `)
})