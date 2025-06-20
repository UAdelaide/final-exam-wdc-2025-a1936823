import express from 'express';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dogwalks'
 });
const app = express();

app.get('/api/dogs', (req, res) => {
    Pool.query(` SELECT dogs.name AS dog_name
                FROM dogs dogs
                JOIN Users ON users.user_id = dogs_owner.id`)
    .then(([row]) => res.json(rows))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch dogs'});
    });
});


app.get('/api/walkrequests/open', (req, res) => {
    pool.query(` SELECT walkRequests.request_id, dogs.name AS dog_name, requests.request_time, requests.duration_minutes, requests.location, users.name AS owner_username
                FROM WalkRequests requests
                JOIN Dogs dogs ON dogs.dog_id = requests.dog_id
                JOIN Users users ON Users.user_id = Dogs.owner_id
                WHERE Requests.status = 'open'
                ORDER BY Requests.requested_time;`)
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
            GROUP BY walkers.user_id, walkers.username
            ORDER BY walkers.username;
        `)
    .then(([rows]) => res.json(rows))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to build walker summary'});
    });
});

app.listen(8080, () => console.log('API live on :8080'));

