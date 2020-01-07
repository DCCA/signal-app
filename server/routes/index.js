const API_KEY = process.env.API_KEY;
const request = require('request');

module.exports = (app) => {
  // API routes
  // Get the name of the currencies
  app.get('/api-call', (req, res) => {
    let urlApi = 'https://api.nomics.com/v1/currencies?key=' + API_KEY + '&ids=BTC,ETH,XRP,USDT,BCH,LTC,EOS,BNB,BSV,XMR,XLM,TRX,ADA,XTZ,LEO,BAT,ATOM,HT,NEO,LINK,ETC&attributes=id,name,logo_url';
    request( urlApi, function (error, response, body) {
      if(!error && response.statusCode == 200){
        let jData = JSON.parse(body);
        res.send(jData);
      }  		
    })
  });
  // Get the price of selected currency
  app.get('/api-call-currency', (req, res) => {
    let currencyId = req.query.id;
    let urlApi = 'https://api.nomics.com/v1/currencies/ticker?key=' + API_KEY + '&ids=' + currencyId.toUpperCase() + '&attributes=price';
    request( urlApi, function (error, response, body) {
      if(!error && response.statusCode == 200){
        let jData = JSON.parse(body);
        res.send(jData);
      }  		
    })
  });
  // Get the sparkline graph
  app.get('/api-call-currency/graph', (req, res) => {
    let currencyId = req.query.id;
    let urlApi = 'https://api.nomics.com/v1/currencies/sparkline?key=' + API_KEY + '&start=2020-01-05T00%3A00%3A00Z&end=2020-01-06T00%3A00%3A00Z';
    request( urlApi, function (error, response, body) {
      if(!error && response.statusCode == 200){
        let jData = JSON.parse(body);
        for(let i = 0; i < jData.length; i++){
          if(jData[i].currency === currencyId.toUpperCase()){
            jData = jData[i];
          }
        }
        res.send(jData);
      } 
    })
  });
};
