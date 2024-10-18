import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

function ReorderPage() {
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Sample past orders data
  const pastOrders = [
    {
      id: 1,
      store: 'Hungry Hive Pizza',
      orderedAt: 'Sep 30, 2024',
      items: [
        { name: 'Pizza Margherita', quantity: 2, price: 500 },
        { name: 'Garlic Bread', quantity: 1, price: 150 },
      ],
      total: 750,
      status: 'Completed',
      address: '123 Street, City Center',
      deliveryTime: '45 minutes',
      deliveryPerson: 'Rahul Sharma',
    },
    {
      id: 2,
      store: 'BBQ Express',
      orderedAt: 'Sep 25, 2024',
      items: [
        { name: 'BBQ Chicken', quantity: 3, price: 900 },
        { name: 'French Fries', quantity: 2, price: 300 },
      ],
      total: 1200,
      status: 'Completed',
      address: '456 Avenue, West End',
      deliveryTime: '30 minutes',
      deliveryPerson: 'Ankit Verma',
    },
    {
        id: 3,
        store: 'Sushi World',
        orderedAt: 'Sep 20, 2024',
        items: [
          { name: 'California Roll', quantity: 5, price: 600 },
          { name: 'Miso Soup', quantity: 3, price: 200 },
        ],
        total: 800,
        status: 'Completed',
        address: '789 Boulevard, Downtown',
        deliveryTime: '35 minutes',
        deliveryPerson: 'Mina Tanaka',
      },
      {
        id: 4,
        store: 'Burger Shack',
        orderedAt: 'Sep 15, 2024',
        items: [
          { name: 'Cheeseburger', quantity: 2, price: 400 },
          { name: 'Onion Rings', quantity: 1, price: 100 },
        ],
        total: 500,
        status: 'Completed',
        address: '101 Park Lane, Uptown',
        deliveryTime: '25 minutes',
        deliveryPerson: 'John Doe',
      },
      {
        id: 5,
        store: 'Pasta Palace',
        orderedAt: 'Sep 10, 2024',
        items: [
          { name: 'Spaghetti Bolognese', quantity: 2, price: 700 },
          { name: 'Caesar Salad', quantity: 1, price: 250 },
        ],
        total: 950,
        status: 'Completed',
        address: '202 Avenue Road, Suburbia',
        deliveryTime: '40 minutes',
        deliveryPerson: 'Emily Johnson',
      },
      {
        id: 6,
        store: 'Deli Delight',
        orderedAt: 'Sep 05, 2024',
        items: [
          { name: 'Club Sandwich', quantity: 3, price: 600 },
          { name: 'Fruit Juice', quantity: 2, price: 200 },
        ],
        total: 800,
        status: 'Completed',
        address: '303 River Road, Riverside',
        deliveryTime: '20 minutes',
        deliveryPerson: 'Alice Smith',
      },
  ];

  const [orderitem, setorderitem] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/');
        setorderitem(response.data.orders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, []);

  useEffect(() => {
    console.log(orderitem); // Log fetched cart details for debugging
  }, [orderitem]);


  const handleToggleDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId); // Toggle between showing and hiding
  };

  const handleReorder = (order) => {
    alert(`Reordering items from ${order.store}`);
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Your Past Orders
      </Typography>

      {orderitem.map((order,index) => (
        <Card
          key={index}
          sx={{ width: '90%', maxWidth: 800, borderRadius: 4, boxShadow: 3, mb: 3 }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="h6">
                  Order #{index+1}: {order._id}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => handleToggleDetails(order._id)}
                  sx={{
                    textDecoration: 'none',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  {expandedOrder === order._id ? 'Hide Details' : 'Details'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleReorder(order)}
                  sx={{
                    textDecoration: 'none',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Reorder
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Collapse in={expandedOrder === order._id} timeout="auto" unmountOnExit>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                
                {/* Left Side: Order Items and Prices */}
                <Box sx={{ flex: 1, pr: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ordered on: {order.orderedAt}
                  </Typography>

                  <List>
                    {order.orders.map((item, index) => (
                      <ListItem key={index} sx={{ padding: '4px 8px' }}>
                        <ListItemText
                          primary={`${item.item_name} (x${item.item_quantity})`}
                          secondary={`₹500`}
                          primaryTypographyProps={{ fontSize: '0.9rem' }}
                          secondaryTypographyProps={{ fontSize: '0.8rem' }}
                        />
                      </ListItem>
                    ))}
                    <ListItem sx={{ padding: '4px 8px' }}>
                      <ListItemText
                        primary="Total"
                        secondary={order.total_amount}
                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                        secondaryTypographyProps={{ fontSize: '0.8rem' }}
                      />
                    </ListItem>
                  </List>
                </Box>

                {/* Right Side: Enhanced Delivery Details */}
                <Box sx={{ flex: 1, pl: 2, borderLeft: '1px solid #e0e0e0', padding: 2 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Delivery Information
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {order.address}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      Time taken: {order.deliveryTime}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      Delivery Person: {order.deliveryPerson}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ReorderPage;