const express = require('express');
const app = express();
const connection = require('./database');

app.get('/', (req, res) => {
    const name = 'User ' + Math.floor(Math.random() * 1000);
    connection.query(`INSERT INTO people (name) VALUES ('${name}')`, (err) => {
        if (err) {
            console.error('Error inserting into database:', err);
            return res.status(500).send('Internal Server Error');
        }
        connection.query('SELECT name FROM people', (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).send('Internal Server Error');
            }
            let response = '<h1>Full Cycle Rocks!</h1><ul>';
            results.forEach(row => {
                response += `<li>${row.name}</li>`;
            });
            response += '</ul>';
            res.send(response);
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
