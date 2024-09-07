const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Asura@2024",
    database: "BankingSystem"
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL connected');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dbmsregisterpage.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dbmsloginpageforclient.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dbmsregisterpage.html'));
});

app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, dateofbirth, address, phoneNumberRegister, city, state, pincode, accountType, registerPassword } = req.body;
        const accountNumber = generateAccountNumber();
        const passwordHash = await bcrypt.hash(registerPassword, 10);

        const checkQuery = `SELECT * FROM Users WHERE email = ? OR phoneNumberRegister = ?`;
        connection.query(checkQuery, [email, phoneNumberRegister], (err, results) => {
            if (err) {
                console.error('Error checking for duplicates:', err);
                res.status(500).send('Server error');
                return;
            }

            if (results.length > 0) {
                return res.status(400).send('User with this email or phone number already exists.');
            }

            const accountCheckQuery = `SELECT * FROM Users WHERE AccountNumber = ?`;
            connection.query(accountCheckQuery, [accountNumber], (err, results) => {
                if (err) {
                    console.error('Error checking account number:', err);
                    res.status(500).send('Server error');
                    return;
                }

                if (results.length > 0) {
                    return res.status(400).send('Account number already exists.');
                }

                const insertQuery = `INSERT INTO Users (AccountNumber, firstName, lastName, email, dateofbirth, address, phoneNumberRegister, city, state, pincode, accountType, registerPassword, created_at)
                                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

                connection.query(insertQuery, [accountNumber, firstName, lastName, email, dateofbirth, address, phoneNumberRegister, city, state, pincode, accountType, passwordHash], (err) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        res.status(500).send('Error during registration');
                        return;
                    }
                    res.send(`
                        <html>
                        <head>
                            <meta http-equiv="refresh" content="11;url=/login">
                        </head>
                        <body style="background: linear-gradient(45deg, blue, purple)">
                            <h2 style="color: yellow; background: black;">IMPORTANT: Please note your account number. This page will be redirected in <span id="countdown" style="color: green; font-size: xxx-large; font-weight: bolder">10</span> seconds.</h2>
                            <h1 style="font-size: xx-large">
                                <p style="color: yellow">Registration successful! Your Customer ID is <span style="font-style: italic; color: red;">${accountNumber}.</span></p>
                            </h1>
                            <script>
                                let countdownTime = 10;
                                function updateCountdown() {
                                    const countdownElement = document.getElementById('countdown');
                                    countdownElement.textContent = countdownTime;
                                    
                                    if (countdownTime <= 3) {
                                        countdownElement.style.color = 'red';
                                    } else if (countdownTime <= 5) {
                                        countdownElement.style.color = 'orange';
                                    } else if (countdownTime <= 8) {
                                        countdownElement.style.color = 'blue';
                                    } else {
                                        countdownElement.style.color = 'green';
                                    }

                                    countdownTime -= 1;
                                }
                                setInterval(updateCountdown, 1000);
                            </script>
                        </body>
                        </html>
                    `);
                });
            });
        });
    } catch (err) {
        console.error('Error in registration:', err);
        res.status(500).send('Server error');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { customerId, loginPassword } = req.body;
        const query = `SELECT * FROM Users WHERE AccountNumber = ?`;

        connection.query(query, [customerId], async (err, results) => {
            if (err) {
                console.error('Error querying user:', err);
                res.status(500).send('Server error');
                return;
            }
            if (results.length === 0) {
                return res.send('User not found');
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(loginPassword, user.registerPassword);

            if (isMatch) {
                res.send(`Login successful! Welcome, ${user.firstName}.`);
            } else {
                res.send('Incorrect password');
            }
        });
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).send('Server error');
    }
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

function generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
}

process.on('SIGINT', () => {
    connection.end(err => {
        if (err) {
            console.error('Error closing MySQL connection:', err);
        } else {
            console.log('MySQL connection closed.');
        }
        process.exit();
    });
});
