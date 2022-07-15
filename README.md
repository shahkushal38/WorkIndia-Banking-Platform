
# WorkIndia-Banking App
This is the project for WorkIndia Banking application APIs

An API application that can create a new account and display balance of a user, save its transactions and add money to user account


## Requirements:

### User account registration by Admin:

Create a user account only by admin

[POST] /app/admin/bankaccount

Request Data: {
 "email_id": str,
 "name": str,
 "dob": dateformat,
 "aadhar number": str,
 "pancard_number": str,
 "address": str
}


Response Data: {
 "status": "Account successfully created",
 "status_code": 201,
 "json_data": {
 "pin": "",
 "account_number": ""
 }
}


***Curl command to creating user account***:
```
curl --request POST \
  --url http://localhost:3000/admin/bankAccount \
  --header 'Content-Type: application/json' \
  --data '{
	"email_id": "shahkushal38@gmail.com",
	"name": "Kushal Shah",
	"dob": "2022-07-15",
	"aadhar_number": "1234 5567 8901",
	"pancard_number": "APB907",
	"address": "Vile Parle, Mumbai",
	"accessLevel":"admin"
}'
```
 

### User account login:
Provide the ability to log into the panel using account number/email id (Username)& generated pin.

[POST] /app/account/login

Request Data: {
 "username": str,
 "pin": str
}

For success,

Response Data: {
 "status": 'success',
 "username': str,
 "status_code": 200
}

For failure,

Response Data: {
 "status": "Incorrect username/password provided. Please retry",
 "status_code": 401
}

 
***Curl command to test user login***:
```
curl --request POST \
  --url http://localhost:3000/account/login \
  --header 'Content-Type: application/json' \
  --data '{
	"username":"4154905525167187",
	"pin":"8085"
}'
```


### Get a Balance Enquiry for User: 

Uer can view their account balance

[GET] /app/account/balance?account_no={account_number)

Request Data: None

Response Data:
{
 "account_number": "1234567887654321",
 "balance": 10000.0,
 "account_state": "ACTIVE",
 "last_transaction_timestamp": "13223434"
}

***Curl command to test***:
```
curl --request GET \
  --url http://localhost:3000/account/balance/4154905525167187 \
  --header 'Content-Type: application/json' \
  --data '{
	"username":"4154905525167187",
	"pin":"8085"
}'
```


### Add Money
Provide the ability for the user to add money to existing account

[POST] /app/account/transaction/add
Request Data: {
 "amount": 10000,
 "transaction_mode": "Cash"
}
Response Data: {
 'status': 'Transaction happened successfully',
 'status_code': 200
}

***Curl command to test***:

```
curl --request POST \
  --url http://localhost:3000/account/transaction/add \
  --header 'Content-Type: application/json' \
  --data '{
	"account_number":"4154905525167187",
	"amount":2000,
	"transaction_mode":"Cash"
}'
```
