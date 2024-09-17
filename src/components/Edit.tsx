
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Button,
  
} from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import {  editTransaction } from "../redux/FinanceSlice";
import { SpendingsOrIncome } from "../redux/FinanceSlice";
import { useNavigate, useParams,} from "react-router-dom";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { CurrencyExchange } from "@mui/icons-material";
import { current } from "@reduxjs/toolkit";



export default function Edit() {

  const categoriesOfIncome = useAppSelector(
    (state) => state.financeManager.categoryOfIncome
  );
  const categoriesOfSpendings =  useAppSelector(
    (state) => state.financeManager.categoryOfSpendings
  );
  const categoryOfAccount = useAppSelector(
    (state) => state.financeManager.categoryOfAccount
  );

  

  const {id}= useParams();
  const numberId = Number(id)
  
  const currentTransaction = useAppSelector((state)=> state.financeManager.transactions?.find((item) => item.id==numberId));

  

  
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [date, setDate] = React.useState<Dayjs | null>(dayjs(currentTransaction?.date));
  

  const [sum, setSum] = useState(currentTransaction?.sum);
  console.log(sum);
  
  const [description, setDescription] = useState(currentTransaction?.notes);
  const [select, setSelect] = useState({
    catOfSpendings: currentTransaction?.category,
    catOfAccount: currentTransaction?.account,
    catOfIncome: currentTransaction?.category,
  });
  const [errors, setErrors] = useState({
    quantity: false,
    catOfAccount: false,
    catOfIncome: false,
    catOfSpendings: false
  });

  const handlerSelect = (event: SelectChangeEvent<string>) => {
    const { value, name } = event.target;
    setSelect((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSum = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const sum = Number(value);
    setSum(sum);
  };

  const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDescription(value);
  };
  
  const handlerSubmit = () => {
    if (!sum) {
      setErrors((prev) => ({ ...prev, quantity: true }));
    }
    // if (!description) {
    //   setErrors((prev) => ({ ...prev, description: true }));
    // }
    // if (!select.catOfAccount) {
    //   setErrors((prev) => ({ ...prev, catOfAccount: true }));
    // }
    // if (!select.catOfIncome || !select.catOfSpendings) {
    //   if(!select.catOfIncome) {
    //     setErrors((prev) => ({ ...prev, catOfIncome: true  }));
    //   } else {
    //     setErrors((prev) => ({ ...prev, catOfSpendings: true  }));
    //   }
       else {
      const icon = categoriesOfIncome.find((item) => item.name === select.catOfIncome)
          ?.icon ?? DisabledByDefaultIcon;
      const iconOfAcc= categoryOfAccount.find((item) => item.name === select.catOfAccount)?.icon ?? DisabledByDefaultIcon;

      if(sum && select.catOfAccount && select.catOfIncome && select.catOfSpendings && currentTransaction?.type ) {

       const editTransact = {
        type: currentTransaction?.type,
        sum: sum,
        category: currentTransaction?.type === "income"  ?select.catOfIncome : select.catOfSpendings,
        notes: description || "",
        date: date,
        account: select.catOfAccount,
        id:  numberId,
        iconOfCat: icon,
        iconOfAcc: iconOfAcc
      };
       dispatch((editTransaction(editTransact)));
    }
     
      navigate("/transactions");

      setDescription("");
      setErrors({
        quantity: false,
        catOfAccount: false,
        catOfIncome: false,
        catOfSpendings: false
      });
      setSelect({
        catOfAccount: "",
        catOfIncome: "",
        catOfSpendings:"",
      });
      setSum(0);
    }
  };

  return (
    <div>
      <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
        alignItems: "center",
      }}
    >
      <TextField
        variant="standard"
        label="Amount"
        type="number"
        value={sum !== 0 ? sum : ""}
        onChange={handlerSum}
        sx={{ width: 550 }}
        name="quantity"
        error={errors.quantity}
        required
      ></TextField>

      <TextField
        variant="standard"
        label="Description (optional)"
        value={description}
        onChange={handlerInput}
        sx={{ width: 550 }}
        name="description"
      ></TextField>
 
 { currentTransaction?.type ==="income" ?
      <FormControl>
        <InputLabel id="IncomeCateg">Income category</InputLabel>
        <Select
          labelId="IncomeCateg"
          label="Category Of income"
          required
          value={select.catOfIncome}
          defaultValue={categoriesOfIncome[0].name}
          onChange={handlerSelect}
          sx={{ width: 550 }}
          name="catOfIncome"
          error={errors.catOfIncome}
        >
          {categoriesOfIncome.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> : 
      <FormControl>
        <InputLabel id='SpendingsCateg'>Spendings category</InputLabel>
      <Select 
      labelId='SpendingsCateg'
      label='Category Of Spendings'
      required
      value={select.catOfSpendings}
      defaultValue={categoriesOfSpendings[0].name}
      onChange= {handlerSelect}
      sx={{width: 550}}
      name="catOfSpendings"
      error={errors.catOfSpendings}
      >
        {categoriesOfSpendings.map((item)=>(
          <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
        ))}
      </Select>
      </FormControl>
}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={date}
            onChange={(newValue) => setDate(newValue)}
            sx={{ width: 550 }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <FormControl>
        <InputLabel id="AccountCateg">Account category</InputLabel>
        <Select
          labelId="AccountCateg"
          label="Category Of account"
          defaultValue={categoryOfAccount[0].name}
          value={select.catOfAccount}
          onChange={handlerSelect}
          error={errors.catOfAccount}
          sx={{ width: 550 }}
          name="catOfAccount"
          required
        >
          {categoryOfAccount.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button sx={{ width: 550 }} variant="contained" onClick={handlerSubmit}>
        Add transaction
      </Button>
    </form>
    </div>
  )
}
