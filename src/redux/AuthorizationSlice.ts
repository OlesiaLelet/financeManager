import {createSlice} from '@reduxjs/toolkit';

export type initialState = {
    isRegister: boolean,
    name: string,
    email: string,
    password: string
}

const initialState: initialState = {
    isRegister: false,
    name: "",
    email: "",
    password: ""
    
}

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
     reducers: {
        setIsRegister (state, actions) {
            state.isRegister=  actions.payload.isRegister;
            state.email = actions.payload.email;
            state.name = actions.payload.name;
            state.password = actions.payload.password

       
       },
       setLogOut (state, actions) {
        state.isRegister= actions.payload.isRegister;
        state.email = actions.payload.email;
        state.name = actions.payload.name;
        state.password = actions.payload.password;
       }
     }})
  
  export const {setIsRegister, setLogOut} = authorizationSlice.actions;
  
  export default authorizationSlice.reducer;