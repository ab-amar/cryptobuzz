import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {CryptoState} from '../CryptoContext';
import axios from 'axios';
import {SingleCoin} from './config/api'
import CoinInfo from '../Components/CoinInfo';
import { LinearProgress, StyledEngineProvider, Typography } from '@mui/material';
import parser from 'html-react-parser';
import { numberWithCommas } from '../Components/Banner/Carousel';

const Coinpage = () => {

  const {id} = useParams();
  const [coin, setCoin] = useState();

  const {currency,symbol} = CryptoState();

  const fetchCoin = async() => {
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  useEffect(() => {
    fetchCoin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  
  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}} />
  return (
    <StyledEngineProvider injectFirst>
    <div className='container'>
      <div className='sidebar'>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="165"
          style={{marginBottom:20}}
        />
           
        <Typography variant='h4' className='sidebar_heading'>
          {coin?.name}
        </Typography>

        <Typography variant='subtitle1' className='description'>
          {parser(coin?.description.en.split(". ")[0]+".")}
        </Typography>  

{/* Market Data */}

        <div className='market_data'>
          <span style={{display:"flex"}}>
            <Typography className='coin_heading'>Rank:</Typography>
            &nbsp;&nbsp;
            <Typography variant='h6' style={{fontFamily:"Montserrat", lineHeight:"1.2"}}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{display:"flex"}}>
            <Typography className='coin_heading'>Current Price:</Typography>
            &nbsp;&nbsp;
            <Typography variant='h6' style={{fontFamily:"Montserrat",lineHeight:"1.2"}}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()]) }
            </Typography>
          </span>

          <span style={{display:"flex"}}>
            <Typography className='coin_heading'>Market Cap:</Typography>
            &nbsp;&nbsp;
            <Typography variant='h6' style={{fontFamily:"Montserrat",lineHeight:"1.2"}}>
            {symbol}{" "}
              {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)) } M
            </Typography>
          </span>
        </div>    
      </div>
      
{/* Coin Info */}
      
      <CoinInfo coin={coin}/>
    </div>
    </StyledEngineProvider>
  )
}

export default Coinpage;
