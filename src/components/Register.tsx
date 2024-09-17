import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Button, Box, Input, InputAdornment} from '@mui/material'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';






export default function Register() {

  const navigate = useNavigate()

  interface Error {
    name: boolean,
    email: boolean,
    passwordLength: boolean,
  }

  interface InputValue {
    userName: string,
    email: string,
    password: string,
  }

  const [isError, setIsError] = useState <Error>({
    name: false,
    email: false,
    passwordLength: false
  });

  const [inputV, setInputV] = useState <InputValue>({
    userName: '',
    email: '',
    password: '',

  })
  const [isLog, setIsLog] = useState<boolean>(false);


  const handlerInput = (event: any) => {
    const {value, name} = event.target
    setInputV((prev) => ({...prev, [name]: value}))
  }
   const handlerSubmit = () => {
     if(!inputV.userName) {
      setIsError(prev => ({...prev, name: true}))
     }
      if(!inputV.email) {
      setIsError(prev => ({...prev, email: true}))
     } 
     if( inputV.password.length<10) {
      setIsError(prev => ({...prev, passwordLength: true}))
     }
    
    
     if(inputV.password && inputV.userName && inputV.email) {

        localStorage.setItem("userName", inputV.userName);
        
        localStorage.setItem("userName", inputV.email);
        
        localStorage.setItem("isLog", "true" )

        setInputV({
          userName: '',
          email: '',
          password: '',
        })
        navigate('/')
     }

  
   }
  

  return (
      
      <form >
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '400px',
          margin: 'auto',
          gap: '10px'

        }}>

        <Box sx={{ margin: 'auto'}}>
          <Typography variant='h5'>Register form</Typography>
        </Box>
        
         <TextField variant="outlined" label="username" required error={isError.name} value={inputV.userName }  name='userName' onChange={handlerInput} autoComplete='off'
 slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PermIdentityIcon />
              </InputAdornment>
            ),
          },
        }}  >
        </TextField> 
      
        <TextField variant="outlined" label="email" required error={isError.email} value={inputV.email } name='email' onChange={handlerInput}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon></MailOutlineIcon>
              </InputAdornment>
            ),
          },
        }}
        ></TextField>
        <TextField variant='outlined' label="password" required type='password' error={isError.passwordLength} value={inputV.password } name='password' onChange={handlerInput} autoComplete='off' 
         slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
               <KeyIcon/>
              </InputAdornment>
            ),
          },
        }} ></TextField>
        {isError.passwordLength? <Typography variant="body2" sx={{color: "red"}} >Password must be at least 10 signs length</Typography>:''}
        <Button  onClick={handlerSubmit} variant='contained'>Register</Button>
        </Box>
      </form>
      
    
  )
}
