import { message } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, onSnapshot } from "firebase/firestore";

const CryptoContext = createContext();

const Context = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const CoinRef = doc(db, "watchlist", user.uid);
      const unsubscribe = onSnapshot(CoinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log("No items in Watchlist");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const CoinList = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`
    );
    const data = await response.json();
    console.log(data);
    setCoins(data);
  };
  useEffect(() => {
    setLoading(true);
    CoinList();
    setLoading(false);
  }, [currency]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <CryptoContextProvider
      value={{
        currency,
        setCurrency,
        symbol,
        setSymbol,
        signup,
        setSignup,
        login,
        setLogin,
        user,
        watchlist,
        coins,
        loading,
        CoinList,
        setLoading,
        setShowpassword,
        showpassword,
      }}
    >
      {children}
    </CryptoContextProvider>
  );
};

export const CryptoContextProvider = CryptoContext.Provider;

export default Context;

export const useCryptoContext = () => {
  return useContext(CryptoContext);
};
