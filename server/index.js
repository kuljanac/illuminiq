const express = require('./node_modules/express');
const mysql = require('./node_modules/mysql2/promise');
const cors = require('./node_modules/cors');
const path = require('./node_modules/path');

const app = express();

// Use the CORS middleware
app.use(cors());

// Use JSON parsing middleware
app.use(express.json());

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});


const db = require('./database');

// create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'illuminiq',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the database connection
db.query('SELECT 1 + 1 AS result')
  .then(([rows, fields]) => {
    console.log(`Successfully connected to MySQL database: ${rows[0].result}`);
  })
  .catch((err) => {
    console.error('Error connecting to MySQL database', err);
  });

const port = process.env.PORT || 5000;

// GET all lights
app.get('/api/lights', (req, res) => {
  pool.query('SELECT * FROM lights', (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching lights' });
    } else {
      res.json(result.rows);
    }
  });
});


app.use(express.static(path.join(__dirname, '../client/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
