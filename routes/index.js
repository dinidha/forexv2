var express = require('express');
var router = express.Router();
var fs = require('fs');
var axios = require('axios')
require('dotenv').config({ path: 'creds/.env' })

//creds/.env

const url = 'https://sandbox.api.visa.com/forexrates/v2/foreignexchangerates';
const key = fs.readFileSync('creds/key.pem');
const cert = 'creds/cert.pem';
const ca = 'creds/ca.crt';
const username = process.env.API_USERNAME
const password = process.env.API_PASSWORD
 

const connectToAPI = async (data) => {
  const headers = {
    uri: url,
    key: key,
    cert: cert,
    ca: ca,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString(),
    },
    body: data
  }

  const dataFromApi = await axios.post(url, data)
  return dataFromApi
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  const data = {
    "acquirerDetails": {
    "bin": 408999,
    "settlement": {}
    },
    "rateProductCode": "A",
    "markupRate": "0.07",
    "destinationCurrencyCode": "826",
    "sourceAmount": "100.55",
    "sourceCurrencyCode": "840"
    }
  connectToAPI(data)
    .then(res => {
    console.log(res)
    })
    .catch(err => {
    console.log(err)
  })
});

module.exports = router;
