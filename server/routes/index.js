const config = require('../../config/config'); 
const request = require('request');

module.exports = (app) => {
  // API routes
  app.get('/api-call', (req, res) => {
    let urlApi = 'https://api.nomics.com/v1/currencies?key=' + config.api_key + '&ids=BTC,ETH,XRP&attributes=id,name,logo_url';
    request( urlApi, function (error, response, body) {
      if(!error && response.statusCode == 200){
        let jData = JSON.parse(body);
        res.send(jData);
      }  		
    })
  });
};
