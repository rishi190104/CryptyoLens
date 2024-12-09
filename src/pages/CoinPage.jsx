import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCryptoContext } from "../context/CryptoContext";
import ReactHtmlParser from "react-html-parser";
import { Spin } from "antd";
import CoinInfo from "../components/CoinInfo";

const CoinPage = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const { currency, symbol } = useCryptoContext();

  const SingleCoin = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    const data = await response.json();
    console.log(data);
    setCoin(data);
  };

  useEffect(() => {
    setLoading(true);
    SingleCoin();
    setLoading(false);
  }, [currency, id]);

  function numberWithCommas(x) {
    if (x === undefined || x === null) return "N/A";
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
      {loading ? (
       <div><Spin/></div>
      ) : (
        <main className="w-full md:h-screen bg-black text-white md:flex py-10">
          <section className="md:w-[30%] h-full border-r-2 border-r-gray-300 flex flex-col justify-center p-5 gap-y-3">
            <div className="flex flex-col justify-center items-center gap-y-2">
              <img src={coin?.image?.large} alt={coin?.name} width={255} />
              <h1 className="text-3xl font-extrabold">{coin?.name}</h1>
            </div>
            <div>
              <span className="font-bold text-2xl">Current Price:</span> &nbsp;
              <span className="text-xl">
                {symbol}
                {numberWithCommas(
                  coin?.market_data?.current_price[
                    currency.toLowerCase()
                  ].toFixed(2)
                )}
              </span>
            </div>

            <div>
              <span className="font-bold text-2xl">Market Cap:</span> &nbsp;
              <span className="text-xl">
                {symbol}
                {numberWithCommas(
                  coin?.market_data?.market_cap[currency.toLowerCase()]
                ).slice(0, -6)}{" "}
                M
              </span>
            </div>
            <div>
              <span className="text-xl">
                {ReactHtmlParser(coin?.description?.en.split(". ")[0])}
              </span>
            </div>
          </section>
          <section className="sm:w-full md:w-[75%] p-7">
            <CoinInfo coin={coin}/>
          </section>
        </main>
      )}
    </>
  );
};

export default CoinPage;
