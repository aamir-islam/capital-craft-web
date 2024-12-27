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
  Logout,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const drawerWidth = 240;

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface LogoutResponse {
  status: string;
  data: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const accessToken = useSelector(
    (state: RootState) => state.access_token.token
  );
  const navigateTo = useNavigate();

  const handleLogout = async (): Promise<void> => {
    const config = {
      method: "delete" as const,
      url: "https://api.upstox.com/v2/logout",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        Accept: "application/json", // Expect JSON response
      },
    };
    try {
      // Make the API call
      const response: AxiosResponse<LogoutResponse> = await axios(config);

      // Handle the response
      if (response.data.status === "success" && response.data.data === true) {
        console.log("Logout successful");
        localStorage.removeItem("token");
        navigateTo("/");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        console.error(
          "Axios error during logout:",
          error.response?.data || error.message
        );
      } else {
        // Handle non-Axios error
        console.error("Error during logout:", error);
      }
    }
  };

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
        <ListItem component={Link} to={"/"} onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
