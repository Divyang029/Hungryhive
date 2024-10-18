// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Collapse from '@mui/material/Collapse';
// import { Stepper, Step, StepLabel } from '@mui/material';
// import PhoneIcon from '@mui/icons-material/Phone';
// import MapIcon from '@mui/icons-material/Map';

// function OrdersPage() {
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   // Sample orders data
//   const orders = [
//     {
//       id: 1,
//       store: 'Hungry Hive Pizza',
//       orderedAt: '1:30 PM, Oct 14, 2024',
//       items: [
//         { name: 'Pizza Margherita', quantity: 2, price: 500 },
//         { name: 'Garlic Bread', quantity: 1, price: 150 },
//       ],
//       total: 750,
//       deliveryPerson: {
//         name: 'Rahul Sharma',
//         phone: '+91 9876543210',
//       },
//       progress: ['Order Confirmed', 'Baking', 'Out for Delivery', 'Delivered'],
//       currentStep: 2, // "Out for Delivery"
//     },
//     {
//       id: 2,
//       store: 'BBQ Express',
//       orderedAt: '12:15 PM, Oct 14, 2024',
//       items: [
//         { name: 'BBQ Chicken', quantity: 3, price: 900 },
//         { name: 'French Fries', quantity: 2, price: 300 },
//       ],
//       total: 1200,
//       deliveryPerson: {
//         name: 'Ankit Verma',
//         phone: '+91 9999988888',
//       },
//       progress: ['Order Confirmed', 'Grilling', 'Out for Delivery', 'Delivered'],
//       currentStep: 1, // "Grilling"
//     },
//   ];

//   // Toggle order details view
//   const handleToggleDetails = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Your Current Orders
//       </Typography>

//       {/* Order List */}
//       {orders.map((order) => (
//         <Card
//           key={order.id}
//           sx={{ width: '90%', maxWidth: 800, borderRadius: 4, boxShadow: 3, mb: 3 }}
//         >
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               {order.store}
//             </Typography>
//             <Typography variant="subtitle2" color="text.secondary">
//               Ordered at: {order.orderedAt}
//             </Typography>

//             {/* Order Item List */}
//             <List>
//               {order.items.map((item, index) => (
//                 <ListItem key={index}>
//                   <ListItemText
//                     primary={`${item.name} (x${item.quantity})`}
//                     secondary={`₹${item.price}`}
//                   />
//                 </ListItem>
//               ))}
//               <ListItem>
//                 <ListItemText primary="Total" secondary={`₹${order.total}`} />
//               </ListItem>
//             </List>

//             {/* View Details / Close Details Button */}
//             <Button
//               variant="outlined"
//               onClick={() => handleToggleDetails(order.id)}
//               sx={{ mt: 2 }}
//             >
//               {expandedOrder === order.id ? 'Close Details' : 'View Details'}
//             </Button>

//             {/* Collapsible Order Details */}
//             <Collapse in={expandedOrder === order.id} timeout="auto" unmountOnExit>
//               {/* Progress Bar */}
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                 <Card sx={{ flex: 1, borderRadius: 4, boxShadow: 3, mr: 2 }}>
//                   <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                       Order Progress
//                     </Typography>
//                     {/* Vertical Stepper Progress Bar */}
//                     <Box sx={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                       <Stepper orientation="vertical" activeStep={order.currentStep}>
//                         {order.progress.map((label, index) => (
//                           <Step key={label}>
//                             <StepLabel>{label}</StepLabel>
//                           </Step>
//                         ))}
//                       </Stepper>
//                     </Box>
//                   </CardContent>
//                 </Card>

//                 {/* Delivery Man Info */}
//                 <Card sx={{ flex: 1, borderRadius: 4, boxShadow: 3 }}>
//                   <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                       Delivery Person Info
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                       <Avatar
//                         alt={order.deliveryPerson.name}
//                         src="https://via.placeholder.com/100"
//                         sx={{ width: 80, height: 80, mr: 2 }}
//                       />
//                       <Box>
//                         <Typography variant="subtitle1">{order.deliveryPerson.name}</Typography>
//                         <Typography variant="subtitle2" color="text.secondary">
//                           {order.deliveryPerson.phone}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       Estimated delivery time: 15-20 minutes
//                     </Typography>

//                     {/* Call and View in Map Buttons */}
//                     <Button
//                         variant="outlined"
//                         startIcon={<PhoneIcon />}
//                         sx={{ width: '80%', mb: 1, fontSize: '0.8rem', padding: '6px 12px' }}  // Adjusting font size and padding
//                         onClick={() => alert('Calling the delivery person...')}
//                         >
//                         Call Delivery Person
//                         </Button>
//                         <Button
//                         variant="outlined"
//                         startIcon={<MapIcon />}
//                         sx={{ width: '80%', fontSize: '0.8rem', padding: '6px 12px' }}  // Adjusting font size and padding
//                         onClick={() => alert('Opening location in map...')}
//                         >
//                         View in Map
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Box>
//             </Collapse>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// }

