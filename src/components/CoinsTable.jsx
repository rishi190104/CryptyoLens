import React, { useEffect, useState } from "react";
import { useCryptoContext } from "../context/CryptoContext";
import { Pagination, ConfigProvider, Spin } from "antd";
import { useNavigate } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const { symbol, coins, loading, setLoading, currency, CoinList } =
    useCryptoContext();
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
        <div className="text-white flex justify-center font-bold text-3xl p-10 ">
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
            className=" w-[70%] h-12 mx-10 md:px-6 px-3 border border-yellow-700 bg-transparent outline-none placeholder:text-gray-600 "
          />
        </div>
        <div className=" flex justify-center items-center py-14 max-w-screen-xl mx-auto">
          {loading ? (
            <Spin size="large" />
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="border border-white w-full min-w-[600px]">
                <thead className="border border-yellow-800 bg-yellow-500 text-black">
                  <tr className="border border-yellow-950">
                    <th className="flex items-start justify-start pl-20 py-5">
                      Coins
                    </th>
                    <th className="pr-20">Price</th>
                    <th>24h Change</th>
                    <th className="pr-20">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {HandleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((coin) => {
                      const profit = coin.price_change_percentage_24h > 0;
                      return (
                        <tr
                          key={coin.id}
                          className="border-2 border-yellow-800 cursor-pointer"
                          onClick={() => navigate(`/coins/${coin.id}`)}
                        >
                          <td className="flex items-center gap-x-5 p-5">
                            <img src={coin.image} alt={coin.name} width={50} />
                            <span className="text-sm md:text-base">
                              {coin.name}
                            </span>
                          </td>
                          <td className="pl-10 text-sm md:text-base">
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                          </td>
                          <td
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            }}
                            className="pl-10 text-sm md:text-base"
                          >
                            {profit && "+"}
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </td>
                          <td className="pl-10 text-sm md:text-base">
                            {symbol}
                            {numberWithCommas(coin.market_cap)
                              .toString()
                              .slice(0, -6)}
                            &nbsp;M
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#eab308",
                itemBg: "#eab308",
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
              {
                HandleSearch();
              }
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
