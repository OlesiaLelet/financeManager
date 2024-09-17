import React from "react";
import { SpendingsOrIncome } from "../redux/FinanceSlice";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Button,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { Navigate, useNavigate , useParams} from "react-router-dom";

import BackspaceIcon from '@mui/icons-material/Backspace';
import { deleteTransaction } from "../redux/FinanceSlice";



export default function Transactions() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const transactions = useAppSelector((state) => state.financeManager.transactions);

  const handlerDelete = (event:any, id:number) => {
    // const targetItem =  transactions.find((item) => item.id === id);
    // dispatch(deleteTransaction());
    if(event.target.closest(".deleteButto")) {
      dispatch(deleteTransaction(id));
    } else {
      navigate(`/edit/${id}`)
    }
  }
  



  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
      }}
    >
      {transactions?.map((item: SpendingsOrIncome) => (
        <Box sx={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: 5}} key={item.id}>
            <Typography variant="body1"  sx={{backgroundColor:"#eeeeee", borderTopLeftRadius: 5, borderTopRightRadius: 5, padding:1}}>
            {`${item.date?.toDate()?.getDate()} ${item.date?.toDate().toLocaleString("uk-UA", { month: "short" })}`}
            </Typography>
        
       
          
        <ListItem
          sx={{
            width: 480,
            cursor: "pointer",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            padding: 3
          }}
          onClick={ function wrapper (event) {
            handlerDelete(event, item.id)
          }
            }
        >
          
          <ListItemAvatar sx={{color: 'primary.main'}} color="primary">
            <item.iconOfCat />
          </ListItemAvatar>
          <Box >
            <Typography variant="h6"  >
              {item.notes ? item.notes : item.category}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography variant="body2" color="#757575">
                {item.category}
              </Typography>
              <Typography
                variant="body2"
                color="#757575"
                sx={{ paddingLeft: 1, paddingRight: 1 }}
              >
                |
              </Typography>
              <ListItemAvatar >
                <item.iconOfAcc />
              </ListItemAvatar>
            </Box>
          </Box>

          <ListItemText className={item.type==="income"? "income": "spending"} sx={{ alignSelf: "flex-start", paddingLeft: 18 }}>
            {item.type==="income"? "$" + item.sum: "-" + "$" + item.sum }
          </ListItemText>
          {/* <ClearIcon onClick = {handlerDelete} /> */}
          <Button sx={{alignSelf: "flex-start", color: "primary.main", boxShadow: 0}} className="deleteButto"><BackspaceIcon/></Button>
          {/* <BackspaceIcon button sx={{alignSelf: "flex-start", color: "primary.main"}} onClick={handlerDelete} /> */}
        </ListItem>
        </Box>
      ))}
    </List>
  );
}
