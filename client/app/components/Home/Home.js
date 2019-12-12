import React, { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const getData = () => {
    setIsLoading(true);
    fetch('https://api.nomics.com/v1/currencies/ticker?key=2018-09-demo-dont-deploy-b69315e440beb145&ids=BTC,ETH,XRP&interval=1d,30d&convert=EUR')
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
    <dl>
      {(data && data.length > 0) && data.map((item) => (
        <div key={item.id}>
          <dt>{item.name}</dt>
          <dd>{item.price}</dd>
        </div>
      ))}
    </dl>
  );
}
