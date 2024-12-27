import React, { useEffect, useState } from "react";
import { Avatar, Drawer, Space } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { useCryptoContext } from "../../context/CryptoContext";
import { signOut } from "firebase/auth";
import { message } from "antd";
import { auth, db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserSideBar = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [messageApi, contextHolder] = message.useMessage();
  const { user, currency, CoinList, symbol, watchlist, coins } =
    useCryptoContext();
  const navigate = useNavigate();

  useEffect(() => {
    CoinList();
  }, [currency]);

  function numberWithCommas(x) {
    if (x === undefined || x === null) return "N/A";
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const handleClick = () => {
    signOut(auth);
    messageApi.open({
      type: "success",
      content: `Logout Successful !!!`,
    });
  };

  const removefromWatchlist = async (coin) => {
    const CoinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        CoinRef,
        { coins: watchlist.filter((watch) => watch !== coin.id) },
        { merge: true }
      );
      messageApi.open({
        type: "success",
        content: `${coin.name} Removed from the Watchlist `,
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  };

  return (
    <>
      <Space>
        <Avatar
          size={44}
          icon={<UserOutlined />}
          onClick={showDrawer}
          style={{
            color: "#fff",
            backgroundColor: "darkgoldenrod",
            cursor: "pointer",
          }}
          src={user.photoURL}
          alt={user?.displayName || user?.email}
        />
      </Space>
      <Drawer
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        className="md:w-full w-[300px]"
        key={placement}
        style={{ backgroundColor: "#212121", color: "#fff" }}
      >
        <div>
          <div className="flex flex-col justify-center items-center">
            <Avatar
              size={155}
              icon={<UserOutlined />}
              onClick={showDrawer}
              style={{ color: "#fff", backgroundColor: "darkgoldenrod" }}
              src={user.photoURL}
              alt={user?.displayName || user?.email}
            />
            <span className="text-lg font-bold py-2 text-yellow-400">
              {user.displayName || user.email}
            </span>
          </div>
          <div className="bg-gray-400 w-full md:h-[400px] h-[300px] overflow-auto rounded">
            <h1 className="flex justify-center items-center py-3 text-xl font-semibold text-black ">
              Watchlist
            </h1>
            {coins.map((coin) => {
              if (watchlist.includes(coin.id)) {
                return (
                  <>
                    <div
                      key={coin.id}
                      className="flex justify-around items-center bg-yellow-500 mx-5 my-2 py-3 rounded"
                    >
                      <span
                        className="text-lg cursor-pointer"
                        onClick={() => navigate(`/coins/${coin.id}`)}
                      >
                        {coin.name}
                      </span>
                      <span className="text-lg">
                        {symbol}{" "}
                        {numberWithCommas(coin.current_price.toFixed(2))}
                        &nbsp; &nbsp;
                        {contextHolder}
                        <button
                          onClick={() => removefromWatchlist(coin)}
                          className="text-yellow-900"
                        >
                          {" "}
                          <DeleteOutlined />{" "}
                        </button>
                        &nbsp;
                      </span>
                    </div>
                  </>
                );
              } else return <></>;
            })}
          </div>
          <div className="">
            {contextHolder}
            <button
              className="absolute left-12 md:left-4 bottom-5 flex justify-center items-center hover:bg-yellow-500 md:w-[200px] md:ml-20 ml-10 py-2 px-10 rounded-sm
             hover:text-black text-lg font-bold bg-transparent text-yellow-500 border-2 border-yellow-500"
              onClick={handleClick}
            >
              Logout
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default UserSideBar;
