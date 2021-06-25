const express = require('express');
const app = express();
var mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'info',
    user: 'mysql1',
    password: '9800808832a'
});


app.post('/',(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const age = req.body.age
    const accountno = req.body.accountno
    const branchname = req.body.branchname
    const zipcode = req.body.zipcode

    connection.query("INSERT INTO cust_info (name, email, phone, age, accountno, branchname, zipcode) VALUES(?,?,?,?,?,?,?)",
    [name, email, phone, age, accountno, branchname, zipcode], (err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    });

});

app.get('/', function(req,res){
    let sql = "SELECT name,email,phone,age,accountno,branchname,zipcode FROM info.cust_info ORDER BY id DESC LIMIT 1";
    connection.query(sql,function(err,results){
        if(err){
            console.log(err);
        }
        res.send(results);
    });
});

app.listen(3001, () =>{
    console.log("Hey How are you");
    connection.connect(function(err){
        if(err) throw err;
        console.log("Database connected"); 
     })
});