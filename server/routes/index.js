const config = require('../../config/config'); 
const request = require('request');

module.exports = (app) => {
  // API routes
  // Get the name of the currencies
  app.get('/api-call', (req, res) => {
    let urlApi = 'https://api.nomics.com/v1/currencies?key=' + config.api_key + '&ids=BTC,ETH,XRP&attributes=id,name,logo_url';
    request( urlApi, function (error, response, body) {
      if(!error && response.statusCode == 200){
        let jData = JSON.parse(body);
        res.send(jData);
      }  		
    })
  });
  // Get the price of selected currency
  app.get('/api-call-currency', (req, res) => {
    console.log(req.url);
    console.log(req.query.id);
    let currencyId = req.query.id;
    let urlApi = 'https://api.nomics.com/v1/currencies/ticker?key=' + config.api_key + '&ids=' + currencyId.toUpperCase() + '&attributes=price';
    request( urlApi, function (error, response, body) {
      if(!error && response.statusCode == 200){
        let jData = JSON.parse(body);
        res.send(jData);
      }  		
    })
  });
};
