const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', __dirname);



app.use(bodyParser.urlencoded({ extended: true }));

// Home route - Show all subjects
app.get('/', (req, res) => {
    db.all('SELECT * FROM subjects', [], (err, subjects) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.render('index', { subjects });
    });
});

// Show add subject form
app.get('/add-subject', (req, res) => {
    res.render('add-subject');
});

// Handle form submission
app.post('/add-subject', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.send('Subject name is required');
    }

    db.run('INSERT INTO subjects (name) VALUES (?)', [name], (err) => {
        if (err) {
            return res.status(500).send('Failed to add subject');
        }
        res.redirect('/');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
