var mysql=require('mysql');

var con = mysql.createConnection({
    host:'localhost',
    database:'rkchat',
    user:'amisha',
    password:'#Roshan77'
})
module.exports=con;