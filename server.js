const mysql = require('mysql2/promise');
const express = require('express');
const app = express();

app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Prab49973',
  database: 'test'
});

app.listen(3000, () => {
  console.log('Async-Node API app is running on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello Node API');
});

app.get('/all-student', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM Name_ID');
    connection.release();
    res.send(rows);
  } catch (err) {
    res.send('Error');
    console.log(err);
  }
});

app.post('/add-student', async (req, res) => {
  const data = req.body;
  try {
    const connection = await pool.getConnection();
    const [existingRows, _] = await connection.query('SELECT * FROM Name_ID WHERE Full_name = ? AND Nickname = ?', [data.Full_name, data.Nickname]);
    if (existingRows.length === 0) {
      const [result, _] = await connection.query('INSERT INTO Name_ID SET ?', data);
      connection.release();
      res.send(result);
    } else {
      connection.release();
      res.send('Student already exists');
    }
  } catch (err) {
    res.send('Error');
    console.log(err);
  }
});

app.put('/update-student/:id', async (req, res) => {
  const data = [req.body.Full_name, req.body.Nickname, req.params.id];
  try {
    const connection = await pool.getConnection();
    const [result, _] = await connection.query('UPDATE Name_ID SET Full_name = ?, Nickname = ? WHERE ID = ?', data);
    connection.release();
    res.send(result);
  } catch (err) {
    res.send('Error');
    console.log(err);
  }
});

app.delete('/delete-student/:id', async (req, res) => {
  const student_id = req.params.id;
  try {
    const connection = await pool.getConnection();
    const [result, _] = await connection.query('DELETE FROM Name_ID WHERE ID = ?', student_id);
    connection.release();
    res.send(result);
  } catch (err) {
    res.send('Error');
    console.log(err);
  }
});
