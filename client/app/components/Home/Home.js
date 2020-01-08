import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SiteLoader from '../Loader/SiteLoader'

export default function Home() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

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

  const handleChange = function (e){
    setSelectedItem({selectValue:e.target.value});
  }

  if (isLoading) {
    return (
      <SiteLoader />
    );
  }

  return (
    <div className='home-container'>
      <h1>Welcome to the Signal app.</h1>
      <h2>Search for the price of your coin:</h2>
      <div className='box-position'>
        <div className='box'>
          <select className='selectItem' onChange={handleChange}>
              <option>Select</option>
          {(data && data.length > 0) && data.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
          ))}
          </select>
        </div>
      </div>
      <Link 
        className='button' 
        to={'/currency-detail/' + selectedItem.selectValue}
        >
        Search
      </Link>
    </div>
  );
}
