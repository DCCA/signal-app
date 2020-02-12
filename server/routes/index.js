const API_KEY = process.env.API_KEY;
const rp = require('request-promise');
const helper = require('./helper');

module.exports = app => {
  // API routes
  // Get the name of the currencies
  app.get('/api-call', (req, res) => {
    let urlApi =
      'https://api.nomics.com/v1/currencies?key=' +
      API_KEY +
      '&ids=BTC,ETH,XRP,USDT,BCH,LTC,EOS,BNB,BSV,XMR,XLM,TRX,ADA,XTZ,LEO,BAT,ATOM,HT,NEO,LINK,ETC&attributes=id,name,logo_url';
    rp(urlApi)
      .then(data => JSON.parse(data))
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });
  // Get the price of selected currency
  app.get('/api-call-currency', (req, res) => {
    let currencyId = req.query.id;
    let urlApi =
      'https://api.nomics.com/v1/currencies/ticker?key=' +
      API_KEY +
      '&ids=' +
      currencyId.toUpperCase() +
      '&attributes=price';
    rp(urlApi)
      .then(data => JSON.parse(data))
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });
  // Get the sparkline graph
  app.get('/api-call-currency/graph', (req, res) => {
    let currencyId = req.query.id;
    const time = helper.getStartAndEndDate();
    let urlApi =
      'https://api.nomics.com/v1/currencies/sparkline?key=' +
      API_KEY +
      '&start=' +
      time[0] +
      '&end=' +
      time[1];
    rp(urlApi)
      .then(data => JSON.parse(data))
      .then(data => {
        res.send(helper.getDataFromSelectedCurrency(data, currencyId));
      })
      .catch(err => console.log(err));
  });
};
