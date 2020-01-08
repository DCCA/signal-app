import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyChart from "../Graph/MyChart";
import CardName from "./CardName";
import CardBasicData from "./CardBasicData";
import SiteLoader from '../Loader/SiteLoader'

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
    return (
    <SiteLoader />
    );
  }

  return (
    <div className="currency-detail">
      <Link to="/">Go home</Link>
      {data &&
        data.length > 0 &&
        data.map(item => (
          <div className="card">
            <CardName currencyName={item.name} currencyImageUrl={item.logo_url} currencyId={item.currency}/>
            <CardBasicData currencyPrice={item.price} currencyMarketCap={item.market_cap}/>
            <div className='card-graph'>
            <MyChart priceValues={ graphData.prices } dataValues={ graphData.timestamps } />
            </div>
          </div>
        ))}
    </div>
  );
}
