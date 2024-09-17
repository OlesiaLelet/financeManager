import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import Transactions from './components/Transactions';
import CreateTransaction from './components/CreateTransaction';
import CreateIncome from './components/CreateIncome';
import CreateSpendings from './components/CreateSpendings';


import { Switch } from '@mui/material';

import './App.css';
import CreateNoteOfIncome from './components/CreateIncome';

function App() {
  return (
    <div>
    <BrowserRouter>
       <Navbar/>
      <Routes>
        <Route path='/' element={ <Main/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      
        <Route path='/createTransaction' element={<CreateTransaction/>}>
            <Route path='income' element={<CreateIncome/>}></Route>
            <Route path='spendings' element={<CreateSpendings/>}></Route>
        </Route>
        <Route path='/edit/:id' element={<Edit/>}></Route>
        <Route path='/transactions' element={<Transactions/>}></Route>
      </Routes>
    

    </BrowserRouter>
    </div>
  
    
  );
}

export default App;
