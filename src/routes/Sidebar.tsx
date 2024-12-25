import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Home,
  Person,
  Work,
  Reorder,
  SettingsSuggest,
  Menu,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <Drawer
      variant="persistent"
      open={true}
      sx={{
        width: isOpen ? drawerWidth : 56,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? drawerWidth : 56,
          boxSizing: "border-box",
          transition: "width 0.3s",
        },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap>
          Trading Craft
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          { text: "Deshboard", icon: <Home />, path: "/" },
          { text: "WatchList", icon: <Reorder />, path: "/watchlist" },

          { text: "Position", icon: <Work />, path: "/position" },
          {
            text: "Order Setting",
            icon: <SettingsSuggest />,
            path: "/order-setting",
          },
          { text: "Profile", icon: <Person />, path: "/profile" },
        ].map((item, index) => (
          <ListItem component={Link} to={item.path} key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
