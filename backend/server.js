const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
    user: process.env.POSTGRES_USER || 'user',
    host: process.env.POSTGRES_HOST || 'db',
    database: process.env.POSTGRES_DB || 'fideliza',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: process.env.POSTGRES_PORT || 5432,
});

app.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        const time = result.rows[0].now;
        client.release();
        res.send(`Hello World! Database connected. Time: ${time}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to database');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
