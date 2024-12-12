import { Select, ConfigProvider } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import { useCryptoContext } from "../context/CryptoContext";
import { useNavigate } from "react-router-dom";
import AuthModal from "./Authentication/AuthModal";

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency } = useCryptoContext();

  const handleOnchange = (value) => setCurrency(value);

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            activeBorderColor: "#eab308",
            selectorBg: "#eab308",
            activeOutlineColor: "#eab308",
            hoverBorderColor: "#eab308",
            colorText: "#121212",
            fontSizeIcon: 18,
            fontSize: 18,
          },
        },
      }}
    >
      <header className="w-full h-20 bg-black py-4 sticky top-0 z-10 shadow-sm shadow-yellow-500">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto ">
          <div className="">
            <Title
              level={1}
              className="font-signature text-yellow-500 md:text-3xl text-xl cursor-pointer "
              onClick={() => navigate("/")}
            >
              <span className="p-4">CryptoLens</span>
            </Title>
          </div>

          <div className="flex justify-center items-center md:gap-x-10 gap-x-4 ">
            <Select
              value={currency}
              onChange={handleOnchange}
              className="md:w-24 md:h-10 rounded-none font-crypto"
              options={[
                {
                  value: "INR",
                  label: "INR",
                },
                {
                  value: "USD",
                  label: "USD",
                },
              ]}
            />
            <div className="md:ml-0 ml-2">
              <AuthModal />
            </div>
          </div>
        </div>
      </header>
    </ConfigProvider>
  );
};

export default Header;
