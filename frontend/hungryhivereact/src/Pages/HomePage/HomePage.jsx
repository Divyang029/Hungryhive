// import React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import FoodCard from '../../components/FoodCard';
// import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
// import { useSelector,useDispatch } from 'react-redux';


// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';

// function HomePage() {
//   const user = useSelector((state) => state.user.user);

//   return (
//     <>
//       <h2 style={{marginLeft:'2rem', fontWeight: 700}}>Top restaurants Food {user.address?.city ? "in " + user.address.city : ""}</h2>
//       {/* <StyledEngineProvider injectFirst>
//         <CssVarsProvider> */}
//           <Box
//             sx={{
//               display: 'flex',
//               flexWrap: 'wrap',
//               gap: 2.5, // Adjust the gap between cards
//               marginLeft: 3,
//               marginTop: 3,
//               justifyContent: 'flex-start', // Align cards to the start
//               width: '100%',
//             }}
//           >

// <Card sx={{ maxWidth: 345 }}>
//   <CardMedia
//     component="img"
//     height="180"
//     image={'https://via.placeholder.com/300'} 
//     alt="Dummy Store"
//   />
//   <CardContent>
//     <Typography gutterBottom variant="h6" component="div">
//       Dummy Store
//     </Typography>
//     <Typography variant="body2" color="text.secondary">
//       Address: Dummy City, Dummy State
//     </Typography>

//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
//       <Button
//         variant="outlined"
//         onClick={() => console.log("Decrement clicked")}
//         disabled={false}
//       >
//         -
//       </Button>
//       <Typography variant="body1" sx={{ mx: 2 }}>
//         0
//       </Typography>
//       <Button variant="outlined" onClick={() => console.log("Increment clicked")}>
//         +
//       </Button>
//     </Box>
//   </CardContent>
// </Card>


//           </Box>
//         {/* </CssVarsProvider>
//       </StyledEngineProvider> */}
//     </>
//     // <div>Home page</div>
//   );
// }

// export default HomePage;


import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import axios from 'axios';

function HomePage() {
  const user = useSelector((state) => state.user.user);
  const [items, setItems] = useState([]); // State to store fetched items
  const [storeQuantities, setStoreQuantities] = useState({}); // To track quantities of items in the cart
  const isloggedin = useSelector((state) => state.user.isLoggedin);

  // Increment item quantity in the cart
  const handleIncrement = async (item) => {
    if(!isloggedin){
      alert('You have to sign in first !!');
      return;
    }

    const newQuantity = (storeQuantities[item.store_name]?.[item.item_name] || 0) + 1;
    
    try {
      let cartResponse = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
      let cart = cartResponse.data.carts[0];
  
      // Check if there is an existing cart and if it has items from a different store
      if (cart && cart.items.length > 0) {
        const existingStoreId = cart.items[0].store.toString();
        if (existingStoreId !== item.store_id.toString()) {
          alert('You can only order from one store at a time.');
          return;
        }
      }
  
      setStoreQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item.store_name]: {
          ...prevQuantities[item.store_name],
          [item.item_name]: newQuantity, // Update the quantity for the specific item
        },
      }));
  
      if (!cart) {
        const newCart = {
          userid: user._id,
          items: [{
            store: item.store_id,
            item_name: item.item_name,
            item_quantity: newQuantity,
            item_price: item.item_price,
            item_category: item.item_category,
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
            store:  item.store_id,
            item_name: item.item_name,
            item_quantity: newQuantity,
            item_price: item.item_price,
            item_category: item.item_category,
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
  const handleDecrement = async (item) => {
    if(!isloggedin){
      alert('You have to sign in first !!');
      return;
    }

    const currentQuantity = storeQuantities[item.store_name]?.[item.item_name] || 0;
    
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
          [item.store_name]: {
            ...prevQuantities[item.store_name],
            [item.item_name]: newQuantity,
          },
        }));
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const city = user?.address?.city ? `/${user.address.city}` : '';
        const response = await axios.get(`http://localhost:5000/api/store/getNearbyStore/city${city}`);
        // console.log(response.data);
        if(!response.data.message){
          setItems(response.data); // Store fetched items in state
        }else{
          setItems([]);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems(); // Fetch items when the component mounts or when user address changes
  }, [user?.address?.city]);

  return (
    <>
      <p style={{ textAlign:'center', fontWeight: 500, fontSize: '2rem'}}>
        Top restaurants Food {user?.address?.city ? 'in ' + user.address.city : ''}
      </p>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          marginLeft: 3,
          marginTop: 3,
          justifyContent: 'start',
          width: '100%',
        }}
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <Card
              key={index}
              sx={{
                width: '30%',
                maxWidth: 300,
                flex: '1 1 calc(33.333% - 20px)',
                margin: '15px'
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.item_photo || 'https://via.placeholder.com/300'}
                alt={item.store_name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {item.item_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 30,
                    overflow: 'hidden',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                  onClick={() => console.log('Description clicked')} // Add click interaction
                >
                  {item.item_description}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                  ₹ {item.item_price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  overflow: 'hidden',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}>
                  {item.store_name} - {item.store_city}, {item.store_state} {/* Display city and state */}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => handleDecrement(item)}
                    disabled={storeQuantities[item.store_name] === 0}
                  >
                    -
                  </Button>
                  <Typography variant="body1" sx={{ mx: 2 }}>
                    {storeQuantities[item.store_name]?.[item.item_name] || 0}
                  </Typography>
                  <Button 
                    variant="outlined"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" sx={{ ml: 3 }}>
            No items available.
          </Typography>
        )}
      </Box>
    </>
  );
}

export default HomePage;

