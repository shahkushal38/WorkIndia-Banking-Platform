const { Router, query } = require("express");
const router = Router();
const connection = require("../config/db");
const bodyParser = require("body-parser");
const cryptr = require("../config/cryptr");
const statusCodes = require("../config/statusCodes");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/bankAccount", function (req, res) {
  try {
    if (req.body && req.body.accessLevel && req.body.accessLevel == "admin") {
      if (
        (req.body && req.body.email_id && req.body.name && req.body.dob,
        req.body.aadhar_number && req.body.pancard_number && req.body.address)
      ) {
        var email_id = req.body.email_id;
        var name = req.body.name;
        var dob = req.body.dob;
        var aadhar_number = req.body.aadhar_number;
        var pancard_number = req.body.pancard_number;
        var address = req.body.address;

        // ENCODE("${name}","secretKey")

        //generate pin
        var pin = Math.floor(1000 + Math.random() * 9000);
        console.log("PIN--", pin);
        var ens = cryptr.encrypt(pin);
        // generate account number
        var account_number = Math.random().toFixed(16).split(".")[1];
        console.log("account number --", account_number);

        const query = `insert into bankaccount(email_id, name, dob, aadhar_number,  pancard_number, 
            address, pin, account_number ) 
            values("${email_id}","${name}", "${dob}", "${aadhar_number}", "${pancard_number}", 
            "${address}", "${ens}", "${account_number}" ) `;

        connection.query(query, function(err, row, fields){
            if(err) throw err;
            else{
                res.status(statusCodes.Created).json({
                    status:"Account successfully created",
                    status_code: statusCodes.Created,
                    json_data: {
                        "pin": pin,
                        "account_number": account_number
                        }
                });
            }
        });
      } else {
        throw "Missing Data";
      }
    } else {
      throw "User is not Admin";
    }
  } catch (err) {
    console.log("Error --", err);
    res.status(statusCodes.Bad_Request).send({
      error: err,
    });
  }
});

module.exports = router;
