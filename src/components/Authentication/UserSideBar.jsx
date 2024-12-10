import React, { useState } from 'react';
import { Avatar,  Drawer,  Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useCryptoContext } from '../../context/CryptoContext';
import { signOut } from 'firebase/auth';
import { message } from "antd";
import { auth } from '../../Firebase';

const UserSideBar = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const [messageApi, contextHolder] = message.useMessage();
  const {user} = useCryptoContext()
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

  return (
    <>
      <Space>
      
      <Avatar size={44} icon={<UserOutlined/>} onClick={showDrawer} style={{color: "#fff", backgroundColor:"darkgoldenrod"}}
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