import React from 'react'

export default function CardName(props) {
    return (
        <div className="card-name">
            <img className="currency-logo" src={props.currencyImageUrl}></img>
            <h1>{props.currencyName}</h1>
            <h2>Currency: {props.currencyId}</h2>
        </div>
    )
}