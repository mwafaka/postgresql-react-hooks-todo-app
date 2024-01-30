const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const pool = new Client(process.env.PG_ELEPHANT_URL);

app.use(cors({
    origin: 'http://localhost:5173'
}));

pool.connect()
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => { console.log(err); })



app.use(bodyParser.json());
app.get('/todos', async (req, res) => {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
});

app.post('/todos', async (req, res) => {
    const { task } = req.body;
    const result = await pool.query('INSERT INTO todos (task) VALUES ($1) RETURNING *', [task]);
    res.json(result.rows[0]);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = pool;