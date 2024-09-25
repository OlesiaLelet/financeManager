import React from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { setLogOut } from "../redux/AuthorizationSlice";
import { Box, Button, Typography } from "@mui/material";
import { initialState } from "../redux/AuthorizationSlice";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const userData = useAppSelector((state) => state.authorization);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlerClick = () => {
    const LoggedOut: initialState = {
      isRegister: false,
      name: "",
      email: "",
      password: "",
    };
    dispatch(setLogOut(LoggedOut));
    navigate("/register");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          padding: 5,
          backgroundColor: "#fafafa",
          borderRadius: 5,
          margin: "auto",
          width: 300,
        }}
      >
        <Typography variant="h3">Contacts</Typography>
        <Box sx={{}}>
          <Typography variant="body1">User name : {userData.name}</Typography>
          <Typography variant="body1">User email : {userData.email}</Typography>
        </Box>
        <Button variant="contained" onClick={handlerClick}>
          Log Out
        </Button>
      </Box>
    </>
  );
}
