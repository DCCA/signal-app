import React, { useState, useEffect, useRef } from 'react'
import { XAxis, YAxis, HorizontalGridLines, LineSeries, XYPlot, ChartLabel} from 'react-vis';
 
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
    let date = props.dataValues;
    console.log(date);
    console.log(typeof date[0]);
    let dataReady = [];
    for(let i = 0; i < props.priceValues.length; i++){
      // var d = new Date ( year, month, day, hour, minute, second );
      var secondPart = date[i].split('T')[1],
          hour = parseInt(secondPart.split(':')[0], 10),
          minute = parseInt(secondPart.split(':')[1], 10),
          second = parseInt(secondPart.split(':')[1], 10),
          day = parseInt(date[i].split('-')[2], 10),
          month = parseInt(date[i].split('-')[1], 10),
          year = parseInt(date[i].split('-')[0], 10);
      let dateObj = Date.parse(date[i]);
        console.log(dateObj);
      let obj = {
        x: dateObj,
        y: Math.round((Number(price[i])*1000))/1000
      }
      dataReady.push(obj);
    }
    let obj = {
      label: 'Price',
        data: dataReady
      }
    setGraphData(dataReady);
    setIsLoading(false);
  }

  if (isLoading) {
    return <p>Loading…</p>;
  }
 
  return (
    <div className="graph-area">
      <h1>Price variation (last 24h)</h1>
      {graphData && graphData.length > 0 && (
        <XYPlot 
          width={window.innerWidth * 0.85} 
          height={window.innerHeight / 3}
          margin={{left: 60}}
          >
          <HorizontalGridLines />
          <LineSeries
            color="white"
            data={graphData}
            strokeStyle="solid"
            opacity={1}
            opacityType="linear"
          />
          <XAxis
            title=""
            style={{
              line: { stroke: "white" },
              text: { stroke: "none", fill: "white", fontWeight: 300 }
            }}
            tickFormat={function tickFormat(d){
              const date = new Date(d)
              return date.toISOString().substr(11,5)
             }}
            tickTotal={13}
          />
          <YAxis
            title="Price"
            style={{
              line: { stroke: "white" },
              text: { stroke: "white", fill: "white", fontWeight: 300}
            }}
            tickFormat={(v => '$ ' + v)}
          />
        </XYPlot>
      )}
    </div>
  );
}