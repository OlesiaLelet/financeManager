import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, } from '@mui/material'
import { useAppSelector } from '../redux/store';
import { SpendingsOrIncome } from '../redux/FinanceSlice';











export default function Main() {

  const navigate = useNavigate();
  
  const transactions = useAppSelector(state => state.financeManager.transactions);

   let income : number = 0  ;
   let spendings: number = 0 ;

  function countDifference (transactions: SpendingsOrIncome[] ) {
    

 for( const item of transactions) {
       if (item.type ==="income") {
        income += item.sum;

       } else {
        spendings += item.sum
       }
  }
   return income + (-spendings);
  }

 const difference = countDifference(transactions);
  
  
  

  
  return (
      <div style={{display: "flex", flexDirection:"column", gap: 15, alignItems:'center', minHeight: '100vh', margin: 0}} >
        <Typography variant='h5'>Month trend </Typography>
        <Typography variant='h3' className={difference> 0? "income": "spending"}>${difference}</Typography>
        <div style={{display:"flex"}}>
        <Box sx={{backgroundColor: "#ffcdd2", padding: "5px 10px", borderRadius: "10px 0px 0px 10px"}}>
          <Typography variant='h6'  >Expenses</Typography>
          <Typography variant='body1'>${spendings}</Typography>
        </Box>
        <Box sx={{backgroundColor: "#bbdefb", padding: "5px 10px", borderRadius: "0px 10px 10px 0px"}}>
          <Typography variant='h6'>Income</Typography>
          <Typography variant='body1'>${income}</Typography>
        </Box> 
        
        </div>

       
        
        
      </div>

     
  )
}
