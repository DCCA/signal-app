module.exports = {
  getDataFromSelectedCurrency: function(dataObject, queryId) {
    let selectedData;
    for (let i = 0; i < dataObject.length; i++) {
      if (dataObject[i].currency === queryId.toUpperCase()) {
        selectedData = dataObject[i];
        return selectedData;
      }
    }
  },
  getStartAndEndDate: function() {
    //create new two dates
    //Improvements: make this timezone adjustment with the server response variable
    const date = new Date();
    const dateSecond = new Date();
    //set the right hour to correct the timezone from the api
    date.setHours(date.getHours() - 16);
    dateSecond.setHours(dateSecond.getHours() + 8);
    //convert the time to the API format
    let endTime = dateSecond;
    endTime = encodeURIComponent(endTime.toISOString());
    let startTime = date;
    startTime = encodeURIComponent(startTime.toISOString());
    //return value
    return [startTime, endTime];
  }
};
