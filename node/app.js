const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    } else {
    console.log('Connected to MySQL as id', connection.threadId);
    }
    connection.release();
});

app.get('/', (req, res) => {
    connection.query('INSERT INTO people(name) VALUES("Full Cycle Rocks!")', (err, result) => {
        if (err) {
            console.error('Error inserting name:', err);
            res.send(`<h1>Error inserting name: ${err.message}</h1>`);
            return;
        }

        connection.query('SELECT name FROM people', (err, rows) => {
            if (err) {
                console.error('Error fetching names:', err);
                res.send(`<h1>Error fetching names: ${err.message}</h1>`);
                return;
            }

            let names = rows.map(row => row.name).join('<br>');
            res.send(`<h1>Full Cycle Rocks!</h1><br>${names}`);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
