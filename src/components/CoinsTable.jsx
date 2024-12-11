import React, { useEffect, useState } from "react";
import { useCryptoContext } from "../context/CryptoContext";
import { Pagination, ConfigProvider, Spin } from "antd";
import { useNavigate } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const {  symbol, coins, loading, setLoading, currency, CoinList } = useCryptoContext();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  
  useEffect(() => {
    setLoading(true);
    CoinList();
    setLoading(false);
  }, [currency]);

  const HandleSearch = () => {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    });
  };

  return (
    <>
      <main className="bg-black w-full h-full text-white ">
        <div className="text-white flex justify-center  text-3xl py-10 ">
          <h1>Cryptocurrency Prices by Market Cap</h1>
        </div>
        <div className="flex justify-center ">
          <input
            type="search"
            name="search"
            id="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search For CryptoCurrency "
            className=" w-[70%] h-12 mx-10 px-6 border border-yellow-700 bg-transparent outline-none placeholder:text-gray-600"
          />
        </div>
        <div className=" flex justify-center items-center py-14 max-w-screen-xl mx-auto">
          {loading ? 
            <Spin size="large" />
           : (
            <table className="border border-white w-full">
              <thead className="border border-white bg-yellow-800 text-black">
                <tr className="border border-white">
                  {["Coins", "Price", "24h Change", "Market Cap"].map(
                    (head) => {
                      return (
                        <th key={head} className=" p-4">
                          {head}{" "}
                        </th>
                      );
                    }
                  )}
                </tr>
              </thead>
              <tbody>
                {HandleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((coin) => {
                    const profit = coin.price_change_percentage_24h > 0;
                    return (
                      <>
                        <tr
                          key={coin.id}
                          className="border cursor-pointer"
                          onClick={() => navigate(`/coins/${coin.id}`)}
                        >
                          <td className="flex  items-center gap-x-5 p-5">
                            <img src={coin.image} alt={coin.name} width={50} />
                            {coin.name}
                          </td>
                          <td>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                          </td>

                          <td
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            }}
                          >
                            {" "}
                            {profit && "+"}
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </td>
                          <td>
                            {symbol}
                            {numberWithCommas(coin.market_cap)
                              .toString()
                              .slice(0, -6)}
                            M
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#a16207",
                itemBg: "#a16207",
                colorTextDisabled: "#fff",
                colorTextPlaceholder: "#fff",
                colorPrimaryHover: "#fff",
                colorPrimary: "#00000",
                colorText: "#fff",
                colorBorder: "#fff",
                itemLinkBg: "#fff",
              },
            },
          }}
        >
          <Pagination
            defaultCurrent={HandleSearch.length / 10}
            total={100}

            responsive={true}
            showSizeChanger={false}
            className="pb-10 flex justify-center items-center "
            onChange={(value) => {
              {HandleSearch()}
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </ConfigProvider>
      </main>
    </>
  );
};

export default CoinsTable;
