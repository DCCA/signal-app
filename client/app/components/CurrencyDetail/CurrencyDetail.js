import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function CurrencyDetail(props) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorList, setErrorList] = useState([]);

    const getData = () => {
        setIsLoading(true);
        fetch('/api-call-currency?id=' + props.match.params.id)
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
        console.log(data);
      }, []);
    
      if (isLoading) {
        return (<p>Loading…</p>);
      }
    
    return (
        <div className='currency-detail'>
            <Link to="/">Go home</Link>
            {(data && data.length > 0) && data.map((item) => (
              <div className='card'>
                <div className='card-name'>
                  <img className='currency-logo' src={item.logo_url}></img>
                  <h1>Currency: {item.name}</h1>
                  <h1>Currency: {item.currency}</h1>
                </div>
                <div className='card-data'>
                  <h2>Price: $ {(Math.round(item.price * 100)/100).toFixed(2)}</h2>
                  <h2>MarketCap: $ {item.market_cap}</h2>
                </div>
              </div>  
              ))}
        </div>
    )
}
