const io=require('socket.io')(8000);
const express=require("express");

var con=require('./db');
var mysql=require('mysql');

 const users={}
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE rkchat", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
// });
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE users (name VARCHAR(255), address VARCHAR(255))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });


io.on('connection',socket=>{
    //  con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    //     con.query(sql, function (err, result) {
    //         if (err) throw err;
    //         console.log("Table created");
    //     });
    // });
    
    
    
    socket.on('new-user-joined',name=>{
        
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
        con.query("insert into chatusers(userId,userName) values ('"+3+"',"+"'"+name+"')",function(err,result){
            if(err) throw err;
            console.log("socketid inserted");
        })

    })

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    })
})