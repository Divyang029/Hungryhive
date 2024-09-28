import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FoodCard from './FoodCard';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';

function DashboardPage() {
  return (
    // <Box
    //   sx={{
    //     py: 4,
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     textAlign: 'center',
    //   }}
    // >
    <StyledEngineProvider injectFirst>
    <CssVarsProvider>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3, // Adjust the gap between cards
          marginLeft: 4,
          marginTop: 5,
          justifyContent: 'flex-start', // Align cards to the start
          width: '100%',
        }}
      >
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </Box>
    </CssVarsProvider>
  </StyledEngineProvider>
    // </Box>
    // <div>Home page</div>
  );
}

export default DashboardPage;