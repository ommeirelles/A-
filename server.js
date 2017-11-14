const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/dist`));
app.use(express.static(`${__dirname}/src/templates`));
// app.use(express.static(`${__dirname}/src/images`));

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/src/index.html`);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});