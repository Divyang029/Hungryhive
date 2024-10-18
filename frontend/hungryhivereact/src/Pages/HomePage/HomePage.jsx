import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FoodCard from '../../components/FoodCard';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';

function HomePage() {


  const foodItems = [
    { image: 'https://images.unsplash.com/photo-1603133872875-1b3e4253df8f?auto=format&fit=crop&w=318', title: 'Classic Pizza', address: 'Vaniyavad, Nadiad', price: '1,000' },
    { image: 'https://images.unsplash.com/photo-1604908393555-e93c446f030e?auto=format&fit=crop&w=318', title: 'Veg Burger', address: 'Main St, Nadiad', price: '150' },
    { image: 'https://images.unsplash.com/photo-1512058564366-c9dd7efb4f63?auto=format&fit=crop&w=318', title: 'Pasta Arrabiata', address: 'Crossroads Mall, Nadiad', price: '400' },
    { image: 'https://images.unsplash.com/photo-1606131737607-08fd128c1e34?auto=format&fit=crop&w=318', title: 'Masala Dosa', address: 'MG Road, Nadiad', price: '120' },
    { image: 'https://images.unsplash.com/photo-1594677135768-21960e7d7126?auto=format&fit=crop&w=318', title: 'Paneer Tikka', address: 'Food Plaza, Nadiad', price: '350' },
    { image: 'https://images.unsplash.com/photo-1516685018646-5497e6cd1ca9?auto=format&fit=crop&w=318', title: 'Chicken Biryani', address: 'Station Rd, Nadiad', price: '550' },
    { image: 'https://images.unsplash.com/photo-1592194996308-fdb6014d3b57?auto=format&fit=crop&w=318', title: 'French Fries', address: 'Food Court, Nadiad', price: '100' },
    { image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=318', title: 'Grilled Sandwich', address: 'Town Center, Nadiad', price: '180' },
    { image: 'https://images.unsplash.com/photo-1518684079-4bd4b3c9af7d?auto=format&fit=crop&w=318', title: 'Chocolate Cake', address: 'Dessert Corner, Nadiad', price: '250' },
    { image: 'https://images.unsplash.com/photo-1597162155686-d83988c8b8e2?auto=format&fit=crop&w=318', title: 'Fruit Salad', address: 'Health Hub, Nadiad', price: '200' },
];


  return (
    <>
      <h2 style={{marginLeft:'2rem', fontWeight: 700}}>Top restaurants Food in Nadiad</h2>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2.5, // Adjust the gap between cards
              marginLeft: 3,
              marginTop: 3,
              justifyContent: 'flex-start', // Align cards to the start
              width: '100%',
            }}
          >
            {/* {foodItems.map((food, index) => (
              <FoodCard
                key={index}
                image={food.image}
                title={food.title}
                address={food.address}
                price={food.price}
              />
            ))} */}
          <FoodCard/>
            <FoodCard/>

            <FoodCard/>


<FoodCard/>

<FoodCard/>

<FoodCard/>

<FoodCard/>

<FoodCard/>


<FoodCard/>

<FoodCard/>

<FoodCard/>


          </Box>
        </CssVarsProvider>
      </StyledEngineProvider>
    </>
    // <div>Home page</div>
  );
}

export default HomePage;