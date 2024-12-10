import React, { useState } from "react";
import { Button } from "antd";
import { Tabs, ConfigProvider } from "antd";
import InputBox from "../InputBox";
import { useCryptoContext } from "../../context/CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { message } from "antd";

const Login = ({ handleCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const { signup, setSignup, setLogin } = useCryptoContext();

  const onChange = (key) => {
    console.log(key);
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
        <div className="flex flex-col gap-y-2">
          <InputBox
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {contextHolder}
          <Button type="primary" onClick={handleClick}>
            Login
          </Button>
          <div className="text-white flex">
            <p>New User?</p> &nbsp;
            <p
              onClick={() => {
                setSignup(!signup);

                setLogin(!login);
              }}
              className="text-yellow-700 cursor-pointer font-bold"
            >
              Signup
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
