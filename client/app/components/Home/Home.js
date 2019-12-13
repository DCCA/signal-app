import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { api_key } from '../../../../config/config'

export default function Home() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const getData = () => {
    setIsLoading(true);
    fetch('https://api.nomics.com/v1/currencies/ticker?key=' + api_key + '&ids=BTC,ETH,XRP&interval=1d,30d&convert=EUR')
      // Runs when success
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false);
        setData(response);
      })
      // Runs when error
      .catch((error) => {
        setIsLoading(false);
        setErrorList(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (<p>Loading…</p>);
  }

  return (
    <div className='home-container flex-center'>
      <p>Welcome to the Signal app.</p>
      <p>Search for the price of your coin</p>  
      <Link className='button' to='/btc'>BTC</Link>
      <Link className='button' to='/eth'>ETH</Link>
      <Link className='button' to='/xrp'>XRP</Link>
      {(data && data.length > 0) && data.map((item) => (
        <div key={item.id}>
          <dt>{item.name}</dt>
          <dd>{item.price}</dd>
        </div>
      ))}
    </div>
  );
}
