const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public')); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Kya dekh rahe ho *******   bhag yaha se ');
});

app.post('/login', (req, res) => {
    res.redirect('/dbmshomepage.html');
});
app.get('/dbmshomepage.html', (req, res) => {
    res.sendFile(`${__dirname}/dbmshomepage.html`);
});
