import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function MenuPage() {
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
         <Typography>Menu section</Typography>
       </Box>
     );
}

export default MenuPage;