// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../Pages/config/api';
import { chartDays } from "../Pages/config/data";
import SelectButton from "./SelectButton";


const CoinInfo = ({coin}) => {

  const [historicData, setHistoricData]=useState([]);
  // eslint-disable-next-line no-unused-vars
  const [days, setDays]=useState(1);

  const {currency}=CryptoState();

  const fetchHistoricData = async() => {
    const {data} = await axios.get(HistoricalChart(coin.id,days,currency));
    setHistoricData(data.prices);
  }

  useEffect(() => {
   fetchHistoricData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency,days]);

  const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
  });

  const data = {
    labels: historicData.map((coin) => {
          let date = new Date(coin[0]);
          let time = date.getHours>12 ? `${date.getHours()-12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
          return days===1 ? time: date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price  ( Past ${days} Days) in ${currency}`,
        data: historicData.map((coin) => {
                  return coin[1];
                }),
        borderColor: "#EEBC1D",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
     
    ],
    
  };

const config = {
    elements:{
      point:{
        radius:1,
      },
    },
    type: 'line',
    data: data,
    responsive:true,
    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
    plugins:{
      legend: {
        position: 'top',
        onClick:()=>{}
      },
      tooltip: {
        mode: 'nearest',
        },
    }, 
};


  return (
    
    <ThemeProvider theme={darkTheme}>
      <div className='coinInfo_container'>
        { /* chart */ }
        {
        !historicData?(
          <CircularProgress
            style={{color:"gold"}}
            size={250}
            thickness={1}
          />
        ):(
          <>
            <Line options={config} data={data}/>
          </>
        )
        }
    
        {/* buttons */}
        <div style={{
          display:"flex",
          justifyContent:"space-around",
          width:"100%",
          paddingTop:"20px"
        }}>
          {chartDays.map((day) => {
            return <SelectButton
                      key={day.value}
                      onClick={()=>{
                        setDays(day.value)
                      }}
                      selected={day.value===days}
                    >
                      {day.label}
                    </SelectButton>
          })}
        </div>
      </div>
    </ThemeProvider>
    
  )
}

export default CoinInfo;
