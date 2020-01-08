import React, { useState, useEffect, useRef } from 'react'
import { XAxis, YAxis, HorizontalGridLines, LineSeries, XYPlot, ChartLabel} from 'react-vis';
import SiteLoader from '../Loader/SiteLoader'
 
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
    let dataReady = [];
    for(let i = 0; i < props.priceValues.length; i++){
      let dateObj = Date.parse(date[i]);
      let obj = {
        x: dateObj,
        y: Math.round((Number(price[i])*1000))/1000
      }
      dataReady.push(obj);
    }
    setGraphData(dataReady);
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <SiteLoader />
    );
  }
 
  return (
    <div>
      <h1>Price variation (last 24h)</h1>
      {graphData && graphData.length > 0 && (
        <XYPlot 
          width={window.innerWidth * 0.85} 
          height={window.innerHeight / 3}
          margin={{left: 50, bottom: 50}}
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
              text: { stroke: "none", fill: "white", fontWeight: 300, fontSize: 10}
            }}
            tickFormat={function tickFormat(d){
              const date = new Date(d)
              return date.toISOString().substr(11,5)
             }}
            tickTotal={14}
            tickLabelAngle={-90}
          />
          <YAxis
            title=""
            style={{
              line: { stroke: "white" },
              text: { fill: "white",fontWeight: 300, fontSize: 12}
            }}
            tickFormat={v => '$ ' + [v]}
          />
        </XYPlot>
      )}
    </div>
  );
}