import React, { useState } from 'react'
import { Chart } from 'react-charts'
 
export default function MyChart(props) {
  const chartData = React.useMemo(
    () => [
      {
        label: 'Price',
        data: [{ x: 1, y: 15 }, { x: 2, y: 2 }, { x: 3, y: 5 }]
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
 
  return (
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart data={chartData} axes={axes} />
    </div>
  )
}