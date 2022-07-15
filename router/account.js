const { Router, query } = require("express");
const cryptr = require("../config/cryptr");
const router = Router();
const connection = require("../config/db");
const bodyParser = require("body-parser");
const statusCodes = require("../config/statusCodes");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/login",function(req,res){
    try{
        if(req.body &&  req.body.username && req.body.pin){
            var username = req.body.username;
            var pin = parseInt(req.body.pin);
            const query = `select pin from bankaccount where (account_number="${username}" or email_id =
             "${username}")  `;
            // (pin= AES_ENCRYPT("${pin}","secretKey")
            connection.query(query, function(err, row, fields){
                if(err) throw err;
                else{
                    console.log("row--", row);
                    var de = cryptr.decrypt(row[0].pin);
                    console.log(de);
                    // (row.pin == AES_ENCRYPT(pin,"secretKey"))
                    if(de == pin){
                        res.status(statusCodes.Success).json({
                            "status":"success",
                            "status_code": statusCodes.Success,
                            "username":username 
                        });  
                    }
                    else{
                        res.status(statusCodes.Unauthorized).json({
                            status:"Incorrect username/password provided. Please retry",
                            status_code: statusCodes.Unauthorized
                        });
                    }
                }
            });
           
            
        }
        else{
            throw "Missing Data";
        }
    }catch(err){
        console.log("Error --", err);
        res.status(statusCodes.Bad_Request).send({
            error: err,
        });
    }
});

router.get("/balance/:account_no", function(req,res){
    try{
        var account_no = req.params.account_no;

        const query = `select * from balance where account_number="${account_no}"`;
        connection.query(query, function(err, rows, fields){
            if(err) {
                res.status(statusCodes.Bad_Request).send({
                    error: "Account Number not found",
                });
            }
            else{
                res.status(statusCodes.Success).json({
                    status_code:statusCodes.Success,
                    "data": rows
                });                
            }
        });

    }catch(err){
        console.log("Error --", err);
        res.status(statusCodes.Bad_Request).send({
            error: err,
        });
    }

});

router.post("/transaction/add",async  function(req,res){
    try{
        if(req.body && req.body.account_number && req.body.amount){
            var account_number = req.body.account_number;
            var amount = req.body.amount;
            var transaction_mode = req.body.transaction_mode;

            const query = `insert into transaction(account_number, transaction_status, transaction_type, amount, transaction_mode) 
            values("${account_number}", "completed", "deposit", "${amount}", "${transaction_mode}")`;
            const query1 = `select amount from balance where account_number ="${account_number}" `;
            var oldAmount =0;
            await  connection.query(query1, function(err, rows, fields){
                if(err) {
                    res.status(statusCodes.Bad_Request).send({
                        error: "Account Number not found",
                    });
                }else{
                    oldAmount = rows[0].amount;
                }
            });
            var newAmount = parseFloat(oldAmount)+ amount;
            console.log("new amount---",newAmount);
            const query2 = `update balance set amount="${newAmount}" where account_number = "${account_number}"`;

            await connection.query(query2, function(err, rows, fields){
                if(err) {
                    res.status(statusCodes.Bad_Request).send({
                        error: "Account Number not found",
                    });
                }
            });

            connection.query(query, function(err, rows, fields){
                if(err) {
                    res.status(statusCodes.Bad_Request).send({
                        error: "Account Number not found",
                    });
                }
                else{
                    res.status(statusCodes.Success).json({
                        status_code:statusCodes.Success,
                        "status": "Transaction happened successfully"
                    });                
                }
            });


        }else{
            throw "Missing Data"
        }

    }catch(err){
        console.log("Error --", err);
        res.status(statusCodes.Bad_Request).send({
            error: err,
        });
    }

});


module.exports = router;