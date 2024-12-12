import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Tabs, ConfigProvider } from "antd";
import InputBox from "../InputBox";
import Login from "./Login";
import Signup from "./Signup";
import { useCryptoContext } from "../../context/CryptoContext";
import UserSideBar from "./UserSideBar";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase";
import { message } from "antd";

const AuthModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { login, signup, setSignup, user } = useCryptoContext();
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(user);

  const googleprovider = new GoogleAuthProvider();

  const handleClick = async () => {
    signInWithPopup(auth, googleprovider)
   
      .then((res) => {
        messageApi.open({
          type: "success",
          content: `Welcome ${res.user.email}`,
        });
        
        handleCancel();
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: error.message,
        });
        return;
      });
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#212121",
              colorIcon: "#fff",
              colorIconHover: "yellow",
            },
            Button: {
              colorPrimary: "#eab308",
              colorBgContainer: "#121212",
              colorPrimaryHover: "#713f12",
              colorLinkActive: "#713f12",
            },
            Tabs: {
              inkBarColor: "yellow",
              itemSelectedColor: "yellow",
              itemHoverColor: "yellow",
              itemColor: "#fff",
            },
          },
        }}
      >
        {user ? (
          <UserSideBar />
        ) : (
          <Button
            type="primary"
            onClick={showModal}
            className="text-black md:w-24 md:h-10 h-8 rounded-md font-crypto outline-none font-semibold text-lg"
          >
            Login
          </Button>
        )}
        <Modal
          footer={null}
          open={isModalOpen}
          centered={true}
          onCancel={handleCancel}
          width={300}
        >
          <div>
            {login && <Login handleCancel={handleCancel} />}
            {signup && <Signup handleCancel={handleCancel} />}
            <span className="text-white font-bold text-md flex items-center justify-center py-2">
              OR
            </span>
            {contextHolder}
            <GoogleButton onClick={handleClick} />
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};
export default AuthModal;
