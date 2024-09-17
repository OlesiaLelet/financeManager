import React, { useState } from "react";
import {  Navigate } from "react-router-dom";
import { Drawer,  List, ListItem , } from "@mui/material";
import { Outlet , useNavigate, Link} from "react-router-dom";

export default function CreateTransaction() {
  const [clickIncome, setClick] = useState(false);
  

  return (
    <div
    style={{ display:"flex", alignItems: 'center', marginLeft: 192, flexDirection: 'column' }}>
    <List  sx={{display: 'flex', justifyContent: 'center'}}>
      <ListItem>
        <Link to='income' >Income</Link>
      </ListItem>
      <ListItem>
        <Link to='spendings' >Spendings</Link>
      </ListItem>

    </List>
    {/* {!clickIncome?
    <Navigate to='income'/>: <Navigate to='spendings'/>
} */}
    <Outlet />
    </div>
  );
}
