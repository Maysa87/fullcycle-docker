const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB
    });

    connection.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            setTimeout(handleDisconnect, 2000); // Tentar reconectar após 2 segundos
        } else {
            console.log('Connected to MySQL as id', connection.threadId);
        }
    });

    connection.on('error', err => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

app.get('/', (req, res) => {
    if (!connection || connection.state !== 'connected') {
        res.status(500).send('Erro na conexão com o banco de dados');
        return;
    }

    connection.query('INSERT INTO people(name) VALUES ("Full Cycle Rocks!")', (err, result) => {
        if (err) {
            console.error('Error inserting name:', err);
            res.status(500).send('Erro ao inserir no banco de dados');
            return;
        }

        connection.query('SELECT name FROM people', (err, rows) => {
            if (err) {
                console.error('Error querying names:', err);
                res.status(500).send('Erro ao consultar o banco de dados');
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