// export default OrdersPage;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { Stepper, Step, StepLabel, Dialog, DialogContent, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LiveOrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);

  // Sample orders data
  const orders = [
    {
      id: 1,
      store: 'Hungry Hive Pizza',
      orderedAt: '1:30 PM, Oct 14, 2024',
      items: [
        { name: 'Pizza Margherita', quantity: 2, price: 500 },
        { name: 'Garlic Bread', quantity: 1, price: 150 },
      ],
      total: 750,
      deliveryPerson: {
        name: 'Rahul Sharma',
        phone: '+91 9876543210',
      },
      progress: ['Order Confirmed', 'Baking', 'Out for Delivery', 'Delivered'],
      currentStep: 2, // "Out for Delivery"
      storeLocation: { lat: 51.505, lng: -0.09 }, // Sample coordinates
      deliveryLocation: { lat: 51.515, lng: -0.1 },
    },
    {
      id: 2,
      store: 'BBQ Express',
      orderedAt: '12:15 PM, Oct 14, 2024',
      items: [
        { name: 'BBQ Chicken', quantity: 3, price: 900 },
        { name: 'French Fries', quantity: 2, price: 300 },
      ],
      total: 1200,
      deliveryPerson: {
        name: 'Ankit Verma',
        phone: '+91 9999988888',
      },
      progress: ['Order Confirmed', 'Grilling', 'Out for Delivery', 'Delivered'],
      currentStep: 1, // "Grilling"
      storeLocation: { lat: 51.51, lng: -0.08 }, // Sample coordinates
      deliveryLocation: { lat: 51.525, lng: -0.12 },
    },
  ];

  // Toggle order details view
  const handleToggleDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Open and close the map modal
  const handleMapOpen = () => {
    setMapOpen(true);
  };

  const handleMapClose = () => {
    setMapOpen(false);
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
        Your Current Orders
      </Typography>

      {/* Order List */}
      {orders.map((order) => (
        <Card
          key={order.id}
          sx={{ width: '90%', maxWidth: 800, borderRadius: 4, boxShadow: 3, mb: 3 }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {order.store}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Ordered at: {order.orderedAt}
            </Typography>

            {/* Order Item List */}
            <List>
              {order.items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${item.name} (x${item.quantity})`}
                    secondary={`₹${item.price}`}
                  />
                </ListItem>
              ))}
              <ListItem>
                <ListItemText primary="Total" secondary={`₹${order.total}`} />
              </ListItem>
            </List>

            {/* View Details / Close Details Button */}
            <Button
              variant="outlined"
              onClick={() => handleToggleDetails(order.id)}
              sx={{ mt: 2 }}
            >
              {expandedOrder === order.id ? 'Close Details' : 'View Details'}
            </Button>

            {/* Collapsible Order Details */}
            <Collapse in={expandedOrder === order.id} timeout="auto" unmountOnExit>
              {/* Progress Bar */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Card sx={{ flex: 1, borderRadius: 4, boxShadow: 3, mr: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Order Progress
                    </Typography>
                    {/* Vertical Stepper Progress Bar */}
                    <Box sx={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Stepper orientation="vertical" activeStep={order.currentStep}>
                        {order.progress.map((label, index) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </CardContent>
                </Card>

                {/* Delivery Man Info */}
                <Card sx={{ flex: 1, borderRadius: 4, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Delivery Person Info
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        alt={order.deliveryPerson.name}
                        src="https://via.placeholder.com/100"
                        sx={{ width: 80, height: 80, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1">{order.deliveryPerson.name}</Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {order.deliveryPerson.phone}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Estimated delivery time: 15-20 minutes
                    </Typography>

                    {/* Call and View in Map Buttons */}
                    <Button
                      variant="outlined"
                      startIcon={<PhoneIcon />}
                      sx={{ width: '80%', mb: 1, fontSize: '0.8rem', padding: '6px 12px' }}
                      onClick={() => alert('Calling the delivery person...')}
                    >
                      Call Delivery Person
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<MapIcon />}
                      sx={{ width: '80%', fontSize: '0.8rem', padding: '6px 12px' }}
                      onClick={handleMapOpen}
                    >
                      View in Map
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      ))}

      {/* Map Dialog */}
      {/* <Dialog open={mapOpen} onClose={handleMapClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMapClose}
            aria-label="close"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>Store Location</Popup>
            </Marker>
            <Marker position={[51.515, -0.1]}>
              <Popup>Delivery Location</Popup>
            </Marker>
          </MapContainer>
        </DialogContent>
      </Dialog> */}
      <Dialog 
  open={mapOpen} 
  onClose={handleMapClose} 
  maxWidth="xs" // Changed size to extra small
  fullWidth={false} // Disabled full width
  PaperProps={{
    style: {
      width: '500px', // Set specific width for the dialog
      height: '500px' // Set specific height for the dialog
    },
  }}
>
  <DialogContent>
    <IconButton
      edge="end"
      color="inherit"
      onClick={handleMapClose}
      aria-label="close"
      sx={{ position: 'absolute', top: 8, right: 8 }}
    >
      <CloseIcon />
    </IconButton>

    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }} // Reduced the height of the map
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>Store Location</Popup>
      </Marker>
      <Marker position={[51.515, -0.1]}>
        <Popup>Delivery Location</Popup>
      </Marker>
    </MapContainer>
  </DialogContent>
</Dialog>

    </Box>
  );
}

export default LiveOrdersPage;
