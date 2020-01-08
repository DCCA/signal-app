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
    // let date = props.dataValues;
    let dataReady = [];
    for(let i = 0; i < props.priceValues.length; i++){
      let obj = {
        x: i,
        y: Math.round((Number(price[i])*1000))/1000
      }
      dataReady.push(obj);
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

  if (isLoading) {
    return <p>Loading…</p>;
  }
 
  return (
    <div className="graph-area">
      <h1>Price variation</h1>
      {graphData && graphData.length > 0 && (
        <XYPlot 
          width={window.innerWidth * 0.85} 
          height={300}
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
            title="Date"
            style={{
              line: { stroke: "white" },
              text: { stroke: "none", fill: "white", fontWeight: 300 }
            }}
          />
          <YAxis
            title="price"
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