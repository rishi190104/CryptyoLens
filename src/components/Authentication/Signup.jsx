import React, { useState } from "react";
import { Button } from "antd";
import { Tabs, ConfigProvider } from "antd";
import InputBox from "../InputBox";
import { useCryptoContext } from "../../context/CryptoContext";
import { message } from "antd";
import {auth} from "../../Firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({handleCancel}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassowrd] = useState("");

  const [messageApi, contextHolder] = message.useMessage();
  

  const handleClick = async () => {
    if (password !== confirmpassword) {
      messageApi.open({
        type: "error",
        content: `Passwords do not match`,
      });
     return;
    }

    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        messageApi.open({
            type: "success",
            content: `Signup successful, Welcome ${result.user.email} `,
          });
          handleCancel()
    } catch (error) {
        messageApi.open({
            type: "error",
            content: error.message,
          });
          return
    }
}

  const { setSignup, setLogin } = useCryptoContext();
  const onChange = (key) => {
    console.log(key);
  };
  const signup = [
    {
      key: "2",
      label: "SignUp",
      children: (
        <div className="flex flex-col gap-y-2 text-white">
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
          <InputBox
            type="text"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassowrd(e.target.value)}
          />
          {contextHolder}
          <Button type="primary" onClick={handleClick}>
            SignUp
          </Button>
        </div>
      ),
    },
  ];

  const handleSubmit = async () => {
    // if (password !== confirmpassword)
  };

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
          items={signup}
          onChange={onChange}
          className="flex justify-center items-center"
        />
        <div className="text-white flex">
          <p>Already a User?</p> &nbsp;
          <p
            onClick={() => {
              setSignup(!signup);

              setLogin(true);
            }}
            className="text-yellow-700 cursor-pointer font-bold"
          >
            Login
          </p>
          {/* <Space>
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button>
      </Space> */}
        </div>
      </ConfigProvider>
    </div>
  );
};

export default Signup;
