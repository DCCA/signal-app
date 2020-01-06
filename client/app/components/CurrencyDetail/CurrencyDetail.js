import React, { useState, useEffect } from 'react'

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
        <div>
            {(data && data.length > 0) && data.map((item) => (
              <div>
                <h1>{item.currency}</h1>
                <h2>{item.price}</h2>
                <h2>{item.market_cap}</h2>
              </div>
              ))}
        </div>
    )
}
