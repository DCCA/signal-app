import React, { useState, useEffect } from 'react'

export default function CurrencyDetail() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorList, setErrorList] = useState([]);
    console.log(location);

    const getData = () => {
        setIsLoading(true);
        fetch('/api-call-currency?id=')
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
            <h1>BTC</h1>
            <h3>Price: $ 6.989,98</h3>
        </div>
    )
}
