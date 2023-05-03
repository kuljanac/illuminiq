const mysql = require('./node_modules/mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'illuminiq',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function getLights() {
  try {
    const [rows] = await connection.query('SELECT * FROM lights');
    return rows;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connection, getLights };
