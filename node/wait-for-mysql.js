const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

const checkConnection = () => {
    connection.connect(err => {
        if (err) {
            console.log('Waiting for MySQL to be available...');
            setTimeout(checkConnection, 2000);
        } else {
            console.log('MySQL is available!');
            process.exit(0);
        }
    });
};

checkConnection();
