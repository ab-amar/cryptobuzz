import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import Carousel from './Carousel';

const Banner = () => {
  return (
    <div className='banner'>

    <Container className='bannerContent'>
        <div className='tagLine'>
            <Typography
                variant='h2'
                style={{
                    fontWeight:"bold",
                    marginBottom: 15,
                    fontFamily: "Montserrat",
                }}>
                Crypto Buzz
            </Typography>
            <Typography
            variant='subtitle2'
            style={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
            }}>
                Get All The Info Regarding Your Favourite Crypto Currency
            </Typography>
        </div>
        <Carousel className='carousel'/>
    </Container>
      
    </div>
  )
}

export default Banner;
