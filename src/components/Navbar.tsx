import React from 'react'
import { Typography, Button, Box, Drawer, CssBaseline, List, ListItem, ListItemAvatar} from '@mui/material'
import { NavLink, useLocation, Link } from 'react-router-dom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewListIcon from '@mui/icons-material/ViewList';


export default function Navbar() {

  const location = useLocation();
  const clasess = {
    active: {
      background: '#f4f4f4'
    }
  }

  const links = [{
    text: "Profile",
    path: "/profile",
    icon: <AccountCircleIcon color='primary'/>
  
  }, {
    text: "Analytics",
    path: "/",
    icon: <AnalyticsIcon color='primary'/>,
}, {
  text: "Transations",
  path: "/transactions",
  icon: <ViewListIcon color='primary'/>
}, {
  text: "Add transactions",
  path: "/createTransaction",
  icon: <AddIcon color='primary'/>,
}, 
]
  return (
    <Box sx={{backgroundColor: "#f4f4f4"}}>
   
   
     <Drawer 
     variant='permanent' 
     sx={{ width: 240, boxSizing: "border-box",
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
      },
    }}
     anchor='left' 
     >
          <Box sx={{alignSelf: 'center'}}>
            <Typography>Sidebar </Typography>
          </Box>
          <List >
            {links.map((item)=> (
              <ListItem key={item.text} className={location.pathname===item.path? "active": "" }>
                <ListItemAvatar color='primary'>{item.icon}</ListItemAvatar>
                <Link  to={item.path}>{item.text}</Link>
              </ListItem>
            ))}
          </List>



    </Drawer> 
       
       
    </Box>
  )
}
