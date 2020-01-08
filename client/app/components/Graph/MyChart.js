import React, { useState, useEffect, useRef } from 'react'
import { Chart } from 'react-charts'
 
export default function MyChart(props) {
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const didMountRef = useRef(false)
  useEffect(() => {
    if (didMountRef.current) {
      mountData();
      didMountRef.current = false
    } else didMountRef.current = true
  });

  const mountData = () => {
    let price = props.priceValues;
    // let date = props.dataValues;
    let dataReady = [];
    for(let i = 0; i < props.priceValues.length; i++){
      let arr = [i, Math.round((Number(price[i])*100)/100)];
      console.log(arr);
      dataReady.push(arr);
    }
    let obj = {
      label: 'Price',
        data: dataReady
      }
    console.log(obj);
    console.log(dataReady);
    setGraphData(dataReady);
    setIsLoading(false);
  }

  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      }
    ],
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  if (isLoading) {
    return <p>Loading…</p>;
  }
 
  return (
    <div
      style={{
        width: '400px',
        height: '200px'
      }}
    >
          {graphData.length < 0 ? <div>Still Loading... </div> : <Chart data={graphData} axes={axes} /> }
    </div>
  )
}