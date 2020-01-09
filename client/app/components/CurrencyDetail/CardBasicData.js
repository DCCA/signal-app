import React from 'react'

export default function CardBasicData(props){
    return (
        <div className="card-data">
            <div className='price-marketcap-card'>
                <p>Price</p>
                <h3>{numeral(props.currencyPrice).format("$ 0,0.00")}</h3>
                <p>MarketCap</p>
                <h3>{numeral(props.currencyMarketCap).format("$ 0 a")}</h3>
            </div>
            <div className='price-variation'>
                <p>Price Change (24h)</p>
                <h3 className={(props.priceChange > 0) ? 'positive' : 'negative'} >{numeral(props.priceChange).format("$ 0,0.00")}</h3>
                <h4 className={(props.priceChangePercentage > 0) ? 'positive' : 'negative'} >{numeral(props.priceChangePercentage).format("0.00%")}</h4>
            </div>
        </div>
    )
}