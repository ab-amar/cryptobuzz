import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TrendingCoins } from '../../Pages/config/api';
import {CryptoState} from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
} //regex

const Carousel = () => {

    const {currency, symbol} = CryptoState();
    const [Trending, setTrending] = useState([]);

    const fetchTrendingCoins = async() => {
        const {data} = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };

    useEffect(() => {
        fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const items = Trending.map((coin)=>{
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link className='carouselItem' to={`/coins/${coin.id}`}>
                <img
                    src={coin.image}
                    alt={coin.name}
                    height="80"
                    style={{marginBottom:10}}
                />
                <span>
                    {coin.symbol}
                    &nbsp;
                    <span 
                        style={{
                                color: profit > 0 ? "rgb(14,203,129)" : "red",
                                fontWeight:500
                            }}
                    >
                    {profit && '+'} {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </span>
                <span>
                    {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });

    const responsive = {
        0:{
            items:2,
        },
        512:{
            items:4,
        }

    };

    return (
        <div>
        <AliceCarousel
            mouseTracking
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            infinite
            autoPlay
            items={items}
        />
        </div>
    )
}

export default Carousel;
