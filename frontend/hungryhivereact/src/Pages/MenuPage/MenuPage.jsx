import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

// Example store data based on food type
const storeData = {
  Pizza: ['Store 1', 'Store 2', 'Store 3'],
  Burger: ['Store 4', 'Store 5'],
  Thali: ['Store 6', 'Store 7', 'Store 8'],
  Pasta: ['Store 9'],
  Salad: ['Store 10', 'Store 11'],
};

// Function to fetch image URL based on food type using TheMealDB API
const fetchFoodImage = async (foodType) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodType}`);
    const data = await response.json();
    if (data.meals && data.meals.length > 0) {
      return data.meals[0].strMealThumb;  // Return the thumbnail image of the first meal found
    }
    return 'https://via.placeholder.com/150'; // Placeholder image if no food found
  } catch (error) {
    console.error('Error fetching food image:', error);
    return 'https://via.placeholder.com/150'; // Placeholder image on error
  }
};

// Function to fetch store image (replace with actual API if available)
const fetchStoreImage = async (storeName) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${storeName}`);
    const data = await response.json();
    if (data.meals && data.meals.length > 0) {
      return data.meals[0].strMealThumb;  // Return the thumbnail image of the store (using same API for demo)
    }
    return 'https://via.placeholder.com/300'; // Placeholder image if no store found
  } catch (error) {
    console.error('Error fetching store image:', error);
    return 'https://via.placeholder.com/300'; // Placeholder image on error
  }
};

function MenuPage() {
  const [foodData, setFoodData] = useState([
    { type: 'Pizza', imageUrl: '' },
    { type: 'Burger', imageUrl: '' },
    { type: 'Thali', imageUrl: '' },
    { type: 'Pasta', imageUrl: '' },
    { type: 'Salad', imageUrl: '' },
    { type: 'Sushi', imageUrl: '' },
    { type: 'Noodles', imageUrl: '' },
    { type: 'Soup', imageUrl: '' },
    { type: 'Steak', imageUrl: '' },
    { type: 'Sandwich', imageUrl: '' },
    { type: 'Tacos', imageUrl: '' },
    { type: 'Curry', imageUrl: '' },
    { type: 'Biryani', imageUrl: '' },
    { type: 'Fried Rice', imageUrl: '' },
    { type: 'Dosa', imageUrl: '' },
    { type: 'Dim Sum', imageUrl: '' },
    { type: 'Ramen', imageUrl: '' },
    { type: 'Lasagna', imageUrl: '' },
    { type: 'Burrito', imageUrl: '' },
    { type: 'Falafel', imageUrl: '' }
  ]);

  const [startIndex, setStartIndex] = useState(0); // Track visible items index
  const [selectedFood, setSelectedFood] = useState(''); // State to track selected food item
  const [storeImages, setStoreImages] = useState({}); // Store images based on store name
  const [storeQuantities, setStoreQuantities] = useState({}); // Store quantity ordered for each store
  const visibleItems = 9; // Number of items visible at a time

  useEffect(() => {
    const fetchImages = async () => {
      const updatedFoodData = await Promise.all(
        foodData.map(async (food) => {
          const imageUrl = await fetchFoodImage(food.type);
          return { ...food, imageUrl }; // Update food item with the fetched image
        })
      );
      setFoodData(updatedFoodData);
    };
    fetchImages();
  }, []);

  const handleLeftClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 3, 0)); // Go back 3 items
  };

  const handleRightClick = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 3, foodData.length - visibleItems)); // Move forward 3 items
  };

  const handleFoodClick = async (foodType) => {
    setSelectedFood(foodType);

    // Fetch images for each store of the selected food
    const updatedStoreImages = {};
    await Promise.all(
      storeData[foodType].map(async (store) => {
        const storeImage = await fetchStoreImage(store);
        updatedStoreImages[store] = storeImage;
      })
    );
    setStoreImages(updatedStoreImages);
  };

  // Handle quantity increment
  const handleIncrement = (store) => {
    setStoreQuantities((prevQuantities) => ({
      ...prevQuantities,
      [store]: (prevQuantities[store] || 0) + 1,
    }));
  };

  // Handle quantity decrement
  const handleDecrement = (store) => {
    setStoreQuantities((prevQuantities) => ({
      ...prevQuantities,
      [store]: Math.max((prevQuantities[store] || 0) - 1, 0),
    }));
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <Typography variant="h4" mb={2}>
        Menu Section
      </Typography>

      {/* Left and Right Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleLeftClick}
          disabled={startIndex === 0}
          sx={{ ml: 'auto', mr: 2 }}
        >
          Left
        </Button>
        <Button
          variant="contained"
          onClick={handleRightClick}
          disabled={startIndex >= foodData.length - visibleItems}
          sx={{ ml: 2 }}
        >
          Right
        </Button>
      </Box>

      {/* Food Item Thumbnails in fixed grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)', // 9 fixed items per row
          gap: 0, // Reduce the space between items
          width: '100%',
          justifyContent: 'center',
          transition: 'transform 2s ease-in-out', // Smooth transition
        }}
      >
        {foodData.slice(startIndex, startIndex + visibleItems).map((food) => (
          <Box
            key={food.type}
            onClick={() => handleFoodClick(food.type)} // On click, show stores
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              flex: '1 0 9%',
              transition: 'transform 2s ease-in-out', // Smooth transition
            }}
          >
            {/* Circular Image */}
            <Avatar
              src={food.imageUrl}
              alt={food.type}
              sx={{ width: 90, height: 90, mb: 1, mx: 'auto' }} // Center-align the avatar
            />
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {food.type}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Display Stores for the selected food */}
      {selectedFood && storeData[selectedFood] && (
        <Box sx={{ mt: 4, textAlign: 'center', width: '80%' }}>
          <Typography variant="h5" mb={2}>
            Stores selling {selectedFood}:
          </Typography>

          <Grid container spacing={3}>
            {storeData[selectedFood].map((store, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={storeImages[store] || 'https://via.placeholder.com/300'}
                    alt={store}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {store}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Address: Example address for {store}
                    </Typography>

                    {/* Quantity control */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => handleDecrement(store)}
                        disabled={storeQuantities[store] === 0}
                        sx={{ mr: 2 }}
                      >
                        -
                      </Button>
                      <Typography variant="body1" sx={{ mx: 2 }}>
                        {storeQuantities[store] || 0}
                      </Typography>
                      <Button variant="contained" onClick={() => handleIncrement(store)}>
                        +
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default MenuPage;

