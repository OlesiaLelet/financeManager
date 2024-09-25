import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Edit from "./components/Edit";
import Transactions from "./components/Transactions";
import CreateIncome from "./components/CreateIncome";
import CreateSpendings from "./components/CreateSpendings";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./components/Profile";
import { useAppSelector } from "./redux/store";

import "./App.css";

function App() {
  const isLog = useAppSelector((state) => state.authorization.isRegister);
  return (
    <div>
      <BrowserRouter>
        <Navbar >
        <Routes>
          <Route path="/" element={<Main />}></Route>
          {!isLog ? (
            <Route path="/register" element={<Register />}></Route>
          ) : (
            <Route path="/profile" element={<Profile />}></Route>
          )}
          <Route element={<ProtectedRoutes />}>
            <Route path="/createIncome" element={<CreateIncome />}></Route>
            <Route
              path="/createSpendings"
              element={<CreateSpendings />}
            ></Route>

            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/transactions" element={<Transactions />}></Route>
          </Route>
        </Routes>
        </Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
