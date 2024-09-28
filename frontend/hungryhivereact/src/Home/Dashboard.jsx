import React,{useState} from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Chip from '@mui/material/Chip';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import PageContent from '../Pages/PageContent';
import DashboardPage from '../Pages/DashboardPage';
import MenuPage from '../Pages/MenuPage';


const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Menu & Stores',
  },
  {
    segment: 'menus',
    title: 'Menu',
    icon: <RestaurantMenuOutlinedIcon />,
  },
  {
    segment: 'store',
    title: 'Store',
    icon: <StoreOutlinedIcon />,
  },
  {
    kind: 'divider',
  },

  {
    kind: 'header',
    title: 'Orders & Cart',
  },
  {
    segment: 'Orders',
    title: 'Orders',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'Live-Orders',
        title: 'Live-Orders',
        icon: <InventoryRoundedIcon />,
      },
      {
        segment: 'Re-order',
        title: 'Re-Order',
        icon: <HistoryRoundedIcon />,
      },
    ],
  },
  {
    segment: 'Cart',
    title: 'Cart',
    icon: <ShoppingCartIcon />,
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    kind: 'divider',
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});



function Home(props) {

  const [pathname, setPathname] = useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Component mapping
  const componentMapping = {
    '/dashboard': <DashboardPage />,
    '/menus': <MenuPage />,
    // '/store': <StorePage />,
    // '/Orders/Live-Orders': <LiveOrdersPage />,
    // '/Orders/Re-order': <ReOrderPage />,
    // Add more routes and components as needed
  };

  // Get the component to render based on pathname
  const CurrentPage = componentMapping[pathname] || <DashboardPage />; // Fallback to DashboardPage
  
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        title: 'HungryHive',
      }}
    >
      <DashboardLayout>
        {CurrentPage} 
      </DashboardLayout>
    </AppProvider>
  );
}


export default Home;