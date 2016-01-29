# SEP-PCC

Uni Project 2015 - SEP Payment Card Center REST Service using HapiJS & SequalizeJS frameworks.

## Requirments
  - Node.JS (best to use latest stable)

### Version
0.0.3

### Installation

You need [Node.JS](https://nodejs.org/en/) before starting this project!
* Make a new file in src/config dir. Copy the content from src/config/config.json.sample file and edit it for your needs.
* Edit server and MySQL settings located in config.json file.
* Add key and certificate to src/config/key directory and edit their path in config.json file.
* Follow the rest steps for building the project.

```sh
$ git clone [git-repo-url] sep-pcc
```

```sh
$ cd sep-pcc
$ npm install
$ node server
```
To stop server from running press the following in the console window:
```sh
$ CTRL + C
```

To run test server for sending requests, do the following:
```sh
$ node issuer_server
```

### Plugins

sep-pcc project is currently extended with the following plugins:

* Hapi.JS & Sequelize.JS as frameworks
* MySQL - database
* Good & good-cli for logging
* Boom - custom error messages
* Request - sending custom http requests

### JSON Message Format
* INPUT (Merchant -> Acquirer -> PCC -> Issuer)
```json
{
	"cardInfo": {
		"pan": "string",
		"securityCode": "int",
		"holderName": "string",
		"expirationDate": "string"
	},
	"acquirerInfo": {
		"orderId": "int",
		"timestamp": "date (dd.MM.yyyy HH:mm:ss)"
	},
	"transactionAmount": "BigDecimal"
}
```

* OUTPUT (Issuer -> PCC -> Acquirer -> Merchant)
```json
{
  "acquirerInfo": {
    "orderId": "int",
    "timestamp": "date (dd.MM.yyyy HH:mm:ss)"
  },
  "issuerInfo": {
    "orderId": "int",
    "timestamp": "date (dd.MM.yyyy HH:mm:ss)"
  },
  "transactionStatus": {
    "code": "string",
    "message": "string"
  }
}
```

* OUTPUT (Issuer -> PCC -> Acquirer -> Merchant) IN CASE OF AN ERROR (Issuer not available, ect)
```json
{
  "transactionStatus": {
    "code": "string",
    "message": "string"
  }
}
```

### API ERROR CODES
| CODE        | MESSAGE           | DESCRIPTION  |
| :-------------: |:-------------:|:-----|
| 00 | TRANSACTION_COMPLETED | Transaction completed successfully |
| 01 | CARD_AUTHENTICATION_FAILED | Credit Card authentication failed (bad pan, ccv, date, ect) |
| 02 | CARD_INSUFFICIENT_FUNDS | Transaction authorization failed (Not enough money, ect) |
| 03 | NO_ISSUER | Issuer bank was not found     |
| 04 | REQUEST_FORMAT_ERROR | Bad JSON format    |
| 05 | SERVER_ERROR | Internal server error, server offline, ect |

### Todo

 - Nothing :)

### Note

- In case you don't have a valid SSL certificate and in case you have generated your own self-signed (openssl, ect) certificate, you will have to accept a security exception in your browser for this app to work.


License
----

MIT
