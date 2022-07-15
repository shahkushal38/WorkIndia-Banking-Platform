const mysql = require("mysql");

const connection  = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "nodeapp"
});

connection.connect(function(err){
    if(err) throw err;
    else{
        console.log("connection with db");
    }
});

module.exports = connection;