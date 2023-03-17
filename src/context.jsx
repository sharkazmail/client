import axios from "axios";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

export const UserContext = createContext();

const initialState = {
    userInfo: {
        email: "uwagboeolusoga@gmail.com", 
        accountType: "Checking",
        name: "Timothy A Roberts",
        balance: localStorage.getItem("balance") ? JSON.parse(localStorage.getItem("balance")): 14964.36
    },
    formInfo: [],
    otp: 920453,
}

const reducer = (state, action)=>{
if(action.type === "SETUSER"){
return {...state, userInfo: localStorage.setItem("user",JSON.stringify(action.payload))}
}

if(action.type === "GET_OTP"){
    return {...state, otp: action.payload}
    }

}

const UseContextProvider = ({children})=>{
   const [state, dispatch] = useReducer(reducer, initialState)
   
    const getOTP = async()=>{
        const res = await axios.get("/api/verify")
        dispatch({type:"GET_OTP", payload:res.data})
    }

 return (
    <UserContext.Provider value={{...state, getOTP}}>
        {children}
    </UserContext.Provider>
 )   
}

export {UseContextProvider}