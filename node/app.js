const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

    const createTable = `CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )`;

    connection.query(createTable, (err, results, fields) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Table created or already exists');
    });
});

app.get('/', (req, res) => {
    const name = 'Full Cycle';
    const insert = `INSERT INTO people(name) VALUES('${name}')`;
    connection.query(insert, (err, results, fields) => {
        if (err) {
            console.error('Error inserting name:', err);
            res.send('Error inserting name');
            return;
        }

        const select = `SELECT name FROM people`;
        connection.query(select, (err, results, fields) => {
            if (err) {
                console.error('Error selecting names:', err);
                res.send('Error selecting names');
                return;
            }

            const namesList = results.map(row => `<li>${row.name}</li>`).join('');
            res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
