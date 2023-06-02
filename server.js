const mysql = require('mysql2')
const express = require('express')
const app = express()

app.use(express.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Prab49973',
    database: 'test'
});

con.connect((err) => {
    if(err){
        console.log("Connection Error");
        console.log(err);
    }else{
        console.log("Connection to MySQL Database");
    }
});

app.listen(3000, () => {
    console.log('Node API app is running on port 3000')
})

app.get('/', (req, res) =>{
    res.send('Hello Node API')
})

app.get('/all-student', (req, res) =>{
    con.query("select * from Name_ID", (err, result) =>{
        if(err){
            res.send('Error');
        }else{
            res.send(result);
        }
    })
})

app.post('/add-student', (req, res) =>{
    const data = req.body;
    con.query("INSERT INTO Name_ID SET ?", data, (err, result) =>{
        if(err){
            res.send('Error');
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.put('/update-student/:id', (req, res) =>{
    const data = [req.body.Full_name, req.body.Nickname, req.params.id];
    con.query("UPDATE Name_ID SET Full_name = ?, Nickname = ? where ID = ?", data, (err, result) =>{
        if(err){
            res.send('Error');
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete('/delete-student/:id', (req, res) =>{
    let student_id = req.params.id;
    con.query("DELETE from Name_ID where ID = " + student_id, (err, result) =>{
        if(err){
            res.send('Error');
            console.log(err);
        }else{
            res.send(result);
        }
    })
})