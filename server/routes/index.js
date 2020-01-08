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
    function getStartAndEndDate(){
      const date = new Date();
      const dateSecond = new Date();
      date.setHours(date.getHours() - 16)
      dateSecond.setHours(dateSecond.getHours() + 8);
      let endTime = dateSecond;
      endTime = encodeURIComponent(endTime.toISOString());
      let startTime = date;
      startTime = encodeURIComponent(startTime.toISOString());
      return([startTime, endTime])
    }
    const time = getStartAndEndDate();
    let urlApi = 'https://api.nomics.com/v1/currencies/sparkline?key=' + API_KEY + '&start=' + time[0] + '&end=' + time[1];
    request( urlApi, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(response.headers.date);
        let jData = JSON.parse(body);
        //Pass data already parsed
        function getDataFromSelectedCurrency(dataObject) {
          let selectedData;
          for (let i = 0; i < dataObject.length; i++) {
            if (dataObject[i].currency === currencyId.toUpperCase()) {
              selectedData = dataObject[i];
              return selectedData;
            }
          }
        }
        res.send(getDataFromSelectedCurrency(jData));
      }
    })
  });
};
