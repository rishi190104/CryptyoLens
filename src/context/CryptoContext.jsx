import { createContext, useContext, useEffect, useState } from "react";


const CryptoContext = createContext()

 const Context = ({children}) => {

    const [currency, setCurrency] = useState("INR")
    const [symbol, setSymbol] = useState("₹")

    useEffect(() => {
        if(currency === "INR") setSymbol("₹")
        if(currency === "USD") setSymbol("$")
    },[currency])

    return (
        <CryptoContextProvider value={{currency, setCurrency, symbol, setSymbol}}>
            {children}
        </CryptoContextProvider>
    )
}

export const CryptoContextProvider = CryptoContext.Provider 

export default Context;

export  const useCryptoContext = () => {
    return useContext(CryptoContext)
}
