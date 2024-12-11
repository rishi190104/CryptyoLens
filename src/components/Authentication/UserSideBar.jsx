import React, { useEffect, useState } from 'react';
import { Avatar,  Drawer,  Space } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { useCryptoContext } from '../../context/CryptoContext';
import { signOut } from 'firebase/auth';
import { message } from "antd";
import { auth, db } from '../../Firebase';
import { doc, setDoc } from 'firebase/firestore';

const UserSideBar = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const [messageApi, contextHolder] = message.useMessage();
  const {user, currency, CoinList, symbol,  watchlist, coins} = useCryptoContext()

 
  useEffect(() => {
    CoinList()
  },[currency])

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
    signOut(auth)
    messageApi.open({
        type: "success",
        content: `Logout Successful !!!`,
      });
      }

      const removefromWatchlist = async(coin) => {
        const CoinRef = doc(db, "watchlist", user.uid);
        try {
          await setDoc(
            CoinRef,
            {coins: watchlist.filter((watch) => watch !== coin.id)},
            {merge: true}
          )
          messageApi.open({
            type:"success",
            content: `${coin.name} Removed from the Watchlist `
          })
        } catch (error) {
          messageApi.open({
            type:"error",
            content: error.message
          })
        }
      }

  return (
    <>
      <Space>
      
      <Avatar size={44} icon={<UserOutlined/>} onClick={showDrawer} style={{color: "#fff", backgroundColor:"darkgoldenrod", cursor: "pointer"}}
       src={user.photoURL} alt={user?.displayName || user?.email} />
      </Space>
      <Drawer
       
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
        style={{backgroundColor:"#212121", color: "#fff"}}
      >
       <div>
        <div className='flex flex-col justify-center items-center'>
        <Avatar size={222} icon={<UserOutlined/>} onClick={showDrawer} style={{color: "#fff", backgroundColor:"darkgoldenrod"}}
       src={user.photoURL} alt={user?.displayName || user?.email} />
       <span>{user.displayName || user.email}</span>
        </div>
        <div className='bg-gray-400 w-full h-full'>
          <h1>Watchlist</h1>
          {coins.map((coin) => {
            if(watchlist.includes(coin.id)){
              return(
                <>
                <div key={coin.id}>
                  <span>{coin.name}</span>
                  <span>{symbol} {numberWithCommas(coin.current_price.toFixed(2))}</span>
                </div>
                <div>
                  {contextHolder}
                  <button onClick={() => removefromWatchlist(coin)}> <DeleteOutlined /> </button>
                  </div>
                  </>
              )
            } else return <></>
          })}
        </div>
        <div className=''>
            {contextHolder}
            <button className='absolute bottom-10 flex justify-center items-center bg-yellow-600 w-[200px] ml-20 py-5 px-10'
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