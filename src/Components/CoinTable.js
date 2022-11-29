import { Container, createTheme,  LinearProgress,  Pagination,  Table,  TableBody,  TableCell,  TableContainer, TableHead, TableRow, TextField, ThemeProvider,Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { CoinList } from '../Pages/config/api';
import { numberWithCommas } from './Banner/Carousel';

const CoinTable = () => {
    let navigate = useNavigate();

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const {currency, symbol} = CryptoState();
    

    const fetchCoins = async() => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
        
    };
    
    useEffect(() => {
      fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);
    
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
      });

      const handleSearch = () =>{

        return coins.filter((coin) => {

           return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)||coin.id.toLowerCase().includes(search) ;
        })
      }
  return (
    <ThemeProvider theme={darkTheme}>
         <Container style={{textAlign:"center"}}>
            <Typography variant='h4' style={{margin:18, fontFamily:"Montserrat"}}>
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField label="Search For Crypto Currency" variant='outlined' style={{marginBottom:20, width:"100%"}} 
            onChange={(e)=>setSearch(e.target.value.toLocaleLowerCase())}
            />
            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor:"gold"}}/>
                    ):(
                        <Table>
                            <TableHead style={{backgroundColor:"#EEBC1D"}}>
                                <TableRow>
                                    {
                                        ["Coin","Price","24h Change","Market Cap"].map((head)=>(
                                            <TableCell
                                            style={{
                                                color:"black",
                                                fontWeight:"700",
                                                fontFamily:"Montserrat",
                                            }}
                                            key={head}
                                            align={head==="Coin"?"":"right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                    {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow
                                                onClick={()=>navigate(`/coins/${row.id}`)}
                                                className="row"
                                                key={row.name}
                                            >
                                                <TableCell 
                                                component={"th"}
                                                scope="row"
                                                style={{
                                                    display:"flex",
                                                    gap: 15,
                                                }}>
                                                    <img
                                                        src={row.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{marginBottom:10}}
                                                    />
                                                    <div style={{display:"flex", flexDirection:"column"}}>
                                                        <span style={{
                                                            textTransform:"uppercase",
                                                            fontSize:20,
                                                        }}>
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{color:"darkgray"}}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell align='right'>
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>

                                                <TableCell align='right'
                                                style={{
                                                    color: profit>0?"rgb(14,203,129)":"red",
                                                    fontWeight:500,
                                                }}>
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>

                                                <TableCell align='right'>
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                                    
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>

            <Pagination
                className="pagination"
                count={(handleSearch()?.length/10).toFixed(0)}
                onChange={(_,value)=>{
                    setPage(value);
                    window.scroll(0,450);
                }}
            />
         </Container>
    </ThemeProvider>
  )
}

export default CoinTable;
