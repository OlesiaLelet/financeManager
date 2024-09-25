import React from "react";
import {
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useAppSelector } from "../redux/store";

export default function Navbar({children}: any) {
  const location = useLocation();

  const links = [
    {
      text: "Profile",
      path: "/register",
      icon: <AccountCircleIcon color="primary" />,
    },
    {
      text: "Analytics",
      path: "/",
      icon: <AnalyticsIcon color="primary" />,
    },
    {
      text: "Transactions",
      path: "/transactions",
      icon: <ViewListIcon color="primary" />,
    },
    {
      text: "Add transactions",
      path: "/createIncome",
      icon: <AddIcon color="primary" />,
    },
  ];

  const isLog = useAppSelector((state) => state.authorization.isRegister);
  return (
    <Box sx={{ backgroundColor: "#f4f4f4" , display: "flex"}}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          boxSizing: "border-box",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
      >
        <Box sx={{ alignSelf: "center" }}>
          <Typography>Sidebar </Typography>
        </Box>
        <List>
          {links.map((item) => (
            <ListItem
              key={item.text}
              className={location.pathname === item.path ? "active" : ""}
            >
              <ListItemAvatar color="primary">{item.icon}</ListItemAvatar>
              <Link
                to={isLog && item.path === "/register" ? "/profile" : item.path}
              >
                {item.text}
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {children}
    </Box>
  );
}
