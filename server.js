const con = require('./connection')
const express = require('express')
const app = express()

//routes

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

app.listen(3000, () => {
    console.log('Node API app is running on port 3000')
})