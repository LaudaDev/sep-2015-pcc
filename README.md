# SEP-PCC

Uni Project 2015 - SEP Payment Card Center REST Service using Hapi & Sequalize frameworks.

## Requirments
  - Node.js (best to use latest stable)

### Version
0.0.2

### Installation

You need [Node.JS] before starting this project!
* Rename config file located in src/config/config.json.sample to config.json
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
* MySQL

### JSON Message Format
* INPUT
```json
{
  "pan": string,
  "securityCode": int,
  "cardHolderName": string,
  "cardExpirationDate": string,
  "acquirerOrderId": int,
  "acquirerTimestamp": int,
  "transactionAmount": float
}
```

* OUTPUT
```json
{
  "pan": string,
  "securityCode": int,
  "cardHolderName": string,
  "cardExpirationDate": string,
  "acquirerOrderId": int,
  "acquirerTimestamp": int,
  "transactionAmount": float,
  "issuerOrderId": int,
  "issuerTimestamp": int
}
```


### Todo

 - Add input JSON object validation (optional)


License
----

MIT
