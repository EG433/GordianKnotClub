const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

// Configure database connection
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'your_database_password',
    database: 'mydatabase'
  }
});

const app = express();

// Apply middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from public directory
app.use(express.static('public'));

// Registration endpoint
app.post('/register-user', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db('users').insert({
    name: name,
    email: email,
    password: password // Note: In production, you should hash the password before storing it.
  }).returning('*')
    .then(user => {
      res.json({ user: user[0] });
    })
    .catch(error => {
      if (error.code === '23505') { // Unique violation
        res.status(409).json({ error: 'Email already exists' });
      } else {
        res.status(500).json({ error: 'Database error' });
      }
    });
});

// Set the port and start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

