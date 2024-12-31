import React, { CSSProperties } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
}

interface menuItem {
  text: string;
  path: string;
  icon: React.ComponentType;
}

const baseLinkStyle: CSSProperties = {
  textDecoration: "none",
  color: "inherit",
  display: "block",
};

const activeLinkStyle: CSSProperties = {
  backgroundColor: "lightGray",
};

const SideBar = ({
  drawerWidth,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
}: SidebarProps) => {
  const MenuItems: menuItem[] = [
    { text: "Dashboard", path: "/", icon: DashboardIcon },
    { text: "Report", path: "/report", icon: QueryStatsIcon },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {/* 配列をマップ関数で展開 */}
        {MenuItems.map((menu, index) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            style={({ isActive }) => {
              // console.log("選択されたメニューは", menu.text, isActive);
              return {
                ...baseLinkStyle,
                ...(isActive ? activeLinkStyle : {}),
              };
            }}
          >
            <ListItem key={menu.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <menu.icon />
                </ListItemIcon>
                <ListItemText primary={menu.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );
  return (
    <>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* モバイル用 */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* PC用 */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
