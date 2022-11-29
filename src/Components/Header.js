import React from 'react';
import { AppBar, Container, createTheme, MenuItem, Select, StyledEngineProvider, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const Header = () => {
    
    let navigate = useNavigate();

    const {currency, setCurrency} = CryptoState();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
      });

    return (
        <ThemeProvider theme={darkTheme}>
            <StyledEngineProvider injectFirst>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography onClick = {()=>navigate("/")} variant="h6" className='title'>Crypto Buzz</Typography>
                        <Select 
                         
                            variant='outlined' 
                            style={{width:90,
                            height:40,
                            marginRight:15 }}
                            value={currency}
                            onChange={(e)=>setCurrency(e.target.value)}
                        >
                            <MenuItem value={"INR"}>INR</MenuItem>
                            <MenuItem value={"USD"}>USD</MenuItem>
                        </Select>
                    </Toolbar>          
                </Container>
            </AppBar>
        
        </StyledEngineProvider>   
        </ThemeProvider>
        
    )
}

export default Header;
