const mysql = require('mysql2')
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

module.exports = con;