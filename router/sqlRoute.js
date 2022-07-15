const { Router, query } = require("express");
const router = Router();
const connection = require("../config/db");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

// router.get("/getData1", function(req, res){
//     const query = "select * from user";

//     connection.query(query, function(err, rows, fields){
//         if(err) throw err;
//         else{
//             res.status(200).send({
//                 message: "Hello",
//                 data: rows,
//                 fields: fields
//             });
//         }
//     });
// });


router.get("/getData", function(req, res){
    // decode(name,'secretKey')
    // select decode(ENCODE((select name from user where id = 1),'secretKey'),'secretKey'), mobile, email from user
    const query = "select DECODE(name, 'secretKey') from user";

    connection.query(query, function(err, rows, fields){
        if(err) throw err;
        else{
            rows.forEach(element => {
                console.log("Element --", element);
            });
            res.status(200).send({
                message: "Hello",
                data: rows
            });
        }
    });
});

router.post("/insertData", function(req,res){
    if(req.body){
        var name = req.body.name;
        var id = req.body.id;
        var email = req.body.email;
        var mobile = req.body.mobile;
        console.log("req--", req.body);
        const query = `insert into user(id,name,email,mobile) values("${id}", ENCODE("${name}","secretKey"),"${email}", "${mobile}") `;
        connection.query(query, function(err, row, fields){
            if(err) throw err;
            else{
                res.status(200).json({
                    message:"data inserted succesfully",
                });
            }
        });
    }else{
        console.log("no request---- ", req);
    }
});


module.exports = router;
