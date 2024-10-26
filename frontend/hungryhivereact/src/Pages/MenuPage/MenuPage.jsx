import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import axios from 'axios'; 
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';

// Fetch food image from external API
const fetchFoodImage = async (foodType) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodType}`);
    const data = await response.json();
    if (data.meals && data.meals.length > 0) {
      return data.meals[0].strMealThumb;
    }
    return 'https://via.placeholder.com/150';
  } catch (error) {
    console.error('Error fetching food image:', error);
    return 'https://via.placeholder.com/150';
  }
};

const MenuPage = () => {

  const user = useSelector((state) => state.user.user); // Access logged-in user info
  const isloggedin = useSelector((state) => state.user.isLoggedin);

  const [foodData, setFoodData] = useState([
    { type: 'Pizza', imageUrl: '' },
    { type: 'Burger', imageUrl: '' },
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
    { type: 'Lasagna', imageUrl: '' },
  ]);

  const [startIndex, setStartIndex] = useState(0);
  const [selectedFood, setSelectedFood] = useState('');
  const [storeData, setStoreData] = useState([]); // Stores fetched from the backend
  const [storeQuantities, setStoreQuantities] = useState({}); // To track quantities of items in the cart
  const visibleItems = 9;

  useEffect(() => {
    const fetchImages = async () => {
      const updatedFoodData = await Promise.all(
        foodData.map(async (food) => {
          const imageUrl = await fetchFoodImage(food.type);
          return { ...food, imageUrl };
        })
      );
      setFoodData(updatedFoodData);
    };
    fetchImages();
  }, []);

  // Left carousel navigation
  const handleLeftClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  // Right carousel navigation
  const handleRightClick = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 3, foodData.length - visibleItems));
  };

  // Fetch stores that sell the selected food type
  const handleFoodClick = async (foodType) => {
    setSelectedFood(foodType);
    try {
      const response = await axios.get(`http://localhost:5000/api/store/getStore/${foodType}`); 
      setStoreData(response.data.stores); 
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  // Increment item quantity in the cart
  const handleIncrement = async (store, item) => {
    if(!isloggedin){
      alert('You have to sign in first !!');
      return;
    }
    const newQuantity = (storeQuantities[store.store_name]?.[item.item_name] || 0) + 1;
  
    try {
      let cartResponse = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
      let cart = cartResponse.data.carts[0];
  
      // Check if there is an existing cart and if it has items from a different store
      if (cart && cart.items.length > 0) {
        const existingStoreId = cart.items[0].store.toString();
        if (existingStoreId !== store._id.toString()) {
          alert('You can only order from one store at a time.');
          return;
        }
      }
  
      setStoreQuantities((prevQuantities) => ({
        ...prevQuantities,
        [store.store_name]: {
          ...prevQuantities[store.store_name],
          [item.item_name]: newQuantity, // Update the quantity for the specific item
        },
      }));
  
      if (!cart) {
        const newCart = {
          userid: user._id,
          items: [{
            store: store._id,
            item_name: item.item_name,
            item_quantity: newQuantity,
            item_price: item.item_price,
            item_category: selectedFood,
          }],
          total_amount: item.item_price * newQuantity,
        };
  
        await axios.post('http://localhost:5000/api/cart/add', newCart);
      } else {
        let itemExists = false;
  
        const updatedItems = cart.items.map((cartItem) => {
          if (cartItem.item_name === item.item_name) {
            itemExists = true;
            return {
              ...cartItem,
              item_quantity: newQuantity, // Update quantity for the specific item
            };
          }
          return cartItem;
        });
  
        if (!itemExists) {
          updatedItems.push({
            store: store._id,
            item_name: item.item_name,
            item_quantity: newQuantity,
            item_price: item.item_price,
            item_category: selectedFood,
          });
        }
  
        const updatedTotalAmount = updatedItems.reduce(
          (total, cartItem) => total + cartItem.item_quantity * cartItem.item_price,
          0
        );
  
        await axios.put(`http://localhost:5000/api/cart/update/${cart._id}`, {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };


  // Decrement item quantity in the cart
  const handleDecrement = async (store, item) => {
    if(!isloggedin){
      alert('You have to sign in first !!');
      return;
    }
    const currentQuantity = storeQuantities[store.store_name]?.[item.item_name] || 0;
  
    // If the current quantity is 0, do nothing
    if (currentQuantity <= 0) {
      return;
    }
  
    const newQuantity = currentQuantity - 1; // Decrease the quantity by 1
  
    try {
      let cartResponse = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
      let cart = cartResponse.data.carts[0];
  
      // If no cart exists, do nothing
      if (!cart) {
        return;
      }
  
      // Check if the item exists in the cart
      const itemIndex = cart.items.findIndex(cartItem => cartItem.item_name === item.item_name);
  
      if (itemIndex !== -1) {
        if (newQuantity > 0) {
          // Update the item's quantity if greater than 0
          cart.items[itemIndex].item_quantity = newQuantity;
  
          const updatedTotalAmount = cart.items.reduce(
            (total, cartItem) => total + cartItem.item_quantity * cartItem.item_price,
            0
          );
  
          await axios.put(`http://localhost:5000/api/cart/update/${cart._id}`, {
            items: cart.items,
            totalAmount: updatedTotalAmount,
          });
        } else {
          // Remove the item if the quantity is 0
          const updatedItems = cart.items.filter((_, index) => index !== itemIndex);
  
          if (updatedItems.length === 0) {
            // If no items left, delete the entire cart
            await axios.delete(`http://localhost:5000/api/cart/delete/${cart._id}`);
          } else {
            // Update the cart with remaining items
            const updatedTotalAmount = updatedItems.reduce(
              (total, cartItem) => total + cartItem.item_quantity * cartItem.item_price,
              0
            );
  
            await axios.put(`http://localhost:5000/api/cart/update/${cart._id}`, {
              items: updatedItems,
              totalAmount: updatedTotalAmount,
            });
          }
        }
  
        // Update the local storeQuantities state
        setStoreQuantities((prevQuantities) => ({
          ...prevQuantities,
          [store.store_name]: {
            ...prevQuantities[store.store_name],
            [item.item_name]: newQuantity,
          },
        }));
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };
  
  

  return (
    <Box
      sx={{
        py: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
        <IconButton 
          onClick={handleLeftClick}
          disabled={startIndex === 0}
          sx={{ml: 'auto' }}
        >
          <NavigateBeforeOutlinedIcon sx={{ fontSize: '2rem' }}/>
        </IconButton>
        <IconButton 
          onClick={handleRightClick}
          disabled={startIndex >= foodData.length - visibleItems}
          sx={{mr: '2.5rem' }}
        >
          <NavigateNextOutlinedIcon sx={{ fontSize: '2rem' }}/>
        </IconButton>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gap: 0,
          width: '100%',
          justifyContent: 'center',
          transition: 'transform 2s ease-in-out',
        }}
      >
        {foodData.slice(startIndex, startIndex + visibleItems).map((food) => (
          <Box
            key={food.type}
            onClick={() => handleFoodClick(food.type)}
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              flex: '1 0 9%',
              transition: 'transform 2s ease-in-out',
            }}
          >
            <Avatar
              src={food.imageUrl}
              alt={food.type}
              sx={{ width: 110, height: 110, mb: 1, mx: 'auto' }}
            />
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {food.type}
            </Typography>
          </Box>
        ))}
      </Box>

      {selectedFood && storeData.length > 0 && (
        <Box sx={{ mt: 4, textAlign: 'center', width: '80%' }}>
          <Typography variant="h5" mb={2}>
            Stores selling {selectedFood}
          </Typography>

          <Grid container spacing={3}>
            {storeData.map((store, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={store.store_image || 'https://via.placeholder.com/300'} 
                    alt={store.store_name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {store.store_name}
                    </Typography>
                    {store.menu && store.menu.filter(item => item.item_category === selectedFood).map(item => (
                      <Box key={item.item_name} sx={{ mt: 1 }}>
                        <Typography variant="body2">{item.item_name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 , mt:1}}>
                        ₹ {item.item_price}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 , mb:0.5}}>
                          <Button
                            variant="outlined"
                            onClick={() => handleDecrement(store, item)}
                            disabled={storeQuantities[store.store_name] === 0}
                          >
                            -
                          </Button>
                          <Typography sx={{ mx: 2 }}>
                            {/* {storeQuantities[store.store_name] || 0} */}
                            {storeQuantities[store.store_name]?.[item.item_name] || 0}
                          </Typography>
                          <Button
                            variant="outlined"
                            onClick={() => handleIncrement(store, item)}
                          >
                            +
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default MenuPage;