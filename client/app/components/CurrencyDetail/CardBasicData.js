import React from 'react'

export default function CardBasicData(props){
    return (
        <div className="card-data">
            <p>Price</p>
            <h3>{numeral(props.currencyPrice).format("$ 0,0.00")}</h3>
            <p>MarketCap</p>
            <h3>{numeral(props.currencyMarketCap).format("$ 0 a")}</h3>
        </div>
    )
}