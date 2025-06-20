import express from 'express';
import mysql from 'mysql2/promise';

const pool = mysql.CreatePool({ /* host, user, password, database */ });
const app = express();

app.get('/api/dogs', (req, res) => {
    Pool.query(` SELECT Dogs.name AS dog_name
                FROM Dogs
                JOIN Users ON Users.user_id = Dogs_owner.id`)
    .then(([row]) => res.json(rows))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch dogs'});
    });
});


app.get('/api/walkrequests/open', (req, res) => {
    pool.query(` SELECT WalkRequests.request_id, Dogs.name AS dong_name, Requests.request_time, Requests.duration_minutes, Requests.location, Users.name AS owner_username
                FROM WalkRequests Requests
                JOIN Dogs Dogs ON Dogs.dog_id = Requests.dog_id
                WHERE Requests.status = 'open'
                OREDER BY Resquests.requested_time;`)
    .then(([rows]) => res.json(rows))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch open requests'});
    });
});

app.get('/api/walkers/summary', (req, res) => {
    pool.query(`SELECT walkers.username AS walker_username,
                COUNT(ratings.rating_id) AS total_ratings,
                ROUND (AVG(rating.rating), 2) AS average_rating,
                COUNT(ratings.rating_id) AS completed_walks
            FROM Users walkers
            LEFT JOIN WalkRatings ratings ON ratings.walker_id = walkers.user_id
            WHERE walkers.role = 'walker'
            GROUP BY walkers.user_id
            GROUP BY walkers.username;
        `)
    .then(([rows]) => res.json(rows))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to build walker summary'});
    });
});

app.listen(8080, () => console.log('API live on :8080'));

