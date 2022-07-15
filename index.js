const express = require("express");
const app = express();
const sqlRoute = require("./router/sqlRoute");
const bodyParser = require("body-parser");
const admin = require("./router/admin");
const accountRoute = require("./router/account");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static("public"));

app.get("/", function(req,res){
    res.send("Hello World");
});


//start node server
app.listen(3000, function(){
    console.log("Server listening to port 3000");
});

app.use("/sqlRoute",sqlRoute);
app.use("/admin", admin);
app.use("/account", accountRoute);
console.log("Project started");