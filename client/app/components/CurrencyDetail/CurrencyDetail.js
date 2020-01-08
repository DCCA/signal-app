import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyChart from "../Graph/MyChart";

export default function CurrencyDetail(props) {
  const [data, setData] = useState({});
  const [graphData, setGraphData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const getData = () => {
    setIsLoading(true);
    fetch("/api-call-currency?id=" + props.match.params.id)
      // Runs when success
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        setData(response);
      })
      // Runs when error
      .catch(error => {
        setIsLoading(false);
        setErrorList(error);
      });
  };

  const getGraphData = () => {
    fetch("/api-call-currency/graph?id=" + props.match.params.id)
      // Runs when success
      .then(response => response.json())
      .then(response => {
        setGraphData(response);
      })
      // Runs when error
      .catch(error => {
        setErrorList(error);
      });
  };

  useEffect(() => {
    getData();
    getGraphData();
  }, []);

  if (isLoading) {
    return <p>Loading…</p>;
  }

  return (
    <div className="currency-detail">
      <Link to="/">Go home</Link>
      {data &&
        data.length > 0 &&
        data.map(item => (
          <div className="card">
            <div className="card-name">
              <img className="currency-logo" src={item.logo_url}></img>
              <h1>{item.name}</h1>
              <h2>Currency: {item.currency}</h2>
            </div>
            <div className="card-data">
              <p>Price</p>
              <h3>{numeral(item.price).format("$ 0,0.00")}</h3>
              <p>MarketCap</p>
              <h3>{numeral(item.market_cap).format("$ 0 a")}</h3>
            </div>
            <div className='card-graph'>
            <MyChart priceValues={ graphData.prices } dataValues={ graphData.timestamps } />
            </div>
          </div>
        ))}
    </div>
  );
}
