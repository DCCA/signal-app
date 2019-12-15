import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const getData = () => {
    setIsLoading(true);
    fetch('/api-call')
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
      <Link className='button' to='/currency-detail/:id'>Currency Detail</Link>
      <select>
      {(data && data.length > 0) && data.map((item) => (
          <option key={item.id}>{item.name}</option>
      ))}
      </select>
    </div>
  );
}
