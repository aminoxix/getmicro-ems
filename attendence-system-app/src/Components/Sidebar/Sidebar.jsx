import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";


export const Sidebar = (
  <React.Fragment>
    <Link to="/">
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="adduser">
      <ListItemButton>
      <ListItemIcon>
        <GroupAddIcon />
      </ListItemIcon>
      <ListItemText primary="Add User" />
    </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Update User" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <GroupRemoveIcon />
      </ListItemIcon>
      <ListItemText primary="Delete User" />
    </ListItemButton>
    <ListItemButton
      onClick={async () => {
        await getAuth().signOut();
      }}
    >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);
