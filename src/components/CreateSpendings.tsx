import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import { saveUpdate } from "../redux/FinanceSlice";
import { SpendingsOrIncome } from "../redux/FinanceSlice";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Link } from "react-router-dom";

interface Select {
  catOfAccount: string;
  catOfSpendings: string;
}
interface Errors {
  quantity: boolean;
  catOfAccount: boolean;
  catOfSpendings: boolean;
  description: boolean;
}

export default function CreateSpendings() {
  const categoriesOfSpendings = useAppSelector(
    (state) => state.financeManager.categoryOfSpendings
  );
  const categoryOfAccount = useAppSelector(
    (state) => state.financeManager.categoryOfAccount
  );
  const amountOfTransactions = useAppSelector(
    (state) => state.financeManager.transactions
  );

  const dispatch = useAppDispatch();

  const [date, setDate] = React.useState<Dayjs | null>(dayjs(new Date()));

  const [sum, setSum] = useState(0);
  const [description, setDescription] = useState<string>("");
  const [select, setSelect] = useState<Select>({
    catOfAccount: "",
    catOfSpendings: "",
  });
  const [errors, setErrors] = useState<Errors>({
    quantity: false,
    catOfAccount: false,
    catOfSpendings: false,
    description: false,
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
    if (value.length < 20) {
      setDescription(value);
      setErrors((prev) => ({ ...prev, description: false }));
    } else {
      setErrors((prev) => ({ ...prev, description: true }));
    }
  };
  const handlerSubmit = (event: any) => {
    if (!sum) {
      setErrors((prev) => ({ ...prev, quantity: true }));
    }
    if (!description) {
      setErrors((prev) => ({ ...prev, description: true }));
    }
    if (!select.catOfAccount) {
      setErrors((prev) => ({ ...prev, catOfAccount: true }));
    }
    if (!select.catOfSpendings) {
      setErrors((prev) => ({ ...prev, catOfIncome: true }));
    } else {
      const iconOfSpend =
        categoriesOfSpendings.find(
          (item) => item.name === select.catOfSpendings
        )?.icon ?? DisabledByDefaultIcon;
      const iconOfAcc =
        categoryOfAccount.find((item) => item.name === select.catOfAccount)
          ?.icon ?? DisabledByDefaultIcon;

      const newTransaction: SpendingsOrIncome = {
        type: "spendings",
        sum: sum,
        category: select.catOfSpendings,
        notes: description,
        date: date,
        account: select.catOfAccount,
        id: (amountOfTransactions?.length ?? 0) + 1,
        iconOfCat: iconOfSpend,
        iconOfAcc: iconOfAcc,
      };
      dispatch(saveUpdate(newTransaction));

      setDescription("");
      setErrors({
        quantity: false,
        catOfAccount: false,
        catOfSpendings: false,
        description: false,
      });
      setSelect({
        catOfAccount: "",
        catOfSpendings: "",
      });
      setSum(0);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        margin: "auto",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <Link to={"/createIncome"}>Income</Link>
        <span style={{ color: "grey", pointerEvents: "none" }}>Spendings</span>
      </Box>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          alignItems: "center",
          backgroundColor: "#fafafa",
          borderRadius: 10,
          padding: 10,
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
          maxRows={3}
          type="text"
          error={errors.description}
        ></TextField>

        <FormControl variant="standard">
          <InputLabel id="SpendingsCateg">Spendings category</InputLabel>
          <Select
            labelId="SpendingsCateg"
            label="Category Of Spendings"
            required
            value={select.catOfSpendings}
            defaultValue={categoriesOfSpendings[0].name}
            onChange={handlerSelect}
            sx={{ width: 550 }}
            name="catOfSpendings"
            error={errors.catOfSpendings}
          >
            {categoriesOfSpendings.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={date}
              onChange={(newValue) => setDate(newValue)}
              sx={{ width: 550 }}
            />
          </DemoContainer>
        </LocalizationProvider>

        <FormControl variant="standard">
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
      </form>
      <Button sx={{ width: 570 }} variant="contained" onClick={handlerSubmit}>
        Add transaction
      </Button>
    </div>
  );
}
