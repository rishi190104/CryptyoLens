import React, { useState } from "react";
import { Button } from "antd";
import { Tabs, ConfigProvider } from "antd";
import InputBox from "../InputBox";
import { useCryptoContext } from "../../context/CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const Login = ({ handleCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const { signup, setSignup, setLogin, setShowpassword, showpassword } =
    useCryptoContext();

  const onChange = (key) => {
    console.log(key);
  };

  const togglePassword = () => {
    setShowpassword(!showpassword);
  };

  const handleClick = async () => {
    if (email === "" || password === "") {
      messageApi.open({
        type: "error",
        content: `Please Fill all the fields`,
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      messageApi.open({
        type: "success",
        content: `Login Successful WelcomeBack ${result.user.email}`,
      });
      handleCancel();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.mesaage,
      });
      return;
    }
  };

  const login = [
    {
      key: "1",
      label: "Login",
      children: (
        <div className="flex flex-col gap-y-2 text-white">
          <InputBox
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            type={showpassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePassword}
            className="absolute top-12 right-4 cursor-pointer"
          >
            {showpassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </span>
          {contextHolder}
          <Button type="primary" onClick={handleClick}>
            Login
          </Button>
          <div className="text-white flex justify-center items-center">
            <p>New User?</p> &nbsp; &nbsp;
            <p
              onClick={() => {
                setSignup(!signup);

                setLogin(!login);
              }}
              className="text-yellow-500 cursor-pointer font-bold"
            >
              SignUp
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#a16207",
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
        <Tabs
          defaultActiveKey="1"
          items={login}
          onChange={onChange}
          className="flex justify-center items-center"
        />
      </ConfigProvider>
    </div>
  );
};

export default Login;
