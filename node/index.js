const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Full Cycle Rocks!');
});

app.listen(port, () => {
    console.log(`listening at :${port}`);
});
