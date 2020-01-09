import React, { useState, useEffect, useRef } from 'react'
import { XAxis, YAxis, HorizontalGridLines, LineSeries, XYPlot, ChartLabel} from 'react-vis';
import SiteLoader from '../Loader/SiteLoader'
 
export default function MyChart(props) {
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const didMountRef = useRef(false)

  function generateObjectForGraph(price, date){
    let dataReady = [];
    for(let i = 0; i < props.priceValues.length; i++){
      let dateObj = Date.parse(date[i]);
      let obj = {
        x: dateObj,
        y: Math.round((Number(price[i])*1000))/1000
      }
      dataReady.push(obj);
    }
    return dataReady
  }

  function handleDataWhenReady(){
    setGraphData(generateObjectForGraph(props.priceValues, props.dataValues));
    setIsLoading(false);
  }

  function setMarginLeft(num){
    if(num < 1){
      let lengthFromPrice = num.toString()
      lengthFromPrice = lengthFromPrice.length * 12;
      return lengthFromPrice
    } if(num < 5){
      let lengthFromPrice = num.toString()
      lengthFromPrice = lengthFromPrice.length * 14;
      return lengthFromPrice
    }else {
      let lengthFromPrice = num.toString()
      lengthFromPrice = lengthFromPrice.length * 8;
      return lengthFromPrice
    }
  }

  useEffect(() => {
    if (didMountRef.current) {
      handleDataWhenReady();
      didMountRef.current = false
    } else didMountRef.current = true
  });

  if (isLoading) {
    return (
      <SiteLoader />
    );
  }
 
  return (
    <div>
      <h1>Price variation (24h)</h1>
      {graphData && graphData.length > 0 && (
        <XYPlot 
          width={window.innerWidth * 0.85} 
          height={window.innerHeight / 3}
          margin={{left: setMarginLeft(graphData[0].y), bottom: 50}}
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