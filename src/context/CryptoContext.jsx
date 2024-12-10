import { message } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";


const CryptoContext = createContext()

 const Context = ({children}) => {

    const [currency, setCurrency] = useState("INR")
    const [symbol, setSymbol] = useState("₹")
    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(true);
    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) setUser(user)
                else setUser(null)
        })
    }, [])

    useEffect(() => {
        if(currency === "INR") setSymbol("₹")
        if(currency === "USD") setSymbol("$")
    },[currency])

    return (
        <CryptoContextProvider value={{currency, setCurrency, symbol, setSymbol, signup, setSignup, login, setLogin, user}}>
            {children}
        </CryptoContextProvider>
    )
}

export const CryptoContextProvider = CryptoContext.Provider 

export default Context;

export  const useCryptoContext = () => {
    return useContext(CryptoContext)
}
